import { useParams } from 'react-router-dom';
import { useProductos } from '../context/ProductosContext'
import { Header } from './Header'

export const DetalleProducto = () => {
    const {idproducto } = useParams();
    const {productos} = useProductos();
    const id = parseInt(idproducto!);

    const producto = productos.find(p => p.id === id);

    
    if (!producto) {
        return (
            <div>
                <Header />
                <div className='p-10 text-center text-2xl'>
                    Producto no encontrado
                </div>
            </div>
        );
    }

    return (
        <div>
            <Header></Header>

            <section className='p-10 flex items-center justify-center '>
                <div className='lg:w-300 min-h-fit flex border-1 border-gray-300 rounded-2xl gap-12 justify-between hover:shadow-xl'>
                    <div className='lg:w-150 md:w-140 flex flex-col gap-8 items-center p-8'>
                        <img src={`/img/${producto.imagen}`} alt="producto-imagen" className='rounded-2xl w-60 h-60' />
                        <div className='flex flex-col gap-4'>
                            <span>Descripción</span>
                            <p>{producto.descripcion}</p>
                        </div>
                    </div>
                    <div className='border-1 border-gray-300  flex flex-col gap-8 p-10 rounded-2xl'>
                        <div className='flex flex-col gap-4'>
                            <span className='text-sm'>{producto.cantidadVendida} vendidos</span>
                            <span className='text-2xl font-bold'>{producto.instrumento}</span>
                            <span className='text-4xl'>$ {producto.precio}</span>

                        </div>
                        <div className='flex flex-col'>
                                <span className='font-semibold'>Marca: {producto.marca}</span>
                                <span className='font-semibold'>Modelo: {producto.modelo}</span>
                        </div>
                        {producto.costoEnvio.toLowerCase() === "g" ? (
                        <div className='flex flex-col'>
                            <span>Costo Envio: </span>
                            <div className='flex gap-2 items-end'>
                                <img src="/img/camion.png" alt="camion-envio" className='w-6 h-6'/>
                                <span className='text-green-500 text-sm'>Envio Gratis</span>
                            </div>
                        </div>
                        ) : (
                        <div className='flex flex-col'>
                            <span>Costo Envio: </span>
                            <span className='text-amber-600 text-sm'>Envio ${producto.costoEnvio}</span>
                        </div>
                        ) 
                        }
                        <div>
                            <button className='border-1 border-green-600 text-green-600 rounded-lg p-2 hover:bg-green-600 hover:text-white transition-all cursor-pointer'>Agregar al Carrito</button>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    )
}


export default DetalleProducto