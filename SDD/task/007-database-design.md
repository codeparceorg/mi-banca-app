# Task 007 - Database Design (PostgreSQL)

## Objetivo

Diseñar e implementar el modelo de datos relacional para la aplicación bancaria utilizando **PostgreSQL**.

El diseño debe soportar todas las funcionalidades actuales del proyecto y servir como base para el desarrollo del Backend.

---

# Contexto

Actualmente el Frontend utiliza Mock Data.

El siguiente paso del proyecto consiste en construir la base de datos y posteriormente el Backend.

La base de datos debe diseñarse pensando en escalabilidad, mantenibilidad y buenas prácticas de modelado relacional.

---

# Antes de comenzar

Leer obligatoriamente:

* AGENTS.md
* SDD/vision.md
* SDD/functional.md
* SDD/business-rules.md
* SDD/architecture.md
* SDD/api/
* Todas las tareas implementadas hasta el momento.

Analizar todas las entidades necesarias antes de crear el modelo de datos.

No asumir información que no esté documentada.

---

# Base de Datos

Motor:

PostgreSQL 17+

La solución debe ser compatible con PostgreSQL.

No utilizar características específicas de otros motores como SQL Server, Oracle o MySQL.

---

# Alcance

Diseñar el modelo de datos para soportar:

* Autenticación
* Usuarios
* Perfil
* Cuentas bancarias
* Dashboard
* Transferencias
* Historial de movimientos

No implementar todavía:

* Tarjetas
* Créditos
* Inversiones
* Pago de servicios
* Administración
* Auditoría avanzada

---

# Entregables

Crear la siguiente estructura:

database/

schema.sql

seed.sql

README.md

tables.md

relationships.md

constraints.md

indexes.md

erd.md

---

# Modelo Relacional

Diseñar todas las tablas necesarias.

Cada tabla debe incluir:

* Llave primaria
* Llaves foráneas
* Restricciones
* Índices
* Tipos de datos adecuados

Evitar duplicidad de información.

Normalizar el modelo al menos hasta 3FN.

---

# Entidades mínimas

El modelo debe contemplar al menos:

## Users

Información del usuario.

Ejemplo:

* id
* full_name
* email
* password_hash
* phone
* address
* city
* avatar_url
* status
* created_at
* updated_at

---

## Accounts

Representa las cuentas bancarias.

Ejemplo:

* id
* user_id
* account_number
* account_type
* currency
* balance
* status
* created_at

---

## Transactions

Representa todas las transacciones realizadas.

Ejemplo:

* id
* account_id
* destination_account
* transaction_type
* amount
* description
* status
* transaction_date
* created_at

---

## Refresh Tokens

Permite manejar sesiones.

Ejemplo:

* id
* user_id
* token
* expires_at
* revoked
* created_at

---

# Restricciones

Aplicar restricciones apropiadas.

Ejemplos:

* Email único.
* Número de cuenta único.
* Balance no negativo.
* Campos obligatorios.
* Relaciones obligatorias.

No permitir información inconsistente.

---

# Tipos de Datos

Utilizar tipos apropiados de PostgreSQL.

Ejemplos:

* UUID
* VARCHAR
* TEXT
* NUMERIC
* BOOLEAN
* TIMESTAMP WITH TIME ZONE

Evitar tipos genéricos innecesarios.

---

# Índices

Crear índices para mejorar el rendimiento.

Al menos considerar:

* email
* account_number
* user_id
* transaction_date

No crear índices innecesarios.

---

# Integridad Referencial

Todas las relaciones deben utilizar Foreign Keys.

Definir correctamente:

* ON DELETE
* ON UPDATE

Evitar registros huérfanos.

---

# Datos Iniciales

Crear un archivo:

seed.sql

Debe incluir información de ejemplo para:

Usuarios

Cuentas

Movimientos

Tokens (opcional)

Los datos deben ser coherentes entre sí.

No utilizar datos aleatorios.

---

# Dashboard

El modelo debe permitir obtener fácilmente:

* Saldo disponible
* Últimos movimientos
* Ingresos del mes
* Gastos del mes

Evitar consultas complejas innecesarias.

---

# Transferencias

El modelo debe soportar:

Cuenta origen

Cuenta destino

Monto

Estado

Fecha

Descripción

Historial completo

---

# Seguridad

Nunca almacenar:

Contraseñas en texto plano.

Guardar únicamente:

password_hash

Preparar el modelo para utilizar JWT y Refresh Tokens.

---

# Documentación

Generar:

## tables.md

Descripción de cada tabla.

---

## relationships.md

Explicación de todas las relaciones.

---

## constraints.md

Listado de todas las restricciones.

---

## indexes.md

Explicación de cada índice.

---

## erd.md

Descripción del diagrama entidad-relación.

---

## README.md

Explicar:

* Cómo crear la base de datos.
* Cómo ejecutar schema.sql.
* Cómo ejecutar seed.sql.

---

# Calidad

Verificar:

* Sin redundancia.
* Buenas prácticas de PostgreSQL.
* Modelo normalizado.
* Relaciones consistentes.
* Nombres claros.
* Convenciones consistentes.

---

# Restricciones

No generar código del Backend.

No generar entidades de .NET.

No generar repositorios.

No generar controladores.

Esta tarea únicamente debe diseñar la base de datos.

---

# Criterios de aceptación

✓ Existe un modelo relacional completo.

✓ Todas las tablas tienen PK.

✓ Todas las relaciones tienen FK.

✓ Existen restricciones de integridad.

✓ Existen índices apropiados.

✓ El modelo soporta todas las funcionalidades actuales.

✓ Existe schema.sql.

✓ Existe seed.sql.

✓ Existe documentación.

✓ La base de datos puede utilizarse directamente para comenzar el desarrollo del Backend.

---

# Definition of Done

La tarea estará terminada únicamente cuando:

* El modelo soporte todas las funcionalidades actuales.
* Todos los scripts SQL sean válidos para PostgreSQL.
* El schema.sql pueda ejecutarse sin errores.
* El seed.sql inserte datos consistentes.
* Toda la documentación haya sido generada.
* El modelo siga buenas prácticas de diseño relacional.

---

# Entregables Finales

Al finalizar proporcionar:

* Resumen del modelo diseñado.
* Lista de tablas creadas.
* Relaciones entre tablas.
* Justificación de las decisiones de diseño.
* Archivos generados.
* Posibles mejoras futuras para soportar nuevas funcionalidades como pagos, tarjetas, créditos e inversiones.
