import { createContext, ReactNode, useContext } from "react";
import { useState, useEffect } from "react";

export interface Instrumento{
    id: number,
    instrumento: number,
    marca: string,
    modelo: string,
    imagen: string,
    precio: number,
    costoEnvio: string,
    cantidadVendida: number,
    descripcion: string
}

type ProductosContextType = {
    productos: Instrumento[];
}

type ProductosProviderType = {
    children: ReactNode;
}
const ProductosContext = createContext<ProductosContextType | undefined>(undefined);

export const useProductos = () => {
    const context = useContext(ProductosContext)

    if (context === undefined) {
        throw new Error("useProductos no tiene valor")
    }

    return context;
};

export const ProductosProvider = ({children} : ProductosProviderType) =>{
    const productosGuardados = localStorage.getItem("productos")

    const [productos, setProductos] = useState(productosGuardados ? JSON.parse(productosGuardados) : null)

    useEffect(() => {
        const fetchProductos = async () =>{

            try {
                const response = await fetch(`http://localhost:8080/instrumento/todos`)

                if (!response.ok) throw new Error("Error al cargar Empresa");
    
                const data = await response.json();
                if (data) {
                    localStorage.setItem("productos", JSON.stringify(data));
                    setProductos(data);
                }
            } catch (error) {
                console.log("Error en fetchProductos", error)
            }
        }
        
        fetchProductos();
    }, [])
    
    return(
        <ProductosContext.Provider value={{productos}}>
            {children}
        </ProductosContext.Provider>
    )
}