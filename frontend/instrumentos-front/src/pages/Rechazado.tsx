
import { Link } from 'react-router-dom'
export const Rechazado = () => {
    return (
        <div className='h-screen w-screen flex items-center justify-center flex-col gap-6'>
            <h1 className='text-2xl font-bold'>❌ Pago fallido</h1>
            <Link to={"/"} className='rounded-sm px-10 py-2 text-white bg-red-500 transition-all 2s cursor-pointer hover:scale-105'>
                <span>Home</span>
            </Link>
        </div>
    )
}

export default Rechazado