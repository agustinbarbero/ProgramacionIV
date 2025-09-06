export abstract class Animal {
    protected nombre: string;

    constructor(nombre: string) {
        if (!nombre) {
            throw new Error("Nombre es obligatorio.");
        }
        this.nombre = nombre;
    }

    public abstract hacerSonido(): void;
}