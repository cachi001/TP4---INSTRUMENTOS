import React from 'react'
import { Link } from 'react-router-dom'
export const Fallo = () => {
    return (
        <div>
            <h1>❌ Pago fallido</h1>
            <Link to={"/"}>
                <span className="hover:text-[#000000] transition-all 2s cursor-pointer">Home</span>
            </Link>
        </div>
    )
}
