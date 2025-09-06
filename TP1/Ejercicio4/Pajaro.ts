import { Animal } from "./Animal";
import { Volador } from "./Interface_Volador";

export class Pajaro extends Animal implements Volador {
    private especie: string;
    private volador: boolean;
    constructor(nombre: string, especie: string) {
        super(nombre);
        if (!especie) {
            throw new Error("Especie es obligatoria.");
        }
        this.especie = especie;
        this.volador = true;
    }

    override hacerSonido(): void {
        console.log("Hago ruido");
    }

    public volar(): void {
        if (this.volador) {
            console.log(`${this.nombre} está volando.`);
        } else {
            console.log(`${this.nombre} no puede volar.`);
        }
    }
}