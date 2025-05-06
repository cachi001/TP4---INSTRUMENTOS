import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export interface Categoria {
    id: number;
    denominacion: string;
}

type CategoriasContextType = {
    categorias: Categoria[] | null;
};

type CategoriasProviderType = {
    children: ReactNode;
};

const CategoriasContext = createContext<CategoriasContextType | undefined>(undefined);

export const useCategorias = () => {
    const context = useContext(CategoriasContext);
    if (context === undefined) {
        throw new Error("useCategorias debe usarse dentro de un CategoriasProvider");
    }
    return context;
};

export const CategoriasProvider = ({ children }: CategoriasProviderType) => {
    const [categorias, setCategorias] = useState<Categoria[] | null>(null);

    useEffect(() => {
        const categoriasGuardadas = localStorage.getItem("categorias");
        // Si hay categorías guardadas en localStorage y no están vacías
        
        // Función para hacer el fetch de las categorías
        const fetchCategorias = async () => {
            try {
                const response = await fetch("http://localhost:8080/categoria/todos");
                if (!response.ok) throw new Error("Error al cargar categorías");

                const data = await response.json();
                setCategorias(data);

                // Actualizamos el localStorage solo si estaba vacío
                localStorage.setItem("categorias", JSON.stringify(data));
            } catch (error) {
                console.error("Error en fetchCategorias", error);
            }
        };
        
        if (categoriasGuardadas) {
            const categoriasParsed = JSON.parse(categoriasGuardadas);
            // Si el array está vacío, hacemos un fetch para obtener los datos
            if (categoriasParsed.length === 0) {
                fetchCategorias();
            } else {
                setCategorias(categoriasParsed);
            }
        } else {
            fetchCategorias();
        }
    }, []); // Solo se ejecuta una vez al montar el componente

    return (
        <CategoriasContext.Provider value={{ categorias }}>
            {children}
        </CategoriasContext.Provider>
    );
};
