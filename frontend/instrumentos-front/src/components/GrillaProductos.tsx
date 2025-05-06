
import { InstrumentoDto, Instrumento, useProductos } from "../context/ProductosContext"
import { useCategorias } from "../context/CategoriasContext"
import Header from "./Header"
import { useState} from "react"
import Modal from "./Modal"

export const GrillaProductos = () => {
    const { productos, crearProducto, eliminarProducto, modificarProducto } = useProductos();
    const { categorias } = useCategorias();
    const [estadoModal, setEstadoModal] = useState<boolean>(false);
    const [modoModal, setModoModal] = useState<"crear" | "editar" | "eliminar">("crear");
    const [productoSeleccionado, setProductoSeleccionado] = useState<Instrumento | null>(null);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>("");
    const [instrumento, setInstrumento] = useState<string>("");
    const [marca, setMarca] = useState<string>("");
    const [modelo, setModelo] = useState<string>("");
    const [imagen, setImagen] = useState<string>("");
    const [precio, setPrecio] = useState<string>("");
    const [costoEnvio, setCostoEnvio] = useState<string>("");
    const [cantidadVendida, setCantidadVendida] = useState<string>("");
    const [descripcion, setDescripcion] = useState<string>("");

    const abrirModal = (producto: Instrumento | null = null) => {
        setProductoSeleccionado(producto);
        if (producto) {
            setInstrumento(producto.instrumento);
            setMarca(producto.marca);
            setModelo(producto.modelo);
            setImagen(producto.imagen);
            setPrecio(producto.precio.toString());
            setCostoEnvio(producto.costoEnvio);
            setCantidadVendida(producto.cantidadVendida.toString());
            setDescripcion(producto.descripcion);
            setCategoriaSeleccionada(producto.categoria.denominacion);
        } else {
            limpiarValores();
        }
        setEstadoModal(true);
    };

    const cerrarModal = () =>{
        setEstadoModal(false);
    }
    console.log(categoriaSeleccionada)
    const handleCrear = (e: React.FormEvent) => {
        e.preventDefault(); 
        const nuevoProducto: InstrumentoDto = {
            instrumento,
            marca,
            modelo,
            imagen,
            precio: Number(precio),
            costoEnvio,
            cantidadVendida: Number(cantidadVendida),
            descripcion,
            categoria: categorias?.find(c => c.denominacion === categoriaSeleccionada)!,
        };

        crearProducto(nuevoProducto);
        limpiarValores()
        cerrarModal();
    };

    const handleEditar = (e: React.FormEvent) => {
        e.preventDefault();
        if (productoSeleccionado) {
            const productoModificado: Instrumento = {
                id: productoSeleccionado.id,
                instrumento,
                marca,
                modelo,
                imagen,
                precio: Number(precio),
                costoEnvio,
                cantidadVendida: Number(cantidadVendida),
                descripcion,
                categoria: categorias?.find(c => c.denominacion === categoriaSeleccionada)!
            };
            modificarProducto(productoModificado)
            cerrarModal();
        }
    };

    const handleEliminar = () => {
        if (productoSeleccionado) {
            eliminarProducto(productoSeleccionado.id);
            cerrarModal();
        }
    }

    const limpiarValores = () =>{
        setInstrumento("")
        setCantidadVendida("")
        setCostoEnvio("")
        setDescripcion("")
        setImagen("")
        setPrecio("")
        setMarca("")
        setModelo("")
        setCategoriaSeleccionada("")
    }
    return (
        <div className="min-h-screen">
            <Header></Header>
            <div className="h-20 flex items-center justify-around shadow-md">
                <span className="text-2xl tracking-wide font-bold text-[#bbb895]">Lista Instrumentos</span>
                <button onClick={() =>{setModoModal("crear"), abrirModal()}}  className="shadow-sm px-6 py-2 bg-[#bbb895]  transition-all duration-300 ease-in-out cursor-pointer text-white hover:scale-x-102">Nuevo Producto</button>
            </div>
            {modoModal === "crear" && estadoModal ? (
                    <Modal estiloModal="h-150 w-200 bg-white overflow-y-scroll" estadoModal={estadoModal} cerrarModal={cerrarModal} modoModal={modoModal}>
                        <form onSubmit={handleCrear} className="flex flex-col items-center gap-4 p-4" >
                                <div className="flex flex-col gap-2">                                
                                    <label htmlFor="instrumento">Instrumento</label>
                                    <input id="instrumento" type="text" required className="border-b w-140 focus:outline-none py-1" value={instrumento} onChange={(e) => setInstrumento(e.target.value)} />
                                </div>
                                <div className="flex flex-col gap-2">                                
                                    <label htmlFor="marca">Marca</label>
                                    <input id="marca" type="text" required className="border-b w-140 focus:outline-none py-1" value={marca} onChange={(e) => setMarca(e.target.value)} />
                                </div>
                                <div className="flex flex-col gap-2">                                
                                    <label htmlFor="modelo">Modelo</label>
                                    <input id="modelo" type="text" required className="border-b w-140 focus:outline-none py-1" value={modelo} onChange={(e) => setModelo(e.target.value)} />
                                </div>
                                <div className="flex flex-col gap-2">                                
                                    <label htmlFor="imagen">URL Imagen</label>
                                    <input id="imagen" type="text" required className="border-b w-140 focus:outline-none py-1" value={imagen} onChange={(e) => setImagen(e.target.value)}/>
                                </div>
                                <div className="flex flex-col gap-2">                                
                                    <label htmlFor="precio">Precio</label>
                                    <input id="precio" type="text" required className="border-b w-140 focus:outline-none py-1" value={precio} onChange={(e) => setPrecio(e.target.value)} />
                                </div>
                                <div className="flex flex-col gap-2">                                
                                    <label htmlFor="costo-envio">Costo Envio</label>
                                    <input id="costo-envio" type="text" required className="border-b w-140 focus:outline-none py-1" value={costoEnvio} onChange={(e) => setCostoEnvio(e.target.value)} />
                                </div>
                                <div className="flex flex-col gap-2">                                
                                    <label htmlFor="cantidad-vendida">Cantidad Vendida</label>
                                    <input id="cantidad-vendida" required type="text" className="border-b w-140 focus:outline-none py-1" value={cantidadVendida} onChange={(e) => setCantidadVendida(e.target.value)} />
                                </div>
                                <div className="flex flex-col gap-2">                                
                                    <label htmlFor="descripcion">Descripcion</label>
                                    <textarea id="descripcion" required className="border-b w-140 focus:outline-none py-1" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                                </div>
                                <div className="flex flex-col gap-2">                                
                                    <label htmlFor="categoria">Categoria</label>
                                    <select 
                                    value={categoriaSeleccionada} 
                                    onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                                    className="border p-2 rounded-md w-140"
                                    required
                                >
                                    <option value="" disabled>Seleccione una categoría</option>
                                    {categorias?.map((categoria)=>{
                                        
                                        return(
                                            <option key={categoria.id} value={categoria.denominacion}>{categoria.denominacion}</option>
                                        )
                                    })}
                                </select>
                                </div>
                                <div className="py-4">
                                    <button className="py-2 px-10 bg-green-500 text-white rounded-md hover:bg-green-400 transition-all duration-300 ease-in-out cursor-pointer" >Crear</button>
                                </div>
                        </form>
                    </Modal>
                ) : modoModal === "editar" && estadoModal ? (
                    <Modal estiloModal="h-150 w-200 bg-white overflow-y-scroll" estadoModal={estadoModal} cerrarModal={cerrarModal} modoModal={modoModal}>
                        <form onSubmit={handleEditar} className="flex flex-col items-center gap-4 p-4">
                            <div className="flex flex-col gap-2">                                
                                <label htmlFor="instrumento"></label>
                                <input id="instrumento" type="text" required className="border-b w-140 focus:outline-none py-1" value={instrumento} onChange={(e) => setInstrumento(e.target.value)} />
                            </div>
                            <div className="flex flex-col gap-2">                                
                                <label htmlFor="marca">Marca</label>
                                <input id="marca" type="text" required className="border-b w-140 focus:outline-none py-1" value={marca} onChange={(e) => setMarca(e.target.value)}  />
                            </div>
                            <div className="flex flex-col gap-2">                                
                                <label htmlFor="modelo">Modelo</label>
                                <input id="modelo" type="text" required className="border-b w-140 focus:outline-none py-1" value={modelo} onChange={(e) => setModelo(e.target.value)}  />
                            </div>
                            <div className="flex flex-col gap-2">                                
                                <label htmlFor="imagen">URL Imagen</label>
                                <input id="imagen" type="text" required className="border-b w-140 focus:outline-none py-1" value={imagen} onChange={(e) => setImagen(e.target.value)}  />
                            </div>
                            <div className="flex flex-col gap-2">                                
                                <label htmlFor="precio">Precio</label>
                                <input id="precio" type="text" required className="border-b w-140 focus:outline-none py-1" value={precio} onChange={(e) => setPrecio(e.target.value)} />
                            </div>
                            <div className="flex flex-col gap-2">                                
                                <label htmlFor="costo-envio">Costo Envio</label>
                                <input id="costo-envio" type="text" required className="border-b w-140 focus:outline-none py-1" value={costoEnvio === "G" ? "0" : costoEnvio } onChange={(e) => setCostoEnvio(e.target.value)}  />
                            </div>
                            <div className="flex flex-col gap-2">                                
                                <label htmlFor="cantidad-vendida">Cantidad Vendida</label>
                                <input id="cantidad-vendida" required type="text" className="border-b w-140 focus:outline-none py-1" value={cantidadVendida} onChange={(e) => setCantidadVendida(e.target.value)} />
                            </div>
                            <div className="flex flex-col gap-2">                                
                                <label htmlFor="descripcion">Descripcion</label>
                                <textarea id="descripcion" required className="border-b w-140 focus:outline-none py-1 h-20" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                            </div>
                            <div className="flex flex-col gap-2">                                
                                <label htmlFor="categoria">Categoria</label>
                                <select 
                                value={categoriaSeleccionada} 
                                onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                                className="border p-2 rounded-md w-140"
                                required
                            >
                                <option value="" disabled>Seleccione una categoría</option>
                                {categorias?.map((categoria)=>{
                                    return(
                                        <option key={categoria.id} value={categoria.denominacion}>{categoria.denominacion}</option>
                                    )
                                })}
                            </select>
                            </div>
                            <div className="flex py-4 gap-4">
                                <button className="bg-gray-300 px-4 py-2 rounded cursor-pointer hover:bg-gray-200 transition-all duration-300 ease-in-out">Cancelar</button>
                                <button className="py-2 px-10 bg-green-500 text-white rounded-md hover:bg-green-400 transition-all duration-300 ease-in-out cursor-pointer" onClick={handleEditar}>Guardar Cambios</button>
                            </div>
                        </form>
                    </Modal>
            ): modoModal === "eliminar" && estadoModal ?(
                <Modal estiloModal="bg-white py-6 px-10 rounded" estadoModal={estadoModal} cerrarModal={cerrarModal} modoModal={modoModal}>
                        <div className="flex flex-col items-center justify-center gap-4 text-center py-6">
                            <p>¿Estás seguro que querés eliminar este instrumento?</p>
                            <div className="flex justify-center gap-2 mt-4">
                                <button onClick={cerrarModal} className="bg-gray-300 px-4 py-2 rounded cursor-pointer hover:bg-gray-200 transition-all duration-300 ease-in-out">Cancelar</button>
                                <button className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-red-400 transition-all duration-300 ease-in-out" onClick={handleEliminar}>Eliminar</button>
                            </div>
                        </div>
                </Modal>
            ) : (
                <></>
            ) }
            <section className="flex items-center justify-center p-10">
                <div className="overflow-x-auto shadow-lg rounded-xl h-140">
                    <table className="table-auto rounded-xl text-center w-full overflow-y-auto">
                        <thead>
                            <tr className="bg-[#bbb895] text-white">
                                {["Instrumento", "Marca", "Modelo", "Imagen", "Precio", "Costo Envio", "Cantidad Vendida", "Descripcion", "Categoria", "Acciones"].map((col, i) => (
                                    <th key={i} className="py-3 px-4 border-b border-gray-300">{col}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {productos!.map((producto) => (
                                <tr key={producto.id} className="hover:bg-gray-100 transition-all">
                                    <td className="border-b border-gray-200 py-6 px-4">{producto.instrumento}</td>
                                    <td className="border-b border-gray-200 py-6 px-4">{producto.marca}</td>
                                    <td className="border-b border-gray-200 py-6 px-4">{producto.modelo}</td>
                                    <td className="border-b border-gray-200 py-6 px-4">
                                    {producto.imagen.length > 30 ? (
                                        <img src={`${producto.imagen}`} alt="producto-imagen" className='h-20 w-30 rounded' />
                                    ): (
                                        <img src={`/img/${producto.imagen}`} alt="producto-imagen" className='h-20 w-20 rounded' />
                                    )}
                                    </td>
                                    <td className="border-b border-gray-200 py-6 px-4">${producto.precio}</td>
                                    <td className="border-b border-gray-200 py-6 px-10">
                                        {producto.costoEnvio.toLowerCase() === "g" || producto.costoEnvio === "0"   ? "Gratis" : `$${producto.costoEnvio}`}
                                    </td>
                                    <td className="border-b border-gray-200 py-6 px-17">{producto.cantidadVendida}</td>
                                    <td className="border-b border-gray-200 py-6 px-4 text-sm text-left">
                                        <div className="h-14 w-60 overflow-y-auto px-2">
                                            {producto.descripcion}
                                        </div>
                                    </td>
                                    <td className="border-b border-gray-200 py-6 px-4">
                                        <div className="px-2">
                                            {producto.categoria.denominacion}
                                        </div>
                                    </td>
                                    <td className="border-b border-gray-200 py-6 px-4">
                                        <div className="flex gap-4">
                                            <button className="py-2 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-400 transition-all duration-300 ease-in-out cursor-pointer" onClick={() =>{setModoModal("editar"), abrirModal(producto)}} >Editar</button>
                                            <button className="py-2 px-6 bg-red-500 text-white rounded-md hover:bg-red-400 transition-all duration-300 ease-in-out cursor-pointer" onClick={() =>{setModoModal("eliminar"), abrirModal(producto)}}>Eliminar</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

        </div>
    )
}


export default GrillaProductos