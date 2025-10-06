### Requisitos
- Node.js v18+
- npm


### Aclaración
Este proyecto utiliza Jest


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
| ID   | Caso / Descripción                                        | Precondición                              | Input                                  | Acción                                    | Resultado esperado                                                         | Test                            |
|:-----|:----------------------------------------------------------|:------------------------------------------|:---------------------------------------|:------------------------------------------|:---------------------------------------------------------------------------|:--------------------------------|
| CA1  | Crear una reserva correctamente                           | No existen reservas previas               | Datos válidos del cliente y la reserva | POST /api/reservations                    | Devuelve 201, success=true y una reserva con ID generado                   | reservation.integration.test.ts |
| CA2  | Crear una reserva con datos inválidos                     | No existen reservas previas               | Email inválido u otro campo erróneo    | POST /api/reservations                    | Devuelve 400 y success=false                                               | reservation.integration.test.ts |
| CA3  | Obtener reserva por ID válido                             | Existe una reserva creada                 | ID de reserva existente                | GET /api/reservations/:id                 | Devuelve 200 y datos correctos                                             | reservation.integration.test.ts |
| CA4  | Obtener reserva por ID inexistente                        | No existe reserva con ese ID              | ID inexistente                         | GET /api/reservations/:id                 | Devuelve 404                                                               | reservation.integration.test.ts |
| CA5  | Actualizar una reserva existente                          | Reserva creada previamente                | ID válido + nuevos datos               | PUT /api/reservations/:id                 | Devuelve 200, success=true y datos actualizados                            | reservation.integration.test.ts |
| CA6  | Eliminar una reserva existente                            | Reserva creada previamente                | ID válido                              | DELETE /api/reservations/:id              | Devuelve 200, success=true y al volver a buscarla da 404                   | reservation.integration.test.ts |
| CA7  | Flujo completo E2E (crear, obtener, actualizar, eliminar) | Servidor corriendo y sin reservas previas | Datos válidos de reserva               | POST, GET, PUT, DELETE secuenciales       | Todas las operaciones devuelven los códigos esperados (201, 200, 200, 200) | reservation.e2e.test.ts         |
| CA8  | Crear reserva desde modelo                                | No hay reservas                           | Datos de cliente y fecha               | ReservationModel.createReservation()      | Crea objeto con ID, status='pending', createdAt Date                       | reservation.model.test.ts       |
| CA9  | Buscar reserva existente (modelo)                         | Hay reservas creadas                      | ID válido                              | ReservationModel.findById()               | Devuelve la reserva correspondiente                                        | reservation.model.test.ts       |
| CA10 | Buscar reserva inexistente (modelo)                       | No existe ID buscado                      | ID inválido                            | ReservationModel.findById()               | Devuelve undefined                                                         | reservation.model.test.ts       |
| CA11 | Actualizar reserva existente (modelo)                     | Reserva creada                            | ID válido + campo a modificar          | ReservationModel.update()                 | Devuelve reserva actualizada                                               | reservation.model.test.ts       |
| CA12 | Actualizar reserva inexistente (modelo)                   | No existe el ID                           | ID inválido                            | ReservationModel.update()                 | Devuelve undefined                                                         | reservation.model.test.ts       |
| CA13 | Eliminar reserva existente (modelo)                       | Reserva creada                            | ID válido                              | ReservationModel.deleteReservation()      | Devuelve mensaje de eliminación                                            | reservation.model.test.ts       |
| CA14 | Eliminar reserva inexistente (modelo)                     | No existe el ID                           | ID inválido                            | ReservationModel.deleteReservation()      | Devuelve undefined                                                         | reservation.model.test.ts       |
| CA15 | Crear reserva con Service correctamente                   | Modelo vacío                              | Datos válidos                          | ReservationService.createReservation()    | Devuelve objeto reserva con ID y estado pending                            | reservation.service.test.ts     |
| CA16 | Buscar reserva existente con Service                      | Hay reservas                              | ID válido                              | ReservationService.findById()             | Devuelve la reserva                                                        | reservation.service.test.ts     |
| CA17 | Buscar reserva inexistente con Service                    | No existe ID                              | ID inválido                            | ReservationService.findById()             | Devuelve undefined                                                         | reservation.service.test.ts     |
| CA18 | Actualizar reserva con Service                            | Hay reservas                              | ID válido + campo modificado           | ReservationService.update()               | Devuelve reserva modificada                                                | reservation.service.test.ts     |
| ER1  | Error al actualizar reserva inexistente                   | ID no registrado                          | ID inválido                            | ReservationService.update()               | Lanza error “Reserva inexistente”                                          | reservation.service.test.ts     |
| ER2  | Error al eliminar reserva con ID vacío                    | ID vacío                                  | ''                                     | ReservationService.deleteReservation()    | Lanza error “ID inválido”                                                  | reservation.service.test.ts     |
| ER3  | Error al eliminar reserva inexistente                     | ID no existente                           | ID inválido                            | ReservationService.deleteReservation()    | Lanza error “Error al eliminar reserva”                                    | reservation.service.test.ts     |
| CA19 | Crear reserva (Controller) correctamente                  | Servicio responde OK                      | Body válido                            | ReservationController.createReservation() | Responde 201 con mensaje de éxito y reserva creada                         | reservation.controller.test.ts  |
| ER4  | Error al crear reserva (Controller)                       | Servicio lanza error                      | Body válido                            | ReservationController.createReservation() | Responde 500 con success=false                                             | reservation.controller.test.ts  |
| CA20 | Buscar reserva existente (Controller)                     | Servicio devuelve resultado               | ID válido                              | ReservationController.findById()          | Devuelve 200 con los datos de la reserva                                   | reservation.controller.test.ts  |
| CA21 | Buscar reserva inexistente (Controller)                   | Servicio devuelve null                    | ID inválido                            | ReservationController.findById()          | Devuelve 404 con mensaje “no encontrada”                                   | reservation.controller.test.ts  |
| ER5  | Error en findById (Controller)                            | Servicio lanza error                      | ID válido                              | ReservationController.findById()          | Devuelve 500 con mensaje de error                                          | reservation.controller.test.ts  |
| CA22 | Actualizar reserva (Controller)                           | Servicio responde correctamente           | ID válido + datos nuevos               | ReservationController.update()            | Devuelve 200 con mensaje de éxito y datos actualizados                     | reservation.controller.test.ts  |
| ER6  | Error al actualizar (Controller)                          | Servicio lanza error                      | ID válido                              | ReservationController.update()            | Devuelve 500 con mensaje de error                                          | reservation.controller.test.ts  |
| CA23 | Eliminar reserva (Controller)                             | Servicio devuelve true                    | ID válido                              | ReservationController.deleteReservation() | Devuelve 200 con mensaje de éxito                                          | reservation.controller.test.ts  |
| ER7  | Error al eliminar reserva (Controller)                    | Servicio lanza error                      | ID válido                              | ReservationController.deleteReservation() | Devuelve 500 con mensaje de error                                          | reservation.controller.test.ts  |
