import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import DondeEstamos from './components/DondeEstamos';
import Productos from './components/Productos';
import DetalleProducto from './components/DetalleProducto';
import { ProductosProvider } from './context/ProductosContext';

function App() {
  return (
    <ProductosProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/donde-estamos' element={<DondeEstamos />} />
        <Route path='/productos' element={<Productos />} />
        <Route path='/detalle' >
          <Route path=':idproducto' element={<DetalleProducto />} />
        </Route>

      </Routes>
    </ProductosProvider>
  );
}

export default App;
