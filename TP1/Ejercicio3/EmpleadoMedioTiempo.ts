import { Empleado } from "./Empleado";

export class EmpleadoMedioTiempo extends Empleado {

    constructor(nombre: string, salarioBase: number) {
        super(nombre, salarioBase);
    }

    public calcularSalario(): number {
        return this.salarioBase * 0.5;
    }

    public toString(): string {
        return `${this.nombre} - Empleado a medio tiempo. Salario base: $${this.salarioBase} x 0.5 = Total: $${this.calcularSalario()}`;
    }

}