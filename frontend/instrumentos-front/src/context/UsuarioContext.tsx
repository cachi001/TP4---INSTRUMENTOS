import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Tipo de usuario
export type Usuario = {
    id: number;
    nombreUsuario: string;
    rol: 'ADMIN' | 'OPERADOR' | 'VISOR';
};

// Tipo del contexto
type UserContextType = {
    user: Usuario | null;
    login: (nombreUsuario: string, clave: string) => Promise<boolean>;
    logout: () => void;
};

// Crear contexto
const UserContext = createContext<UserContextType | undefined>(undefined);

// Hook para usar el contexto
export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) throw new Error('useUser debe usarse dentro de UserProvider');
    return context;
};

// Provider
type Props = {
    children: ReactNode;
};

const LOCAL_STORAGE_KEY = 'usuarioSesion';

export const UserProvider = ({ children }: Props) => {
    const [user, setUser] = useState<Usuario | null>(null);

    // Al montar, intentar cargar usuario del localStorage
    useEffect(() => {
        const userJson = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (userJson) {
            setUser(JSON.parse(userJson));
        }
    }, []);

    // Login con fetch
    const login = async (nombreUsuario: string, clave: string): Promise<boolean> => {
        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombreUsuario, clave }),
            });

            if (response.ok) {
                const data: Usuario = await response.json();
                setUser(data);
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data)); // guardo en localStorage
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error al hacer login:', error);
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem(LOCAL_STORAGE_KEY); // borro de localStorage
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};
