export abstract class Vehiculo {
    protected marca: string;
    protected modelo: string;

    constructor(marca: string, modelo: string) {
        if (!marca || !modelo) {
            throw new Error("Marca y modelo son obligatorios.");
        }
        this.marca = marca;
        this.modelo = modelo;
    }

    public abstract arrancar(): string;
    
    public abstract detener(): string;

    public mostrarInfo(): string {
        return `Marca: ${this.marca}, Modelo: ${this.modelo}`;
    }
}
