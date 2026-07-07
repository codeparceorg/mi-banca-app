# Task 005 - Implementar Mock Data para Dashboard

## Objetivo

Modificar el Dashboard para utilizar datos simulados (Mock Data) en lugar de consumir la API.

Esta modificación es temporal y tiene como objetivo permitir el desarrollo del Frontend sin depender del Backend.

---

# Contexto

Actualmente el Dashboard intenta obtener la información desde la API.

Durante esta etapa del proyecto el Backend aún no está disponible, por lo tanto toda la información debe provenir de datos simulados.

---

# Antes de implementar

Leer:

* AGENTS.md
* specs/architecture.md
* specs/implementation-rules.md
* specs/functional.md
* Task 002 - Dashboard

---

# Alcance

Modificar únicamente el origen de los datos del Dashboard.

No modificar:

* Diseño
* Layout
* Componentes
* Navegación
* Responsive
* Design System

---

# Implementación

Eliminar el consumo de la API del Dashboard.

Crear un proveedor de datos simulados respetando la arquitectura del proyecto.

La lógica de obtención de datos debe mantenerse desacoplada para facilitar el cambio a una API real en el futuro.

---

# Mock Data

Crear información ficticia para:

## Resumen

* Saldo disponible
* Ingresos del mes
* Gastos del mes

## Movimientos recientes

Mínimo 10 registros.

Cada movimiento debe contener:

* id
* fecha
* descripción
* tipo (Ingreso o Egreso)
* monto
* estado

---

## Acciones rápidas

Mantener las acciones existentes.

---

## Gráficos

Generar datos simulados para:

* Gastos mensuales
* Ingresos mensuales

Los datos deben ser coherentes entre sí.

---

# Organización

Crear una carpeta destinada a datos simulados siguiendo la arquitectura del proyecto.

Ejemplo:

src/

mock/

dashboard/

dashboard.mock.ts

No colocar los datos directamente dentro de los componentes.

---

# Reglas

Toda la información simulada debe estar centralizada.

No duplicar datos.

No utilizar valores aleatorios.

Los datos deben ser determinísticos para facilitar las pruebas.

---

# Preparación para Backend

El código debe quedar preparado para reemplazar fácilmente los datos simulados por un servicio REST.

La única modificación futura debería ser cambiar el proveedor de datos, sin alterar los componentes visuales.

---

# Restricciones

No eliminar servicios existentes.

No modificar modelos.

No eliminar interfaces.

No cambiar componentes reutilizables.

No modificar otras funcionalidades.

---

# Criterios de aceptación

✓ El Dashboard no realiza llamadas HTTP.

✓ Toda la información proviene de Mock Data.

✓ El diseño permanece exactamente igual.

✓ La arquitectura del proyecto se mantiene.

✓ Los datos simulados están centralizados.

✓ Es sencillo reemplazar el Mock por la API en el futuro.

✓ No existen errores de TypeScript.

✓ No existen errores de ESLint.

---

# Entregables

Al finalizar indicar:

* Archivos creados.
* Archivos modificados.
* Ubicación del Mock Data.
* Cómo reemplazar el Mock por la API cuando el Backend esté disponible.
