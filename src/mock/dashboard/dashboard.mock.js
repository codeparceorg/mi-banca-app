const movimientos = [
  { id: 1, fecha: '2026-07-06', descripcion: 'Depósito nómina', tipo: 'Ingreso', monto: 2500, estado: 'Completado' },
  { id: 2, fecha: '2026-07-05', descripcion: 'Transferencia a ahorros', tipo: 'Egreso', monto: -500, estado: 'Completado' },
  { id: 3, fecha: '2026-07-04', descripcion: 'Pago de servicios', tipo: 'Egreso', monto: -120, estado: 'Completado' },
  { id: 4, fecha: '2026-07-03', descripcion: 'Suscripción mensual', tipo: 'Egreso', monto: -15, estado: 'Completado' },
  { id: 5, fecha: '2026-07-02', descripcion: 'Transferencia recibida', tipo: 'Ingreso', monto: 800, estado: 'Completado' },
  { id: 6, fecha: '2026-07-01', descripcion: 'Pago de restaurante', tipo: 'Egreso', monto: -45, estado: 'Completado' },
  { id: 7, fecha: '2026-06-30', descripcion: 'Depósito por venta', tipo: 'Ingreso', monto: 1200, estado: 'Completado' },
  { id: 8, fecha: '2026-06-28', descripcion: 'Compra supermercado', tipo: 'Egreso', monto: -230, estado: 'Completado' },
  { id: 9, fecha: '2026-06-25', descripcion: 'Retiro efectivo', tipo: 'Egreso', monto: -200, estado: 'Completado' },
  { id: 10, fecha: '2026-06-22', descripcion: 'Pago de internet', tipo: 'Egreso', monto: -60, estado: 'Completado' },
  { id: 11, fecha: '2026-06-20', descripcion: 'Transferencia recibida', tipo: 'Ingreso', monto: 350, estado: 'Completado' },
  { id: 12, fecha: '2026-06-18', descripcion: 'Pago de gimnasio', tipo: 'Egreso', monto: -40, estado: 'Completado' },
];

const totalIngresos = movimientos
  .filter((m) => m.tipo === 'Ingreso')
  .reduce((a, b) => a + b.monto, 0);

const totalEgresos = movimientos
  .filter((m) => m.tipo === 'Egreso')
  .reduce((a, b) => a + Math.abs(b.monto), 0);

const saldo = totalIngresos - totalEgresos;

export const dashboardMock = {
  saldo,
  movimientos,
};
