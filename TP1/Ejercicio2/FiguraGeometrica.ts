export abstract class FiguraGeometrica {
    protected nombre: string;

    constructor(nombre: string) {
        if (!nombre) {
            throw new Error("El nombre de la figura es obligatorio.");
        }
        this.nombre = nombre;
    }
    public abstract calcularArea(): number;
}