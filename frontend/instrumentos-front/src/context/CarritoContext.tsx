import { createContext, ReactNode, useContext, useState} from 'react'
import { PedidoDetalle } from '../classes/PedidoDetalle';
import { Instrumento } from './ProductosContext';
import { Pedido } from '../classes/Pedido';

type Carrito = {
    pedidoDetalle: PedidoDetalle[]
}

type ContextType = {
    carrito: Carrito
    agregarProducto: (cantidad: number, producto: Instrumento) => void
    handleAumentoContadorCarrito: () => void
    handleDecrementoContadorCarrito: () => void
    totalCarrito: number
    aumentarCantidadProducto: (productoId: number) => void
    restarCantidadProducto: (productoId: number) => void
    eliminarProducto: (pedidoDetalle: PedidoDetalle) => void
    eliminarProductos: () => void
    comprarProductos: () => void
    pedido: Pedido | undefined
    contadorProductosCarrito: number
}

type ContextProviderType = {
    children: ReactNode;
}

const CarritoContext = createContext<ContextType | undefined>(undefined)

export const useCarrito = () =>{
    const context = useContext(CarritoContext)

    if (context === undefined) {
        throw new Error("useCarrito debe usarse dentro de ContextProvider");
    }

    return context
}


export const CarritoProvider = ({children}: ContextProviderType) => {
    const [carrito, setCarrito] = useState<Carrito>({ pedidoDetalle: []})
    const [contadorProductosCarrito, setContadorProductosCarrito] = useState<number>(0)
    const [totalCarrito, setTotalCarrito] = useState<number>(0)
    const [pedido, setPedido] = useState<Pedido>()

    const handleAumentoContadorCarrito = () =>{
        setContadorProductosCarrito(prev => prev + 1)
    }
    const handleDecrementoContadorCarrito = () =>{
        contadorProductosCarrito > 0 ? setContadorProductosCarrito(prev => prev - 1) : contadorProductosCarrito
    }
    const handleCalcularTotal = (precio: number, tipo: string) =>{
        if (tipo != "restar") {
            setTotalCarrito(prev => prev += precio)
        } else{
            setTotalCarrito(prev => prev -= precio)
        }
    } 

    const agregarProducto = (cantidad: number, producto: Instrumento) =>{
        
        console.log("FUNCION AGREGAR PRODUCTO AL CARRITO ")

        const index = carrito.pedidoDetalle.findIndex(item => item.instrumento.id === producto.id);

        if (index !== -1) {
            const nuevosDetalles = [...carrito.pedidoDetalle];
            handleCalcularTotal(producto.precio, "sumar")
            nuevosDetalles[index].cantidad += cantidad;
            setCarrito({ pedidoDetalle: nuevosDetalles });
        } else {
            const nuevoDetalle = new PedidoDetalle(cantidad, producto);
            setCarrito({ pedidoDetalle: [...carrito.pedidoDetalle, nuevoDetalle] });
            handleAumentoContadorCarrito();
            handleCalcularTotal(nuevoDetalle.cantidad *  producto.precio, "sumar")
        }

    }

    const aumentarCantidadProducto = (productoId: number) => {
        const index = carrito.pedidoDetalle.findIndex(item => item.instrumento.id === productoId);
        

        if (index !== -1) {
            const nuevosDetalles = [...carrito.pedidoDetalle];
            const producto = nuevosDetalles[index].instrumento;
            handleCalcularTotal(producto.precio, "sumar")
            nuevosDetalles[index].cantidad += 1;
            setCarrito({ pedidoDetalle: nuevosDetalles });
        }
    };

    const restarCantidadProducto = (productoId: number) =>{
        const index = carrito.pedidoDetalle.findIndex(item => item.instrumento.id === productoId);

        if (index !== -1) {
        
            const nuevosDetalles = [...carrito.pedidoDetalle];
            const producto = nuevosDetalles[index].instrumento;
            if (nuevosDetalles[index].cantidad > 1) {
                handleCalcularTotal(producto.precio, "restar"  )
                nuevosDetalles[index].cantidad -= 1;
                setCarrito({ pedidoDetalle: nuevosDetalles });
            }
        }
    }

    const eliminarProducto = (pedidoDetalle: PedidoDetalle ) =>{

        setCarrito(prev => {
            const nuevosDetalles = prev.pedidoDetalle.filter(
                item => item.instrumento.id !== pedidoDetalle.instrumento.id
            )

            return { pedidoDetalle: nuevosDetalles}
        })
        handleDecrementoContadorCarrito()
        handleCalcularTotal(pedidoDetalle.cantidad * pedidoDetalle.instrumento.precio, "restar")
    }

    const eliminarProductos = () =>{
        setCarrito({pedidoDetalle: []}
        )
        setContadorProductosCarrito(0)
        setTotalCarrito(0)
    }

    const fetchPedido = async (pedido: Pedido) => {
        try {
            const response = await fetch(`http://localhost:8080/pedido/crear`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(pedido),
            })

            if (!response.ok) {
                throw Error("Error de respuesta al crear el pedido")
            }
            const data = await response.json()

            setPedido(data)
            
            alert(`El pedido con ID ${data.id} se guardo correctamente`);
            
            console.log("Creado Correctamente")
            eliminarProductos()

        } catch (error) {
            console.log("ERROR AL CREAR PEDIDO CATCH", error)
        }
    }

    const comprarProductos = () =>{
        console.log("CREANDO PEDIDO DE COMPRA")
        const pedido = new Pedido(new Date, carrito.pedidoDetalle)

        pedido.totalPedido = totalCarrito

        console.dir(pedido)

        fetchPedido(pedido)
    }

    return (
        <CarritoContext.Provider value={{
            agregarProducto, 
            comprarProductos, 
            eliminarProducto, 
            eliminarProductos, 
            aumentarCantidadProducto, 
            restarCantidadProducto,
            handleAumentoContadorCarrito, 
            handleDecrementoContadorCarrito,
            pedido, 
            totalCarrito, 
            contadorProductosCarrito, 
            carrito}}>
            {children}
        </CarritoContext.Provider>
    )
}
