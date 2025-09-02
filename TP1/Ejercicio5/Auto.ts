import { Vehiculo } from "./Vehiculo";
import { Electrico } from "./Interface_Electrico";

export class Auto extends Vehiculo implements Electrico {
    private numPuertas: number;
    private bateriaCargada: boolean;

    constructor(marca: string, modelo: string, numPuertas: number) {
        super(marca, modelo);
        if (numPuertas <= 0) {
            throw new Error("El número de puertas debe ser mayor que cero.");
        }
        this.numPuertas = numPuertas;
        this.bateriaCargada = false;
    }

    override arrancar(): string {
        let mensaje: string;
        if (this.bateriaCargada) {
            mensaje = "El auto eléctrico ha arrancado.";
        } else {
            mensaje = "La batería está descargada. No se puede arrancar el auto.";
        }
        
        return mensaje;
    }
    override detener(): string {
        const mensaje = "El auto eléctrico se ha detenido.";
        return mensaje;
    }

    public cargarBateria(): string {
        this.bateriaCargada = true;
        const mensaje = "La batería del auto eléctrico está cargada.";
        
        return mensaje;
    }

    public mostrarInfo(): string {
        const infoBase = super.mostrarInfo();
        const infoExtra = `Número de puertas: ${this.numPuertas}, Batería cargada: ${this.bateriaCargada}`;
        const infoCompleta = `${infoBase}\n${infoExtra}`;
        return infoCompleta;
    }
}