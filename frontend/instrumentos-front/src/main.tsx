import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { initMercadoPago } from '@mercadopago/sdk-react';

const publicKey = 'TEST-84af154c-b3f7-4d0d-8b87-9b24cda669b3';

// Inicializás Mercado Pago una sola vez antes de renderizar la app
initMercadoPago(publicKey, { locale: 'es-AR' });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
