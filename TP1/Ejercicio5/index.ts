import { Auto } from "./Auto";
import { Moto } from "./Moto";
import { Vehiculo } from "./Vehiculo";

const miAuto = new Auto("Tesla", "Model 3", 4);
console.log(miAuto.mostrarInfo());
console.log(miAuto.cargarBateria());
console.log(miAuto.arrancar());
console.log(miAuto.mostrarInfo());
console.log(miAuto.detener());

const miMoto = new Moto("Yamaha", "MT-07", 689);
console.log(miMoto.mostrarInfo())
console.log(miMoto.arrancar());
console.log(miMoto.mostrarInfo());
console.log(miMoto.detener());

const mivehiculoElectrico: Vehiculo = new Auto("Nissan", "Leaf", 4);

if (mivehiculoElectrico instanceof Auto) {
    console.log(mivehiculoElectrico.mostrarInfo());
    console.log(mivehiculoElectrico.cargarBateria());
    console.log(mivehiculoElectrico.arrancar());
    console.log(mivehiculoElectrico.mostrarInfo());
    console.log(mivehiculoElectrico.detener());
}
