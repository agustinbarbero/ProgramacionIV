import React, { useEffect, useState } from 'react';
// Importamos menuData para usarlo en modo desarrollo
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
  const [confirmationMessage, setConfirmationMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- CORRECCIÓN EN USEEFFECT ---
  useEffect(() => {
    // Esta función SÍ usa fetch. Es la que usarán tus tests (HU1, HU6).
    const fetchMenu = async () => {
      try {
        const response = await fetch('http://localhost/api/menu');
        if (!response.ok) {
          // Esto es lo que prueba tu primer test de HU6
          throw new Error('Error al cargar el menú.');
        }
        const data = await response.json();
        // Si la data está vacía, esto es lo que prueba tu segundo test de HU6
        setProductos(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    // Usamos la variable de Vite para decidir
    if (import.meta.env.DEV) {
      // MODO DEV (npm run dev): Simula la carga sin fetch.
      console.log("Modo DEV: Cargando datos locales simulados.");
      setTimeout(() => {
        setProductos(menuData);
        setIsLoading(false);
      }, 500);
    } else {
      // MODO TEST (npm test): Llama a fetch() para que MSW lo intercepte.
      fetchMenu();
    }
  }, []);

  const agregarAlPedido = (producto: Producto) => {
    setConfirmationMessage('');
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

  // --- CORRECCIÓN EN HANDLESUBMIT ---
  // Tu función actual solo simula, rompe el test HU5
  const handleEnviarPedido = async () => {
    setConfirmationMessage('Enviando pedido...');
    try {
      // Aplicamos la misma lógica condicional
      if (import.meta.env.DEV) {
        // MODO DEV (npm run dev): Simula el envío sin fetch.
        console.log("Modo DEV: Simulando envío de pedido (POST).");
        setTimeout(() => {
          setConfirmationMessage('Pedido confirmado');
          setPedido([]); // Limpiar el pedido
        }, 500);
      } else {
        // MODO TEST (npm test): Llama a fetch() para que MSW lo intercepte (HU5).
        const response = await fetch('http://localhost/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(pedido),
        });

        if (response.ok) {
          const data = await response.json();
          setConfirmationMessage(data.message);
          setPedido([]);
        } else {
          setConfirmationMessage('Error al enviar el pedido.');
        }
      }
    } catch (error) {
      setConfirmationMessage('Error de conexión.');
    }
  };

  const totalPedido = pedido.reduce(
    (acumulado, item) => acumulado + item.precio * item.cantidad,
    0
  );

  const handleQuitarDelCarrito = (e: React.MouseEvent, productoId: number) => {
    e.stopPropagation();
    setConfirmationMessage('');
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


  if (isLoading) {
    return <p>Cargando menú...</p>;
  }

  if (error) {
    // Esta línea ahora será alcanzada por tu test HU6 de error 500
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Menú</h2>
      {productos.length === 0 ? (
        // Esta línea ahora será alcanzada por tu test HU6 de menú vacío
        <p>No hay productos disponibles</p>
      ) : (
        <ul>
          {productos.map((producto) => (
            <li key={producto.id}>
              <img src={producto.imagen} width={40} alt={producto.titulo} />
              M             {producto.titulo} - ${producto.precio}{' '}
              <button onClick={() => agregarAlPedido(producto)}>Agregar</button>
            </li>
          ))}
        </ul>
      )}

      <hr />

      <h3>Pedido actual</h3>
      {pedido.length === 0 ? (
        <p>No hay productos en el pedido.</p>
      ) : (
        <>
          <ul>
            {pedido.map((item) => (
              <li key={item.id}>
                {item.titulo} × {item.cantidad} = ${item.precio * item.cantidad}
                <button
                  onClick={(e) => handleQuitarDelCarrito(e, item.id)}
                  style={{ marginLeft: '10px' }}
                >
                  Quitar
                </button>
              </li>
            ))}
          </ul>
          <h4>Total: ${totalPedido}</h4>
        </>
      )}

      <button onClick={handleEnviarPedido} disabled={pedido.length === 0}>
        Enviar pedido
      </button>
      {confirmationMessage && <p>{confirmationMessage}</p>}
    </div>
  );
};

export default Menu;