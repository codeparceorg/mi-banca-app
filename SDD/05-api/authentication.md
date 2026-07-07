# Authentication API

Base URL: `VITE_API_GATEWAY` (default: `http://microservicio.sis-main-ms.lab`)

All endpoints accept and return JSON. Timeout: 15 seconds.

---

## POST /auth/login

### Request

```
Content-Type: application/json
```

```json
{
  "email": "cliente@correo.com",
  "password": "Password123"
}
```

### Response 200

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "name": "Juan Pérez"
  }
}
```

### Validations

| Campo    | Regla                |
|----------|----------------------|
| email    | Obligatorio, formato válido |
| password | Obligatorio, mínimo 8 caracteres |

### Error Responses

| Status | Body                                              | Frontend Display                |
|--------|---------------------------------------------------|----------------------------------|
| 401    | `{ "message": "Credenciales inválidas" }`        | "Correo o contraseña incorrectos." |
| 500    | `{ "message": "Error interno del servidor" }`    | "Ha ocurrido un error inesperado." |
| Timeout | —                                                | "No fue posible conectar con el servidor." |

### Frontend Storage

- `accessToken` → `localStorage`
- `refreshToken` → `localStorage`
- `user` (JSON) → `localStorage`

---

## POST /auth/signup

### Request

```
Content-Type: application/json
```

```json
{
  "fullName": "Juan Pérez",
  "email": "juan@email.com",
  "password": "Password123"
}
```

### Response 201

```json
{
  "message": "Usuario registrado correctamente."
}
```

### Validations

| Campo     | Regla                                              |
|-----------|----------------------------------------------------|
| fullName  | Obligatorio, 3–100 caracteres                      |
| email     | Obligatorio, formato válido                        |
| password  | Obligatorio, mínimo 8 caracteres, debe incluir mayúscula, minúscula y número |

### Error Responses

| Status | Body                                                    | Frontend Display                     |
|--------|---------------------------------------------------------|---------------------------------------|
| 400    | `{ "message": "El correo ya se encuentra registrado." }` | Mensaje devuelto por la API          |
| 500    | `{ "message": "Error interno del servidor" }`           | "Ha ocurrido un error inesperado."   |
| Timeout | —                                                      | "No fue posible conectar con el servidor." |

### Post-Success Behavior

- Show success message "Usuario registrado correctamente."
- Redirect to `/login` after 2 seconds

---

## POST /auth/forgot-password

_Previsto en visión del producto. No implementado en Frontend._

### Request (previsto)

```json
{
  "email": "cliente@correo.com"
}
```

### Response 200 (previsto)

```json
{
  "message": "Se ha enviado un enlace de recuperación a tu correo."
}
```

---

## POST /auth/reset-password

_Previsto en visión del producto. No implementado en Frontend._

### Request (previsto)

```json
{
  "token": "reset-token",
  "password": "NewPassword123"
}
```

### Response 200 (previsto)

```json
{
  "message": "Contraseña actualizada correctamente."
}
```
