import { Categoria } from "../context/CategoriasContext";

export class Instrumento {
    id: number;
    instrumento: string;
    marca: string;
    modelo: string;
    imagen: string;
    precio: number;
    costoEnvio: string;
    cantidadVendida: number;
    descripcion: string;
    categoria: Categoria;

    constructor(id: number, instrumento: string, marca: string, modelo: string, imagen: string, precio: number, costoEnvio: string, cantidadVendida: number, descripcion: string, Categoria: Categoria){
        this.id = id,
        this.instrumento = instrumento
        this.marca = marca
        this.modelo = modelo
        this.imagen = imagen
        this.precio = precio
        this.costoEnvio = costoEnvio
        this.cantidadVendida = cantidadVendida
        this.descripcion = descripcion
        this.categoria = Categoria
    }


}