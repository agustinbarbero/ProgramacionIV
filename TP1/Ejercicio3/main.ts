import { Empleado } from './Empleado';
import { EmpleadoTiempoCompleto } from './EmpleadoTiempoCompleto';
import { EmpleadoMedioTiempo } from './EmpleadoMedioTiempo';

// Arreglo de empleados
const empleados: Empleado[] = [
    new EmpleadoTiempoCompleto("Agustin Barbero", 20000),
    new EmpleadoTiempoCompleto("Luisa Fernandez", 70000),
    new EmpleadoMedioTiempo("Felipe Gonzalez", 90000),
    new EmpleadoMedioTiempo("Ana Lopez", 100000),
];

// Polimorfismo con el método calcularSalario() 
empleados.forEach((empleado, index) => {
    console.log(`${index + 1}. ${empleado.toString()}`);
    
    console.log("");
});
