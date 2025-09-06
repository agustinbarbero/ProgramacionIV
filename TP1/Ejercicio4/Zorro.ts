import { Animal } from "./Animal";

export class Zorro extends Animal {
    constructor (nombre: string, especie: string) {
        super(nombre);
        if (!especie) {
            throw new Error("Especie es obligatoria.");
        }
    }

    override hacerSonido(): void {
        console.log("Hago ruido");
    }
}