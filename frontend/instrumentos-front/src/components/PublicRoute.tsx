import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UsuarioContext';

type PublicRouteProps = {
    children: React.ReactElement;
};

export const PublicRoute = ({ children }: PublicRouteProps) => {
    const { user } = useUser();

    // Si ya hay un usuario logueado con rol, redirige al home
    if (user && user.rol) {
        return <Navigate to="/" replace />;
    }

    // Si no hay usuario o no tiene rol, permite el acceso
    return children;
};
