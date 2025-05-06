import { Link } from "react-router-dom";


export const Header = () => {

    return (
        <div>
            <header className="h-20 shadow-sm flex justify-center items-center bg-[#C8C6AF]">
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
                </nav>
            </header>
        </div>
    )
}

export default Header;