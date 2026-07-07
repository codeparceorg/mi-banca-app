# Task 800 - Backend SDD Bootstrap

## Objetivo

Crear toda la estructura base de **Spec-Driven Development (SDD)** para el Backend de la aplicación bancaria.

Este backend debe alinearse con:

* Frontend existente (React + Mock Data)
* API Contract definido en specs/api
* Base de datos PostgreSQL diseñada en Task 007
* Reglas de negocio del sistema

---

# Contexto

El proyecto ya cuenta con:

✔ Frontend completamente especificado
✔ Tasks de UI (Login, Signup, Dashboard, Profile)
✔ API Contract definido
✔ Modelo de base de datos PostgreSQL diseñado

Ahora se debe construir el **Backend desde cero usando SDD**.

---

# Objetivo del SDD Backend

El backend debe desarrollarse siguiendo un enfoque:

> Spec → Plan → Implementación → Tests → Review

El agente debe trabajar únicamente desde especificaciones.

---

# Entregables

Crear la siguiente estructura:

backend/

docs/

vision.md

architecture.md

features/

auth.md

users.md

accounts.md

transactions.md

api/

openapi.yaml

database/

migrations.md

seed.md

agents/

backend-agent.md

rules.md

tasks/

001-auth-service.md

002-users-service.md

003-accounts-service.md

004-transactions-service.md

---

# Backend Agent (CRÍTICO)

Crear un archivo:

backend/agents/backend-agent.md

Este archivo debe definir el comportamiento del agente.

Debe incluir:

## Rol

Backend Engineer Senior especializado en:

* Node.js (o .NET si el proyecto lo requiere)
* PostgreSQL
* Arquitectura limpia
* APIs REST

---

## Reglas del agente

* Nunca implementar sin leer specs.
* Nunca inventar endpoints.
* Siempre seguir OpenAPI.
* Siempre respetar schema de base de datos.
* No modificar frontend.
* No cambiar contratos sin aprobación.

---

## Flujo obligatorio

1. Leer feature
2. Leer API contract
3. Leer DB schema
4. Crear plan
5. Implementar
6. Escribir tests
7. Revisar

---

# Arquitectura Backend

Definir arquitectura basada en capas:

* Controllers
* Services
* Repositories
* DTOs
* Entities
* Middleware
* Validators

Debe ser modular y escalable.

---

# Features a implementar

El backend debe soportar:

## 1. Authentication

* Login
* Signup (si aplica)
* Refresh Token
* JWT

---

## 2. Users

* Obtener perfil
* Actualizar perfil

---

## 3. Accounts

* Obtener cuentas
* Balance

---

## 4. Transactions

* Crear transferencia
* Historial
* Validaciones de negocio

---

# Reglas de negocio

* No transferir si balance < amount
* Emails únicos
* Passwords hasheadas
* Transacciones auditables
* Estados de transacción (pending, success, failed)

---

# API Contract

Debe generarse o alinearse con:

* specs/api/openapi.yaml

No se permite divergencia.

---

# Base de Datos

Debe conectarse al schema generado en:

Task 007 - Database Design

No se permite cambiar el modelo sin actualización del SDD.

---

# Tasks Backend (DESPUÉS de este bootstrap)

El agente deberá trabajar en:

001-auth-service.md
002-users-service.md
003-accounts-service.md
004-transactions-service.md

Cada uno debe seguir el patrón:

Spec → Plan → Code → Test → Review

---

# Restricciones

* No implementar frontend
* No modificar UI
* No cambiar design system
* No inventar endpoints
* No cambiar base de datos sin spec

---

# Criterios de aceptación

✓ Estructura backend SDD creada
✓ Agente backend definido
✓ Arquitectura documentada
✓ Features separadas
✓ API contract integrado
✓ DB schema referenciado
✓ Listo para implementación por tareas

---

# Resultado esperado

Al finalizar esta tarea:

El proyecto debe estar listo para iniciar desarrollo backend basado en tareas independientes, sin ambigüedad y sin decisiones improvisadas.
