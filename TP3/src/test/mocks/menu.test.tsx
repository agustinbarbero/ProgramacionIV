import { render, screen } from '@testing-library/react';
import { Menu } from '../../Components/Menu';
import userEvent from '@testing-library/user-event';


describe('Componente Menu', () => {
  test('Encuentra el cafe Mocca del menu', async() => {
    // Renderiza el componente TodoApp en un entorno de prueba virtual
    render(<Menu />);

    // Busca un elemento que contenga el texto "no hay tareas" (ignorando mayúsculas/minúsculas)
    // y verifica que esté presente en el documento.
    expect(await screen.findByText(/Mocca/i)).toBeInTheDocument();
  });
  
  test( 'simular click sobre el botón “Agregar” de un producto',async() => {
    render(<Menu />);

    const agregarBoton = await screen.findAllByText('Agregar');
    agregarBoton[0].click();

  
  })

  test("calcula el total del pedido al agregar productos", async () => {
  render(<Menu />);

  const agregarBotones = await screen.findAllByText("Agregar");

  agregarBotones[0].click();
  agregarBotones[1].click();
  agregarBotones[0].click(); 

  const totalElemento = await screen.findByText("Total: $5500");
  expect(totalElemento).toBeInTheDocument();
});

test('HU4 - Quita una unidad del pedido sin borrar todo', async () => {
  const user = userEvent.setup();
  render(<Menu />);

  // Esperar a que cargue el menú
  const botonesAgregar = await screen.findAllByRole('button', { name: /Agregar/i });

  // Agregar productos
  await user.click(botonesAgregar[0]); // Mocca
  await user.click(botonesAgregar[1]); // Latte
  await user.click(botonesAgregar[0]); // Mocca otra vez (ahora Mocca ×2)

  // Verificar el total después de agregar
  const totalAntes = await screen.findByText(/Total: \$5500/i);
  expect(totalAntes).toBeInTheDocument();

  // Verificar que haya 2 botones Quitar (Mocca y Latte)
  let botonesQuitar = await screen.findAllByRole('button', { name: /Quitar/i });
  expect(botonesQuitar.length).toBe(2);

  // Quitar una unidad del primer producto (Mocca)
  await user.click(botonesQuitar[0]);

  // Esperar a que el total se actualice (Mocca ×1 + Latte ×1 = $3500)
  const totalDespues = await screen.findByText(/Total: \$3500/i);
  expect(totalDespues).toBeInTheDocument();

  // Verificar que sigan existiendo los 2 botones "Quitar" (porque ambos siguen en el pedido)
  botonesQuitar = await screen.findAllByRole('button', { name: /Quitar/i });
  expect(botonesQuitar.length).toBe(2);
});




});