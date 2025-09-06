import { FiguraGeometrica } from "./FiguraGeometrica";

export class Triangulo extends FiguraGeometrica {
    private base: number;
    private altura: number;

    constructor(base: number, altura: number) {
        super("Triángulo");
        if (base <= 0 || altura <= 0) {
            throw new Error("La base y la altura deben ser números positivos.");
        }
        this.base = base;
        this.altura = altura;
    }
    public calcularArea(): number {
        return (this.base * this.altura) / 2;
    }   
}