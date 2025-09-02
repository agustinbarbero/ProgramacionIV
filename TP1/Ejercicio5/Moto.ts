import { Vehiculo } from "./Vehiculo";

export class Moto extends Vehiculo {
    private cilindrada: number;

    constructor(marca: string, modelo: string, cilindrada: number) {
        super(marca, modelo);
        if (cilindrada <= 0) {
            throw new Error("La cilindrada debe ser mayor que cero.");
        }
        this.cilindrada = cilindrada;
    }

    override arrancar(): string {
        const mensaje = `La moto ${this.marca} ${this.modelo} está arrancando.`;
        
        return mensaje;
    }

    override detener(): string {
        const mensaje = `La moto ${this.marca} ${this.modelo} se ha detenido.`;
        return mensaje;
    }

    public mostrarInfo(): string {
        super.mostrarInfo();
        const info = `Cilindrada: ${this.cilindrada}`;
        return info;
    }
}