
type ModalProps = {
    children: React.ReactNode,
    estiloModal: string,
    modoModal: string,
    estadoModal: boolean
    cerrarModal: () => void
}

export const Modal = ({children, estiloModal, estadoModal, modoModal , cerrarModal} : ModalProps) => {

    if (!estadoModal) return null;

    const titulo = modoModal === "crear" ? "Nuevo Instrumento" : modoModal === "editar" ? "Editar Instrumento" : "Eliminar Instrumento"

    return (
        <div className='fixed inset-0 bg-black/30'>
            {modoModal === "crear" ? (
                <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${estiloModal}`}>
                    <div className="relative flex items-center justify-center py-6">
                        <span className="text-xl font-bold">{titulo}</span>
                        <span onClick={cerrarModal} className="absolute right-10 cursor-pointer text-md"> X </span>
                    </div>
                    {children}
                </div>
            ): modoModal === "editar" ? (
                <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${estiloModal}`}>
                    <div className="relative flex items-center justify-center py-6">
                        <span className="text-xl font-bold">{titulo}</span>
                        <span onClick={cerrarModal} className="absolute right-10 cursor-pointer text-md"> X </span>
                    </div>
                    {children}
                </div>
            ):(
                <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${estiloModal}`}>
                <div className="relative flex items-center justify-center gap-4">
                    <span className="text-xl font-bold">{titulo}</span>
                    <span onClick={cerrarModal} className="absolute right-2 cursor-pointer text-md"> X </span>
                </div>
                {children}
            </div>
            )}

        </div>
    )
}

export default Modal
