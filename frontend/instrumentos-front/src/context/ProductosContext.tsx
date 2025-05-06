import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { Categoria } from "./CategoriasContext";

export interface Instrumento {
    id: number;
    instrumento: string;
    marca: string;
    modelo: string;
    imagen: string;
    precio: number;
    costoEnvio: string;
    cantidadVendida: number;
    descripcion: string;
    categoria: Categoria;
}

export interface InstrumentoDto {
    instrumento: string;
    marca: string;
    modelo: string;
    imagen: string;
    precio: number;
    costoEnvio: string;
    cantidadVendida: number;
    descripcion: string;
    categoria: Categoria;
}

type ProductosContextType = {
    productos: Instrumento[];
    crearProducto: (nuevo: InstrumentoDto) => void;
    modificarProducto: (modificado: Instrumento) => void;
    eliminarProducto: (id: number) => void;
    loading: boolean;
}

type ProductosProviderType = {
    children: ReactNode;
}

const ProductosContext = createContext<ProductosContextType | undefined>(undefined);

export const useProductos = () => {
    const context = useContext(ProductosContext);

    if (context === undefined) {
        throw new Error("useProductos debe usarse dentro de un ProductosProvider");
    }

    return context;
};

export const ProductosProvider = ({ children }: ProductosProviderType) => {
    const [productos, setProductos] = useState<Instrumento[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const productosGuardados = localStorage.getItem("productos");

        const fetchProductos = async () => {

            setLoading(true)

            try {
                const response = await fetch(`http://localhost:8080/instrumento/todos`);
                if (!response.ok) throw new Error("Error al cargar instrumentos");

                const data = await response.json();
                console.log("Productos desde la API:", data);

                setProductos(data);
                localStorage.setItem("productos", JSON.stringify(data));

            } catch (error) {
                console.error("Error en fetchProductos", error);
            } finally{
                setLoading(false)
            }
        };

        if (productosGuardados) {
            const productosParsed = JSON.parse(productosGuardados);
            if (productosParsed.length === 0) {
                fetchProductos()
            } else{
                setProductos(productosParsed)
            }
        } 
    }, []);

    const crearProducto = async (nuevo: InstrumentoDto) => {

        console.log("FUNCION CREAR PRODUCTO")
        console.dir(nuevo)
        try {
            const response = await fetch("http://localhost:8080/instrumento/crear", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(nuevo),
            });

            if (!response.ok) throw new Error("Error al crear el producto");

            const data = await response.json();
            setProductos(prev => {
                const actualizados = [...prev, data];
                localStorage.setItem("productos", JSON.stringify(actualizados));
                return actualizados;
            });
        } catch (error) {
            console.error("Error al crear producto:", error);
        }
    };

    const modificarProducto = async (modificado: Instrumento) => {
        try {
            const response = await fetch("http://localhost:8080/instrumento/modificar", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(modificado),
            });

            if (!response.ok) throw new Error("Error al modificar el producto");

            const data = await response.json();
            setProductos(prev => {
                const actualizados = prev.map(item => item.id === data.id ? data : item);
                localStorage.setItem("productos", JSON.stringify(actualizados));
                return actualizados;
            });
        } catch (error) {
            console.error("Error al modificar producto:", error);
        }
    };

    const eliminarProducto = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:8080/instrumento/eliminar/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("Error al eliminar el producto");

            setProductos(prev => {
                const actualizados = prev.filter(item => item.id !== id);
                localStorage.setItem("productos", JSON.stringify(actualizados));
                return actualizados;
            });
        } catch (error) {
            console.error("Error al eliminar producto:", error);
        }
    };

    return (
        <ProductosContext.Provider value={{ productos, crearProducto, modificarProducto, eliminarProducto, loading}}>
            {children}
        </ProductosContext.Provider>
    );
};
