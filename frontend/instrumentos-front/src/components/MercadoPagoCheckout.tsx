import { Wallet } from '@mercadopago/sdk-react';

type MercadoPagoCheckoutType = {
    preferenceId: string;
};

export const MercadoPagoCheckout = ({ preferenceId }: MercadoPagoCheckoutType) => {
    return (
            <Wallet 
            initialization={{ preferenceId, redirectMode: 'self'   }}
            onReady={() => console.log('Checkout listo')}
            onError={(error) => console.error('Error en checkout:', error)}
            locale="es-AR"
            />
    );
};

export default MercadoPagoCheckout;
