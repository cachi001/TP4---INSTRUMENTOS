import { createContext, ReactNode, useContext, useState, useEffect} from 'react'
import { PedidoDetalle } from '../classes/PedidoDetalle';
import { Instrumento } from './ProductosContext';
import { Pedido } from '../classes/Pedido';

type Carrito = {
    pedidoDetalle: PedidoDetalle[]
}

type ContextType = {
    carrito: Carrito
    agregarProducto: (cantidad: number, producto: Instrumento) => void
    totalCarrito: number
    aumentarCantidadProducto: (productoId: number) => void
    restarCantidadProducto: (productoId: number) => void
    eliminarProducto: (pedidoDetalle: PedidoDetalle) => void
    eliminarProductos: () => void
    comprarProductos: () => void
    pedido: Pedido | undefined
    contadorProductosCarrito: number
    idPreferencia: string
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
    const [idPreferencia, setIdPreferencia] = useState<string>("")
    

    useEffect(() => {
        setContadorProductosCarrito(carrito.pedidoDetalle.length)
    }, [carrito]);

    const handleCalcularTotal = (precio: number, tipo: string) =>{
        if (tipo != "restar") {
            setTotalCarrito(prev => prev += precio)
        } else{
            if (totalCarrito > 0) {
                setTotalCarrito(prev => prev -= precio)
            }
        }
    } 

    const agregarProducto = (cantidad: number, producto: Instrumento) =>{
        
        console.log("FUNCION AGREGAR PRODUCTO AL CARRITO ")

        const index = carrito.pedidoDetalle.findIndex(item => item.instrumento.id === producto.id);

        if (index !== -1) {
            const nuevosDetalles = [...carrito.pedidoDetalle];
            handleCalcularTotal(cantidad * producto.precio, "sumar")
            nuevosDetalles[index].cantidad += cantidad;
            setCarrito({ pedidoDetalle: nuevosDetalles });
        } else {
            const nuevoDetalle = new PedidoDetalle(cantidad, producto);
            setCarrito({ pedidoDetalle: [...carrito.pedidoDetalle, nuevoDetalle] });
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
        handleCalcularTotal(pedidoDetalle.cantidad * pedidoDetalle.instrumento.precio, "restar")
    }

    const eliminarProductos = () =>{
        setCarrito({pedidoDetalle: []}
        )
        setContadorProductosCarrito(0)
        setTotalCarrito(0)
    }

    const comprarProductos = async() =>{
        try {
            setIdPreferencia("")
            console.log("CREANDO PEDIDO DE COMPRA")
            const pedido = new Pedido(carrito.pedidoDetalle)
    
            console.dir(pedido)

            // 1. Crear el pedido con los pedidoDetalle
            const responsePedido = await fetch(`http://localhost:8080/pedido/crear`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(pedido),
                })
    
                if (!responsePedido.ok) {
                    throw Error("Error al crear el pedido")
                }
                const dataPedido = await responsePedido.json()
    
                setPedido(dataPedido)
                
                alert(`El pedido con ID ${dataPedido.id} creado correctamente`);

                // 2. Crear preferencia MercadoPago con pedido ya creado
                const responsePreferencia = await fetch(`http://localhost:8080/mp/crear-preferencia`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(dataPedido),
                })
    
                if (!responsePreferencia.ok) {
                    throw Error("Error al crear la preferencia de MercadoPago")
                }
                const dataPreferencia = await responsePreferencia.json()
        
                const idPreferencia = dataPreferencia.preferenceId
                
                setIdPreferencia(idPreferencia)

        } catch (error) {
            console.error("Error en compra:", error);
        }
    }

    return (
        <CarritoContext.Provider value={{
            agregarProducto, 
            comprarProductos, 
            eliminarProducto, 
            eliminarProductos, 
            aumentarCantidadProducto, 
            restarCantidadProducto,
            idPreferencia,
            pedido, 
            totalCarrito, 
            contadorProductosCarrito, 
            carrito}}>
            {children}
        </CarritoContext.Provider>
    )
}
