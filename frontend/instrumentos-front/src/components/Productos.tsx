import { Header } from './Header'
import { useProductos } from '../context/ProductosContext'
import { Link } from 'react-router-dom';

export const Productos = () => {

    const {productos} = useProductos();

    return (
        <div>
            <Header></Header>

            <section 
            className='lg:py-10 lg:px-10 md:px-4 py-10 px-10 gap-4 grid grid-cols-[repeat(auto-fit,_minmax(400px,1fr))] place-items-center'
            >

                {productos!.map((producto, index) =>{

                    return(
                    <Link key={index} to={`/detalle/${producto.id}`}>
                        <div className='lg:w-110 md:w-100 min-w-100 h-60 flex justify-center items-center border-1 lg:p-4 p-4 rounded-2xl border-gray-400 shadow-md hover:shadow-xl transition-shadow duration-300 lg:gap-10 md:gap-6 gap-10'>
                            <div className='lg:w-40 w-30 rounded-2xl flex justify-center'>
                                {producto.imagen.length > 10 ? (
                                    <img src={`${producto.imagen}`} alt="producto-imagen" className='w-fit lg:h-40 md:h-24 h-26 rounded-md' />
                                ): (
                                    <img src={`/img/${producto.imagen}`} alt="producto-imagen" className='w-fit lg:h-40 md:h-24 h-26 rounded-md' />
                                )}
                            </div>
                            <div className='w-50 flex flex-col gap-4'>
                                <span className='lg:text-lg md:text-md text-lg'>{producto.instrumento}</span>
                                <span className='text-2xl'>$ {producto.precio}</span>
                                {producto.costoEnvio.toLowerCase() === "g" ? 
                                    <div className='flex items-end gap-2'>
                                        <img src={`/img/camion.png`} alt="camion-envio" className='w-6 h-6'/>
                                        <span className='text-green-500 text-sm'>Envio Gratis a todo el pais</span>
                                    </div> :
                                    <span className='text-amber-600 text-sm'>Costo de Envio Interior de Argentina ${producto.costoEnvio}</span>
                                }
    
                                <span className='text-sm font-smibold'>{producto.cantidadVendida} Vendidos</span>
                            </div>
                        </div>
                    </Link>

                    )
                })}
            </section>
        </div>
    )
}

export default Productos