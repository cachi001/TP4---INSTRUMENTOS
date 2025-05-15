import { PedidoDetalle } from "./PedidoDetalle"

export class Pedido{
    id?: number
    fechaPedido?: Date
    totalPedido?: number
    pedidoDetalles: PedidoDetalle[]

    constructor(pedidoDetalles: PedidoDetalle[]){
        this.pedidoDetalles = pedidoDetalles
    }

    
}