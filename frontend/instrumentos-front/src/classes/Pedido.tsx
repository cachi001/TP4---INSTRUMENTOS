import { PedidoDetalle } from "./PedidoDetalle"

export class Pedido{
    id?: number
    fechaPedido: Date
    totalPedido?: number
    pedidoDetalles: PedidoDetalle[]

    constructor(fechaPedido: Date, pedidoDetalles: PedidoDetalle[]){
        this.fechaPedido = fechaPedido
        this.pedidoDetalles = pedidoDetalles
    }

    
}