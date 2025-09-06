import { Animal } from "./Animal";
import { Pajaro } from "./Pajaro";
import { Zorro } from "./Zorro";

const miPajaro = new Pajaro("Piolin", "Canario");
console.log(miPajaro);
miPajaro.hacerSonido();
miPajaro.volar();

const miZorro = new Zorro("Foxy", "Común");
console.log(miZorro);
miZorro.hacerSonido();