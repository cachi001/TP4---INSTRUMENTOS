import Header from './Header';
import { useProductos } from '../context/ProductosContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';

// @ts-ignore
import 'swiper/css';
// @ts-ignore
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';

export const Home = () => {

    const { productos, loading} = useProductos();

    return (
        <div>
            <Header />

            <div className='p-6 flex justify-center items-center'>
                <h1 className='text-4xl font-bold text-[#979684]'>MUSICAL HENDRIX</h1>
            </div>

            {/* Slider con imágenes pequeñas */}
            <section className='pb-10'>
                <Swiper
                    modules={[Pagination, Autoplay]}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 5000 }}
                    loop={true}
                    spaceBetween={20}
                    slidesPerView={3}
                    breakpoints={{
                        320: { slidesPerView: 1 },
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 }
                    }}
                    className='w-full'
                >
                    {loading ? (
                        <div className='h-50 opacity-70 flex items-center justify-center'>
                            <p className='text-white text-xl font-bold'>Cargando productos...</p>
                        </div>
                    ) : productos.length > 0 ? (
                        productos.map((producto, index) => (
                            <SwiperSlide key={index} className='p-10'>
                                <Link to={`/detalle/${producto.id}`}>
                                    <div className='flex flex-col items-center bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition duration-300'>
                                        {producto.imagen.length > 30 ? (                                        <img
                                            src={`${producto.imagen}`}
                                            alt={`Imagen de ${producto.instrumento}`}
                                            className='h-50 object-contain w-full bg-gray-100'
                                        />):(                                        <img
                                            src={`/img/${producto.imagen}`}
                                            alt={`Imagen de ${producto.instrumento}`}
                                            className='h-50 object-contain w-full bg-gray-100'
                                        />)}
                                        <div className='py-10 pb-10'>
                                            <h2 className='text-md font-semibold text-center text-[#2B2D42]'>{producto.instrumento}</h2>
                                        </div>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))
                    ) : (
                            <div className='h-50 bg-[#312F2F] opacity-70 flex items-center justify-center'>
                                <p className='text-white text-xl font-bold'>No hay productos disponibles</p>
                            </div>
                    )}
                </Swiper>
            </section>

            {/* Descripción */}
            <div className='flex items-center justify-center p-10 bg-[#C8C6AF]'>
                <p className='text-center text-[#2B2D42] max-w-2xl'>
                    Musical Hendrix es una tienda de instrumentos musicales con ya más de 15 años de
                    experiencia. Tenemos el conocimiento y la capacidad como para informarte acerca de las
                    mejores elecciones para tu compra musical.
                </p>
            </div>
        </div>
    );
};

export default Home