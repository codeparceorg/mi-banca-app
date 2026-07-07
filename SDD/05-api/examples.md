# API Examples

---

## Authentication

### Login exitoso

```
POST /auth/login
Content-Type: application/json

{
  "email": "cliente@correo.com",
  "password": "Password123"
}
```

```
200 OK
Content-Type: application/json

{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsIm5hbWUiOiJKdWFuIFBlcmV6IiwiZXhwIjoxNzE3NjAwMDAwfQ.signature",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImV4cCI6MTcxODIwNDgwMH0.signature",
  "user": {
    "id": 1,
    "name": "Juan Pérez"
  }
}
```

### Login con credenciales inválidas

```
POST /auth/login
Content-Type: application/json

{
  "email": "wrong@correo.com",
  "password": "WrongPassword"
}
```

```
401 Unauthorized
Content-Type: application/json

{
  "message": "Credenciales inválidas"
}
```

### Login con error de servidor

```
500 Internal Server Error
Content-Type: application/json

{
  "message": "Error interno del servidor"
}
```

---

### Registro exitoso

```
POST /auth/signup
Content-Type: application/json

{
  "fullName": "Juan Pérez",
  "email": "juan@email.com",
  "password": "Password123"
}
```

```
201 Created
Content-Type: application/json

{
  "message": "Usuario registrado correctamente."
}
```

### Registro con correo duplicado

```
POST /auth/signup
Content-Type: application/json

{
  "fullName": "Juan Pérez",
  "email": "existente@email.com",
  "password": "Password123"
}
```

```
400 Bad Request
Content-Type: application/json

{
  "message": "El correo ya se encuentra registrado."
}
```

---

## Dashboard

### Obtener dashboard exitosamente

```
GET /dashboard
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

```
200 OK
Content-Type: application/json

{
  "saldo": 4850,
  "movimientos": [
    {
      "id": 1,
      "fecha": "2026-07-06",
      "descripcion": "Depósito nómina",
      "tipo": "Ingreso",
      "monto": 2500,
      "estado": "Completado"
    },
    {
      "id": 2,
      "fecha": "2026-07-05",
      "descripcion": "Transferencia a ahorros",
      "tipo": "Egreso",
      "monto": -500,
      "estado": "Completado"
    },
    {
      "id": 3,
      "fecha": "2026-07-04",
      "descripcion": "Pago de servicios",
      "tipo": "Egreso",
      "monto": -120,
      "estado": "Completado"
    },
    {
      "id": 4,
      "fecha": "2026-07-03",
      "descripcion": "Suscripción mensual",
      "tipo": "Egreso",
      "monto": -15,
      "estado": "Completado"
    },
    {
      "id": 5,
      "fecha": "2026-07-02",
      "descripcion": "Transferencia recibida",
      "tipo": "Ingreso",
      "monto": 800,
      "estado": "Completado"
    }
  ]
}
```

### Dashboard vacío (usuario sin movimientos)

```
200 OK
Content-Type: application/json

{
  "saldo": 0,
  "movimientos": []
}
```

---

## Transferencias

### Transferencia exitosa

```
POST /transfer
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Content-Type: application/json

{
  "cuentaDestino": "1234567890",
  "monto": 350.00,
  "descripcion": "Pago de servicios"
}
```

```
200 OK
Content-Type: application/json

{
  "id": 1001,
  "fecha": "2026-07-06T10:30:00Z",
  "estado": "Completado"
}
```

### Transferencia con saldo insuficiente

```
POST /transfer
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Content-Type: application/json

{
  "cuentaDestino": "1234567890",
  "monto": 999999.00,
  "descripcion": "Monto excede saldo"
}
```

```
400 Bad Request
Content-Type: application/json

{
  "message": "Saldo insuficiente"
}
```

---

## Perfil

### Obtener perfil exitosamente

```
GET /profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

```
200 OK
Content-Type: application/json

{
  "id": 1,
  "nombre": "Juan Pérez",
  "correo": "juan@email.com",
  "telefono": "5551234567",
  "direccion": "Av. Principal 123",
  "ciudad": "Ciudad de México",
  "numeroCliente": "CLT-00001",
  "fechaCreacion": "2026-01-15",
  "avatar": null
}
```

### Actualizar perfil exitosamente

```
PUT /profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Content-Type: application/json

{
  "nombre": "Juan Pérez Actualizado",
  "telefono": "5559876543",
  "direccion": "Av. Secundaria 456",
  "ciudad": "Monterrey"
}
```

```
200 OK
Content-Type: application/json

{
  "id": 1,
  "nombre": "Juan Pérez Actualizado",
  "correo": "juan@email.com",
  "telefono": "5559876543",
  "direccion": "Av. Secundaria 456",
  "ciudad": "Monterrey",
  "numeroCliente": "CLT-00001",
  "fechaCreacion": "2026-01-15",
  "avatar": null
}
```

### Actualizar perfil con datos inválidos

```
PUT /profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Content-Type: application/json

{
  "nombre": "J",
  "telefono": "abc"
}
```

```
400 Bad Request
Content-Type: application/json

{
  "message": "Datos inválidos",
  "errors": {
    "nombre": "El nombre debe tener entre 3 y 100 caracteres",
    "telefono": "El teléfono debe tener entre 7 y 15 dígitos"
  }
}
```

---

## Flujo completo: Registro → Login → Dashboard

### 1. Registro

```
POST /auth/signup
{ "fullName": "Ana López", "email": "ana@email.com", "password": "Ana12345" }
```

```
201 { "message": "Usuario registrado correctamente." }
```

### 2. Login

```
POST /auth/login
{ "email": "ana@email.com", "password": "Ana12345" }
```

```
200 {
  "accessToken": "eyJhbGci...",
  "refreshToken": "eyJhbGci...",
  "user": { "id": 2, "name": "Ana López" }
}
```

### 3. Dashboard (con token)

```
GET /dashboard
Authorization: Bearer eyJhbGci...
```

```
200 {
  "saldo": 10000,
  "movimientos": [...]
}
```

### 4. Transferencia

```
POST /transfer
Authorization: Bearer eyJhbGci...
{ "cuentaDestino": "9876543210", "monto": 500, "descripcion": "Pago renta" }
```

```
200 { "id": 1002, "fecha": "2026-07-06T14:00:00Z", "estado": "Completado" }
```
