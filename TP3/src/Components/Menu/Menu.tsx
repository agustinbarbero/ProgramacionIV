import React, { useEffect, useState } from 'react';
import { menuData } from './../../test/mocks/menuData';

type Producto = {
  id: number;
  imagen: string;
  titulo: string;
  precio: number;
};

type ItemPedido = {
  id: number;
  titulo: string;
  precio: number;
  cantidad: number;
};

const Menu: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [pedido, setPedido] = useState<ItemPedido[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setProductos(menuData);
    }, 500);
  }, []);

  const agregarAlPedido = (producto: Producto) => {
    setPedido((prevPedido) => {
      const existente = prevPedido.find((item) => item.id === producto.id);
      if (existente) {
        return prevPedido.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        return [
          ...prevPedido,
          {
            id: producto.id,
            titulo: producto.titulo,
            precio: producto.precio,
            cantidad: 1,
          },
        ];
      }
    });
    
  };

  const totalPedido = pedido.reduce(
    (acumulado, item) => acumulado + item.precio * item.cantidad,
    0
  );
const handleQuitarDelCarrito = (e: React.MouseEvent, productoId: number) => {
  e.stopPropagation();
  setPedido((prevPedido) =>
    prevPedido
      .map((item) =>
        item.id === productoId
          ? { ...item, cantidad: item.cantidad - 1 }
          : item
      )
      .filter((item) => item.cantidad > 0) 
  );
};


  return (
    <div>
      <h2>Menú</h2>
      <ul>
        {productos.map((producto) => (
          <li key={producto.id}>
            <img src={producto.imagen} width={40} alt={producto.titulo} />
            {producto.titulo} - ${producto.precio}{' '}
            <button onClick={() => agregarAlPedido(producto)}>Agregar</button>
          </li>
        ))}
      </ul>

      <hr />

      <h3>Pedido actual</h3>
      {pedido.length === 0 ? (
        <p>No hay productos en el pedido.</p>
      ) : (
        <ul>
                    {
                        pedido.map((producto, index) => (
                            <li key={index}>
                                {producto.titulo}

                        <button onClick={(e) => handleQuitarDelCarrito(e, producto.id)}>
                            Quitar
                        </button>

                            </li>
                        ))
                    }
                </ul>
        )}
        <>
          <ul>
            {pedido.map((item) => (
              <li key={item.id}>
                {item.titulo} × {item.cantidad} = ${item.precio * item.cantidad}
              </li>
            ))}
          </ul>
          <h4>Total: ${totalPedido}</h4>
        </>
      
      
    </div>
  );
};

export default Menu;
