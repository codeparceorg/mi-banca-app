# Profile API

Base URL: `VITE_API_GATEWAY` (default: `http://microservicio.sis-main-ms.lab`)

---

## GET /profile

### Request

```
Authorization: Bearer <accessToken>
Content-Type: application/json
```

No query parameters or body required.

### Response 200

```json
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

### Response Shape

| Campo          | Tipo   | Descripción                             | Editable |
|----------------|--------|-----------------------------------------|----------|
| id             | number | Identificador único del usuario         | No       |
| nombre         | string | Nombre completo del usuario             | Sí       |
| correo         | string | Correo electrónico                      | No       |
| telefono       | string | Número de teléfono (opcional)           | Sí       |
| direccion      | string | Dirección del usuario                   | Sí       |
| ciudad         | string | Ciudad del usuario                      | Sí       |
| numeroCliente  | string | Número único de cliente (read-only)     | No       |
| fechaCreacion  | string | Fecha de creación de la cuenta          | No       |
| avatar         | string/null | URL de la foto de perfil o null     | Sí       |

### Error Responses

| Status | Body                                              | Frontend Display               |
|--------|---------------------------------------------------|---------------------------------|
| 401    | `{ "message": "No autorizado" }`                  | "Error al cargar el perfil"    |
| 500    | `{ "message": "Error interno del servidor" }`    | "Error al cargar el perfil"    |

---

## PUT /profile

### Request

```
Authorization: Bearer <accessToken>
Content-Type: application/json
```

Solo se envían los campos que cambiaron (PATCH-like behavior).

```json
{
  "nombre": "Juan Pérez Actualizado",
  "telefono": "5559876543",
  "direccion": "Av. Secundaria 456",
  "ciudad": "Monterrey"
}
```

### Response 200

```json
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

Se espera el objeto completo del perfil actualizado como respuesta.

### Validations (Frontend-side)

| Campo     | Regla                                                    |
|-----------|----------------------------------------------------------|
| nombre    | Obligatorio, 3–100 caracteres, sin caracteres especiales (solo letras y espacios) |
| telefono  | Opcional, si se envía debe tener 7–15 dígitos            |
| direccion | Obligatorio, máximo 150 caracteres                       |
| ciudad    | Obligatorio                                              |

### Validations (Backend)

- No permitir caracteres especiales en el nombre.
- El email es válido (no se envía por PUT, pero debe persistir).
- El teléfono es opcional.

### Error Responses

| Status | Body                                                    | Frontend Display                  |
|--------|---------------------------------------------------------|------------------------------------|
| 400    | `{ "message": "Datos inválidos" }`                      | "Error al guardar los cambios."   |
| 500    | `{ "message": "Error interno del servidor" }`           | "Error al guardar los cambios."   |

### Post-Success Behavior

1. Show success alert: "Cambios guardados correctamente."
2. Alert auto-dismisses after 3 seconds
3. Reset pending changes tracking
4. Update cached profile data

### Avatar Upload

Avatar se maneja localmente en el Frontend mediante `URL.createObjectURL(file)`. No se envía al Backend en la implementación actual. Para integración futura, considerar `multipart/form-data` en un endpoint dedicado como `POST /profile/avatar`.
