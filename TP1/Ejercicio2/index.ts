import { FiguraGeometrica } from "./FiguraGeometrica";
import { Cuadrado } from "./Cuadrado";
import { Circulo } from "./Circulo";
import { Triangulo } from "./Triangulo";

const cuadrado = new Cuadrado(4);
const triangulo = new Triangulo(10, 5);
const circulo = new Circulo(3);

console.log("Área del cuadrado:", cuadrado.calcularArea());
console.log("Área del triángulo:", triangulo.calcularArea());
console.log("Área del círculo:", circulo.calcularArea());