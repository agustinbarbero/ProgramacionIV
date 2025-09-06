import { FiguraGeometrica } from "./FiguraGeometrica";

export class Cuadrado extends FiguraGeometrica {
    private lado: number;

    constructor(lado: number) {
        super("Cuadrado");
        if (lado <= 0) {
            throw new Error("El lado debe ser un número positivo.");
        }
        this.lado = lado;
    }
    public calcularArea(): number {
        return this.lado * this.lado;
    }
}