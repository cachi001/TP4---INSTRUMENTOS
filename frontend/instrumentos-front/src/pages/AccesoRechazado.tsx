import Header from "../components/Header"

export const AccesoRechazado = () => {
    return (
        <div>
            <Header></Header>
            <div className='h-screen w-screen flex items-center justify-center flex-col gap-6'>
                <h1 className='text-2xl font-bold'>❌ Acceso Denegado</h1>
            </div>
        </div>
    )
}

export default AccesoRechazado