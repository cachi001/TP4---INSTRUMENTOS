import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { DondeEstamos } from './pages/DondeEstamos';
import { Productos } from './pages/Productos';
import { DetalleProducto } from './pages/DetalleProducto';
import { Rechazado } from './pages/Rechazado';
import { Aprobado } from './pages/Aprobado';
import { Login } from './pages/Login';  // Importa tu Login
import { ProductosProvider } from './context/ProductosContext';
import { GrillaProductos } from './components/GrillaProductos';
import { CategoriasProvider } from './context/CategoriasContext';
import { CarritoProvider } from './context/CarritoContext';
import { UserProvider } from './context/UsuarioContext';
import { PrivateRoute } from './components/PrivateRoute';
import { PublicRoute } from './components/PublicRoute';
import { AccesoRechazado } from './pages/AccesoRechazado'
import { Graficos } from './pages/Graficos';
import { Reporte } from './pages/Reporte';

function App() {
  return (
    <UserProvider> {/* Envuelve todo con UserProvider */}
      <CategoriasProvider>
        <ProductosProvider>
          <CarritoProvider>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/donde-estamos' element={<DondeEstamos />} />
              <Route path='/productos' element={
                <PrivateRoute  requiredRol={['VISOR', 'ADMIN', 'OPERADOR']}>
                  <Productos />
                </PrivateRoute>
              }/>
              <Route path='/detalle/:idproducto' element={
                <PrivateRoute  requiredRol={['ADMIN', 'OPERADOR']}>
                  <DetalleProducto />
                </PrivateRoute>
              }/>
              <Route path='/grilla-productos' element={
                <PrivateRoute requiredRol={['ADMIN', 'OPERADOR']}>
                  <GrillaProductos />
                </PrivateRoute>
              } />
              <Route path='/graficos' element={
                <PrivateRoute requiredRol={['ADMIN', 'OPERADOR']}>
                  <Graficos />
                </PrivateRoute>
              } />
              <Route path='/reportes' element={
                <PrivateRoute requiredRol={['ADMIN', 'OPERADOR']}>
                  <Reporte />
                </PrivateRoute>
              } />
              <Route path="/aprobado" element={<Aprobado />} />
              <Route path="/rechazado" element={<Rechazado />} />
              <Route path="/login" element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } />
              <Route path="/acceso-rechazado" element={<AccesoRechazado />} />
            </Routes>
          </CarritoProvider>
        </ProductosProvider>
      </CategoriasProvider>
    </UserProvider>
  );
}

export default App;
