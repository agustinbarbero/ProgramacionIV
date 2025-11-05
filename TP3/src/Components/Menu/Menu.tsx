"use cliente"
import React, { useEffect, useState } from 'react';

type Producto = {
    id: number,
    imagen: string,
    titulo: string,
    precio: number
}
const Menu: React.FC = () => {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [carrito, setCarrito] = useState<Producto[]>([]);

    useEffect(() => {
        fetch("http://localhost/api/menu")
            .then((res) => res.json())
            .then((data: Producto[]) => setProductos(data))
            .catch((err) => console.error("Error al cargar el menú:", err));
    }, []);

    const handleAgregarAlCarrito = (producto: Producto) => {
        setCarrito(prevCarrito => [...prevCarrito, producto]);
    };

    const handleQuitarDelCarrito = (e: React.MouseEvent, indice: number) => {
        e.stopPropagation();
        setCarrito(prevCarrito => prevCarrito.filter((_, i) => i !== indice));
    }

    const calcularTotal = () => {
        return carrito.reduce((total, producto) => total + producto.precio, 0);
    };

    return (
        <div>
            <h2>Menú</h2>
            <ul>
                {
                    productos.map((producto) => (
                        <li key={producto.id}>
                            {producto.titulo} - ${producto.precio}
                            <button onClick={() => handleAgregarAlCarrito(producto)}>
                                Agregar
                            </button>
                        </li>
                    ))
                }
            </ul>

            <hr />

            <h2>Carrito</h2>
            {carrito.length === 0 ? (
                <p>El carrito está vacío</p>
            ) : (
                <ul>
                    {
                        carrito.map((producto, index) => (
                            <li key={index}>
                                {producto.titulo}

                                <button onClick={(e) => handleQuitarDelCarrito(e, index)}>
                                    Quitar
                                </button>
                            </li>
                        ))
                    }
                </ul>
            )}

            <h3>Total: ${calcularTotal()}</h3>
        </div>
    );
};

export default Menu;
