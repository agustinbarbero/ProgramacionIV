### Requisitos
- Node.js v18+
- npm

### Instalación y ejecución


1. Clonar el repositorio
2. Dentro de la carpeta del proyecto instalar:

```bash
npm install

# Correr todos los tests
npm test

# Correr tests con cobertura
npm test -- --coverage
```


### Ejemplos curl


POST:
```bash
curl -X GET http://localhost:3000/api/reservations/
{
    "customerName": "Juan Pérez",
    "customerEmail": "juanperez@example.com",
    "partySize": 4,
    "reservationDate": "2025-10-12",
    "reservationTime": "20:00",
    "status": "pending"
  }
```
  
Resultado esperado:
```bash
{
  "success": true,
  "message": "Reserva creada con éxito",
  "data": {
    "id": "1",
    "customerName": "Juan Pérez",
    "customerEmail": "juanperez@example.com",
    "partySize": 4,
    "reservationDate": "2025-10-12",
    "reservationTime": "20:00",
    "status": "pending",
    "createdAt": "2025-10-06T18:30:00.000Z"
  }
}
```


GET:
```bash
curl -X GET http://localhost:3000/api/reservations/1
Resultado esperado:
{
    "customerName": "Juan Pérez",
    "customerEmail": "juanperez@example.com",
    "partySize": 4,
    "reservationDate": "2025-10-12",
    "reservationTime": "20:00",
    "id": "1",
    "status": "pending",
    "createdAt": "2025-10-06T22:20:11.872Z"
}
```


PUT:
```bash
curl -X PUT http://localhost:3000/api/reservations/1 
{
    "customerName": "Juan Pérez",
    "customerEmail": "juanperez@example.com",
    "partySize": 6,
    "reservationDate": "2025-10-12",
    "reservationTime": "22:00",
    "id": "1",
    "status": "confirmed"
}
```


Resultado esperado:
```bash
{
    "success": true,
    "message": "Reserva actualizada exitosamente",
    "updated": {
        "customerName": "Juan Pérez",
        "customerEmail": "juanperez@example.com",
        "partySize": 6,
        "reservationDate": "2025-10-12",
        "reservationTime": "22:00",
        "id": "1",
        "status": "pending",
        "createdAt": "2025-10-06T22:20:11.872Z"
    }
}
```


DELETE:
```bash
curl -X DELETE http://localhost:3000/api/reservations/1
Resultado esperado:
{
    "success": true,
    "message": "Reserva eliminado exitosamente",
    "eliminated": "Reserva 1 borrada exitosamente"
}
```


### Matriz de casos:
[Matriz de casos](<../../../../TP2/Matriz de Casos.xlsx>)