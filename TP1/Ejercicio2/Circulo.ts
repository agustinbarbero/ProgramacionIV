import { FiguraGeometrica } from "./FiguraGeometrica";

export class Circulo extends FiguraGeometrica {
    private radio: number;

    constructor(radio: number) {
        super("Círculo");
        if (radio <= 0) {
            throw new Error("El radio debe ser un número positivo.");
        }
        this.radio = radio;
    }
    public calcularArea(): number {
        return Math.PI * this.radio * this.radio;
    }
}