# Dashboard API

Base URL: `VITE_API_GATEWAY` (default: `http://microservicio.sis-main-ms.lab`)

---

## GET /dashboard

### Request

```
Authorization: Bearer <accessToken>
Content-Type: application/json
```

No query parameters or body required.

### Response 200

```json
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
    }
  ]
}
```

### Response Shape

| Campo        | Tipo    | Descripción                              |
|--------------|---------|------------------------------------------|
| saldo        | number  | Saldo disponible de la cuenta principal   |
| movimientos  | array   | Lista de transacciones recientes          |

### Movimiento Object

| Campo       | Tipo   | Descripción                                        |
|-------------|--------|----------------------------------------------------|
| id          | number | Identificador único del movimiento                  |
| fecha       | string | Fecha del movimiento (formato YYYY-MM-DD)          |
| descripcion | string | Descripción del movimiento                          |
| tipo        | string | "Ingreso" o "Egreso"                               |
| monto       | number | Monto (positivo para ingresos, negativo para egresos) |
| estado      | string | Estado del movimiento ("Completado")                |

### Frontend Usage

- `saldo` → BalanceCard, QuickActions (saldo disponible)
- `movimientos` donde monto > 0 → suma de ingresos del mes
- `movimientos` donde monto < 0 → suma de gastos del mes (valor absoluto)
- `movimientos.length` → total de movimientos
- `movimientos` → RecentTransactions table (últimos 12 movimientos)
- `movimientos.slice(0, 7)` → ExpenseChart (últimos 7 días, barra verde si monto > 0, roja si monto < 0)

### Error Responses

| Status | Body                                              | Frontend Display              |
|--------|---------------------------------------------------|--------------------------------|
| 401    | `{ "message": "No autorizado" }`                  | "Error al cargar el dashboard" |
| 500    | `{ "message": "Error interno del servidor" }`    | "Error al cargar el dashboard" |

### Empty State

When `movimientos` is an empty array `[]`, Frontend displays:

> "No hay movimientos recientes"
> "Realiza una transferencia para ver tus movimientos aquí."
