import { BarChartPedidos } from "../components/BarChartPedidos"
import { PieChartPedidosInstrumento } from "../components/PieChartPedidosInstrumento"
import Header from "../components/Header"

export const Graficos = () => {
    return (
        <div>
            <Header></Header>
            <div className="min-h-screen flex justify-center p-14">
                <div className="flex flex-col gap-4 items-center">
                    <span className="text-xl font-bold">GRAFICO DE BARRAS</span>
                    <BarChartPedidos></BarChartPedidos>
                </div>
                <div className="flex flex-col gap-4 items-center">
                    <span className="text-xl font-bold">GRAFICO DE TORTA</span>
                    <PieChartPedidosInstrumento></PieChartPedidosInstrumento>
                </div>
            </div>
        </div>
    )
}


export default Graficos