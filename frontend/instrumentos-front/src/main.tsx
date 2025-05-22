import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { initMercadoPago } from '@mercadopago/sdk-react';

const publicKey = 'APP_USR-16f885c8-7a33-48e3-b141-07feae47af15';

// Inicializás Mercado Pago una sola vez antes de renderizar la app
initMercadoPago(publicKey, { locale: 'es-AR' });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
