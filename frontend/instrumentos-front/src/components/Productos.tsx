import { Header } from './Header'
import { useProductos } from '../context/ProductosContext'
import { Link } from 'react-router-dom';

export const Productos = () => {

    const {productos} = useProductos();


    productos ? <p>Cargando Productos... </p> : <></>;
    
    return (
        <div>
            <Header></Header>

            <section className='p-10 grid lg:grid-cols-3 md:grid-col-2 sm:grid-col-1 grid-col-2 gap-4'>

                {productos.map((producto, index) =>{

                    return(
                    <Link key={index} to={`/detalle/${producto.id}`}>
                        <div className='W-140 h-60 flex justify-center items-center border-1 p-4 rounded-2xl border-gray-400 shadow-lg gap-10'>
                            <div className='w-40 rounded-2xl'>
                                <img src={`/img/${producto.imagen}`} alt="imagen producto" className='w-fit h-40' />
                            </div>
                            <div className='w-50 flex flex-col gap-4'>
                                <span className='text-lg'>{producto.instrumento}</span>
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