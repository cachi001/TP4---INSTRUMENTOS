import { Link } from 'react-router-dom'
export const Pendiente = () => {
    return (
        <div>
            <h1>⏳ Pago pendiente</h1>
            <Link to={"/"}>
                <span className="hover:text-[#000000] transition-all 2s cursor-pointer">Home</span>
            </Link>
        </div>
    )
}

export default Pendiente