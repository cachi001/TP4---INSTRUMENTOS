import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UsuarioContext';

type PrivateRouteProps = {
    requiredRol: string | string[];
    children: React.ReactElement;
};

export const PrivateRoute = ({ requiredRol, children }: PrivateRouteProps) => {
    const { user } = useUser();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    const rolesPermitidos = Array.isArray(requiredRol) ? requiredRol : [requiredRol];

    if (!rolesPermitidos.includes(user.rol)) {
        // Rol no permitido
        return <Navigate to="/acceso-rechazado" replace />;
    }

    // Si está autorizado, renderizamos el componente hijo
    return children;
};
