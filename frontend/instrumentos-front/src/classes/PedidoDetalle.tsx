import { Instrumento } from "./Instrumento"

export class PedidoDetalle{
    cantidad: number
    instrumento: Instrumento

    constructor(cantidad: number, instrumento: Instrumento){
        this.cantidad = cantidad
        this.instrumento = instrumento
    }

}