import { Link } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";
import { useState } from "react";
import Modal from "./Modal";


export const Header = () => {
    const { carrito, contadorProductosCarrito, aumentarCantidadProducto, restarCantidadProducto, eliminarProducto, eliminarProductos, comprarProductos, totalCarrito} = useCarrito()
    const [estadoModal, setEstadoModal] = useState<boolean>(false)


    const abrirModal = () =>{
        setEstadoModal(true)
    } 
    const cerrarModal = () =>{
        setEstadoModal(false)
    } 

    return (
            <header className="h-20 shadow-sm flex justify-around items-center bg-[#C8C6AF]">
                <nav className="flex gap-6 text-[#2B2D42] text-xl font-medium">
                    <Link to={"/"}>
                        <span className="hover:text-[#000000] transition-all 2s cursor-pointer">Home</span>
                    </Link>
                    <Link to={"/donde-estamos"}>
                        <span className="hover:text-[#000000] transition-all 2s cursor-pointer">Donde Estamos</span>
                    </Link>
                    <Link to={"/productos"}>
                        <span className="hover:text-[#000000] transition-all 2s cursor-pointer">Productos</span>
                    </Link>
                    <Link to={"/grilla-productos"}>
                        <span className="hover:text-[#000000] transition-all 2s cursor-pointer">Grilla</span>
                    </Link>
                </nav>
                <div className="flex gap-4">
                    <button onClick={abrirModal} className='rounded-lg px-4 bg-white text-black transition-all shadow-md hover:shadow-xl cursor-pointer'>Carrito 🛒</button>
                    {estadoModal ? (
                        <Modal cerrarModal={cerrarModal} estadoModal={estadoModal} modoModal="carrito" estiloModal={"h-150 w-200 bg-white overflow-y-scroll"}>
                            <div className="flex flex-col items-center justify-start gap-4 h-fit-content py-6">
                            {carrito.pedidoDetalle.length > 0 ? (
                                <>
                                    {carrito.pedidoDetalle.map((pedidoDetalle, index) => {
                                    const producto = pedidoDetalle.instrumento;
                                    return (
                                        <div key={index} className="relative flex hover:bg-gray-100 w-160 shadow-md hover:shadow-xl transition-shadow duration-300 gap-4 py-4">
                                        <button onClick={() => eliminarProducto(pedidoDetalle)} className="absolute right-4 top-0 cursor-pointer">x</button>
                                        <div className="w-40">
                                            {producto.imagen.length > 10 ? (
                                            <img src={`${producto.imagen}`} alt="producto-imagen" className='w-fit lg:h-36 h-full rounded-md' />
                                            ) : (
                                            <img src={`/img/${producto.imagen}`} alt="producto-imagen" className='w-fit lg:h-36 h-full rounded-md' />
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-6 w-100">
                                            <div className="flex flex-col gap-2">
                                            <div>
                                                <span className="font-medium tracking-wider text-lg">{producto.instrumento}</span>
                                            </div>
                                            <div className="flex gap-4 items-center text-center ">
                                                <span className="bg-black text-white px-4 py-1 text-sm rounded-md min-w-fit">{producto.categoria.denominacion}</span>
                                            </div>
                                            </div>
                                            <div className="flex gap-8 items-center">
                                            <div className="flex gap-2 items-center w-30">
                                                <span className="text-lg font-medium">Precio </span>
                                                <span className="text-lg">${pedidoDetalle.cantidad * producto.precio}</span>
                                            </div>
                                            <div className='flex gap-2 w-30'>
                                                <button onClick={() => restarCantidadProducto(producto.id)} className='border-1 border-green-600 text-green-600 rounded-lg p-2 hover:bg-green-600 hover:text-white transition-all cursor-pointer'>-</button>
                                                <button className='border-1 border-green-600 text-green-600 rounded-lg px-4 hover:bg-green-600 hover:text-white transition-all cursor-pointer'>{pedidoDetalle.cantidad}</button>
                                                <button onClick={() => aumentarCantidadProducto(producto.id)} className='border-1 border-green-600 text-green-600 rounded-lg p-2 hover:bg-green-600 hover:text-white transition-all cursor-pointer'>+</button>
                                            </div>
                                            </div>
                                        </div>
                                        
                                        </div>
                                    );
                                    })}
                                    <div className="flex gap-4 items-center justify-center">
                                        <span className="text-lg font-bold">Total</span>
                                        <span className="text-lg font-bold">$ {totalCarrito}</span>
                                    </div>
                                    <div className="flex justify-center pb-6 gap-4">
                                        <button onClick={comprarProductos} className='border-1 text-lg border-green-600 text-green-600 rounded-lg py-2 px-10 hover:bg-green-600 hover:text-white transition-all cursor-pointer'>Comprar</button>
                                        <button onClick={eliminarProductos} className='border-1 text-lg border-red-600 text-red-600 rounded-lg py-2 px-10 hover:bg-red-600 hover:text-white transition-all cursor-pointer'>Eliminar</button>
                                    </div>
                                </>
                                ) : (
                                <div>
                                    <p className="text-gray-500 text-lg">Sin productos en el carrito</p>
                                </div>
                                )}

                            </div>

                        </Modal>

                    ): (
                        <></>
                    )}
                    <span className="bg-white  text-black px-4 py-2 font-bold rounded-md">{contadorProductosCarrito}</span>
                </div>
            </header>
    )
}

export default Header;