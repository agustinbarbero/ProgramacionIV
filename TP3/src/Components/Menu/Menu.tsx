"use cliente"
import React, { useEffect, useState } from 'react';

type Producto={
    id: number,
    imagen: string,
    titulo: string,
    precio: number
}
const Menu: React.FC = () => {
    const [productos,setProductos] = useState<Producto[]>([]);

    useEffect(() => {
        fetch("http://localhost/api/menu")
        .then((res)=> res.json())
        .then((data: Producto[])=> setProductos(data))
        .catch((err)=> console.error("Error al cargar el menú:", err));
    },[]);

    return (
        <div>
            <ul>
            {
                productos.map((producto,index)=>(
                    <li key={index+producto.titulo}>{producto.titulo}</li>
                )
            
                )
            }
            </ul>
        </div>
    );
};

export default Menu;
