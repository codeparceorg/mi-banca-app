# Transfers API

Base URL: `VITE_API_GATEWAY` (default: `http://microservicio.sis-main-ms.lab`)

---

## POST /transfer

### Request

```
Authorization: Bearer <accessToken>
Content-Type: application/json
```

```json
{
  "cuentaDestino": "1234567890",
  "monto": 350.00,
  "descripcion": "Pago de servicios"
}
```

### Response 200

Respuesta esperada por el Frontend. Los campos exactos dependen del Backend; el Frontend propaga la respuesta sobre el resumen.

```json
{
  "id": 1001,
  "fecha": "2026-07-06T10:30:00Z",
  "estado": "Completado"
}
```

### Validations (Frontend-side)

| Campo          | Regla                                               |
|----------------|-----------------------------------------------------|
| cuentaDestino  | Obligatorio                                         |
| monto          | Obligatorio, mínimo $1, no puede superar el saldo disponible |
| descripcion    | Obligatorio                                         |

### Business Rules (Backend)

- El monto no puede ser menor a $1.
- El monto no puede superar el saldo disponible de la cuenta origen.
- La cuenta origen es implícita ("Cuenta principal").

### Error Responses

| Status | Body                                                    | Frontend Display                          |
|--------|---------------------------------------------------------|--------------------------------------------|
| 400    | `{ "message": "Saldo insuficiente" }`                   | "Error al realizar la transferencia"       |
| 400    | `{ "message": "Cuenta destino no válida" }`             | "Error al realizar la transferencia"       |
| 500    | `{ "message": "Error interno del servidor" }`           | "Error al realizar la transferencia"       |

### Post-Success Behavior

1. Show toast: "Transferencia realizada con éxito"
2. Show summary with:
   - Cuenta destino (from request)
   - Monto (from request)
   - Descripción (from request)
   - Data from API response (id, fecha, estado)
3. Invalidate `['dashboard']` query to refresh balance

### Post-Success UI (Summary Screen)

```
┌─────────────────────────────────┐
│ Transferencia exitosa           │
├─────────────────────────────────┤
│ Cuenta destino: 1234567890      │
│ Monto: $350                     │
│ Descripción: Pago de servicios  │
│ Folio: 1001                     │
│ Fecha: 2026-07-06 10:30         │
├─────────────────────────────────┤
│ [Nueva transferencia]           │
└─────────────────────────────────┘
```
