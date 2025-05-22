import { Route, Routes } from 'react-router-dom';
import {Home} from './pages/Home';
import {DondeEstamos} from './pages/DondeEstamos';
import {Productos} from './pages/Productos';
import {DetalleProducto} from './pages/DetalleProducto';
import {Rechazado} from './pages/Rechazado';
import {Aprobado} from './pages/Aprobado';
import { ProductosProvider } from './context/ProductosContext';
import GrillaProductos from './components/GrillaProductos';
import { CategoriasProvider } from './context/CategoriasContext';
import { CarritoProvider } from './context/CarritoContext';

function App() {
  return (
      <CategoriasProvider>
        <ProductosProvider>
          <CarritoProvider>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/donde-estamos' element={<DondeEstamos />} />
              <Route path='/productos' element={<Productos />} />
              <Route path='/detalle' >
                <Route path=':idproducto' element={<DetalleProducto />} />
              </Route>
              <Route path='/grilla-productos' element={<GrillaProductos />} />
              <Route path="/aprobado" element={<Aprobado />} />
              <Route path="/rechazado" element={<Rechazado />} />
            </Routes>
          </CarritoProvider>
        </ProductosProvider>
      </CategoriasProvider>
  );
}

export default App;
