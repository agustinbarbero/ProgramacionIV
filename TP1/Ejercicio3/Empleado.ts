export abstract class Empleado {
    protected nombre:string;
    protected salarioBase:number;
    
    constructor(nombre:string, salarioBase:number) {
        this.nombre = nombre;
        this.salarioBase = salarioBase;
    }

    public getNombre():string {
        return this.nombre
    }

    public getSalarioBase():number {
        return this.salarioBase
    }

    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    public setSalarioBase(salarioBase: number): void {
        this.salarioBase = salarioBase;
    }

    public abstract calcularSalario(): number;

}
