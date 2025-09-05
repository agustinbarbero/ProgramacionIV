import { Empleado } from "./Empleado";

export class EmpleadoTiempoCompleto extends Empleado {
    private bonoFijo:number = 20000;

    constructor(nombre: string, salarioBase: number) {
        super(nombre, salarioBase);
    }

    public calcularSalario(): number {
        return this.salarioBase + this.bonoFijo;
    }

    public getBonoFijo(): number {
        return this.bonoFijo;
    }

    public setBonoFijo(bonoFijo: number): void {
        this.bonoFijo = bonoFijo;
    }

    public toString(): string {
        return `${this.nombre} - Empleado a tiempo completo. Salario base: $${this.salarioBase} + bono: $${this.bonoFijo} = Total: $${this.calcularSalario()}`;
    }
}