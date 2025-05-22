import { useUser } from '../context/UsuarioContext';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export const Login = () => {
    const { login } = useUser();
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [clave, setClave] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); 

    // Estado para mostrar/ocultar la clave
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("ENVIANDO FORMULARIO")
        const success = await login(nombreUsuario, clave);
        if (!success) {
            setError("Usuario y/o Clave incorrectos, vuelva a intentar");
        } else{
            navigate("/")
        }
    };

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError('');
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [error]);

    return (
        <div className="h-screen w-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 flex items-center justify-center">
            <form 
                onSubmit={handleSubmit}
                className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl flex flex-col gap-4 w-full max-w-sm text-white"
            >
                <h2 className="text-2xl font-semibold text-center">Iniciar Sesión</h2>

                <input
                    type="text"
                    placeholder="Usuario"
                    value={nombreUsuario}
                    onChange={(e) => setNombreUsuario(e.target.value)}
                    className="px-4 py-2 rounded-md bg-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-white/70"
                />

                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Clave"
                        value={clave}
                        onChange={(e) => setClave(e.target.value)}
                        className="w-full px-4 py-2 rounded-md bg-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-white/70"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white text-sm select-none cursor-pointer"
                    >
                        {showPassword ? "Ocultar" : "Mostrar"}
                    </button>
                </div>

                <button
                    type="submit"
                    className="bg-cyan-500 hover:bg-cyan-600 transition-colors py-2 rounded-md font-semibold text-white cursor-pointer"
                >
                    Ingresar
                </button>

                {error && (
                    <p className="text-red-400 text-sm text-center transition-opacity duration-500">
                        {error}
                    </p>
                )}
            </form>
        </div>
    );
};
