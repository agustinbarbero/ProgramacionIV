import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Menu } from '../../Components/Menu';

describe('Componente Menu', () => {
  test('Encuentra el cafe Mocca del menu', async () => {
    // Renderiza el componente TodoApp en un entorno de prueba virtual
    render(<Menu />);

    // Busca un elemento que contenga el texto "no hay tareas" (ignorando mayúsculas/minúsculas)
    // y verifica que esté presente en el documento.
    expect(await screen.findByText(/Mocca/i)).toBeInTheDocument();
  });

  test('HU4 - Elimina un item del pedido sin borrar todo', async () => {
    const user = userEvent.setup();
    render(<Menu />);

    const totalElement = screen.getByText(/total: \$(\d+)/i);

    const botonesAgregar = await screen.findAllByRole('button', { name: /Agregar/i });
    const botonMocca = botonesAgregar[0];
    const botonLatte = botonesAgregar[1];

    //Agrega productos duplicados
    await user.click(botonMocca);
    await user.click(botonLatte);
    await user.click(botonMocca);

    expect(totalElement).toHaveTextContent('Total: $5800');

    // Verificar que hay 3 botones 
    let botonesQuitar = await screen.findAllByRole('button', { name: /Quitar/i });
    expect(botonesQuitar).toHaveLength(3);

    // Sacar el moca
    await user.click(botonesQuitar[0]);

    // El total debe ser $3800 (5800 - 2000)
    expect(totalElement).toHaveTextContent('Total: $3800');

    // deberian quedar solo 2 botones 
    botonesQuitar = screen.getAllByRole('button', { name: /Quitar/i });
    expect(botonesQuitar).toHaveLength(2);
  });
});