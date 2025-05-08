import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import DondeEstamos from './components/DondeEstamos';
import Productos from './components/Productos';
import DetalleProducto from './components/DetalleProducto';
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
            <Route path='/grilla-productos' element={<GrillaProductos />}  />
          </Routes>
        </CarritoProvider>
      </ProductosProvider>
    </CategoriasProvider>
  );
}

export default App;
