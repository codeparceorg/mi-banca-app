# Task 011 - Implementar Wizard de Registro e Integración con Auth y Users

## Objetivo

Rediseñar el flujo de registro para convertirlo en un proceso de dos pasos (Wizard), integrando los microservicios de Autenticación y Gestión de Usuarios.

El registro ya no deberá solicitar toda la información en una sola pantalla.

La creación de la cuenta deberá dividirse en dos etapas claramente diferenciadas.

---

# Contexto

Actualmente el registro solicita únicamente credenciales y crea la cuenta.

A partir de esta tarea, el proceso de registro estará compuesto por dos pasos:

## Paso 1

Creación de credenciales.

Microservicio:

Auth Service

Endpoint:

POST /auth/signup

---

## Paso 2

Registro de la información personal del usuario.

Microservicio:

Users Service

Endpoint:

POST /users/save

---

# Antes de implementar

Leer obligatoriamente:

* AGENTS.md
* specs/vision.md
* specs/functional.md
* specs/architecture.md
* specs/components.md
* Contrato OpenAPI Auth Service
* Contrato OpenAPI Users Service


No comenzar la implementación sin revisar la documentación.

---

# Nuevo flujo de registro

La pantalla de registro deberá convertirse en un Wizard compuesto por dos pasos.

---

# Paso 1 - Credenciales

Título

Crear cuenta

Campos:

* Email
* Contraseña

Botón

Continuar

Consumir:

POST /auth/signup

Request

```json
{
  "email": "cliente@correo.com",
  "password": "Password123"
}
```

Si la creación es exitosa:

Guardar temporalmente:

* accessToken
* refreshToken
* user.id
* user.email

No redireccionar todavía al Dashboard.

Continuar automáticamente al Paso 2.

---

# Paso 2 - Información personal

Título

Completa tu información

Campos

* Nombre completo
* Teléfono
* Dirección
* Ciudad
* Avatar URL (opcional)

Consumir:

POST /users/save

Request

```json
{
  "full_name": "Juan Pérez",
  "email": "cliente@correo.com",
  "phone": "3001234567",
  "address": "Calle 10 #20-30",
  "city": "Bogotá",
  "avatar_url": ""
}
```

El correo electrónico debe tomarse automáticamente del Paso 1.

No permitir modificarlo.

---

# Flujo completo

Paso 1

↓

Auth Service

↓

Cuenta creada

↓

Paso 2

↓

Users Service

↓

Usuario creado

↓

Dashboard

---

# Manejo de errores

## Auth Service

400

Mostrar el mensaje retornado por la API.

Ejemplo:

* Correo ya registrado.

401

Mostrar mensaje amigable.

500

Mostrar:

"Ha ocurrido un error inesperado."

---

## Users Service

400

Mostrar errores de validación.

409

Mostrar mensaje retornado por la API.

500

Mostrar:

"Ha ocurrido un error inesperado."

---

# Comportamiento transaccional

El flujo debe manejar correctamente los errores entre ambos microservicios.

Si falla el Paso 2:

* No perder la sesión creada en Auth.
* Mostrar el error al usuario.
* Permitir reintentar el envío de la información personal.

No volver a solicitar el correo y la contraseña.

---

# Persistencia temporal

Mientras el Wizard no finalice:

Mantener en memoria o en el mecanismo definido por la arquitectura:

* accessToken
* refreshToken
* id del usuario
* email

No solicitar nuevamente esta información.

---

# Validaciones

## Paso 1

Email

* Obligatorio
* Formato válido

Contraseña

* Mínimo 8 caracteres

---

## Paso 2

Nombre completo

Obligatorio

Ciudad

Obligatoria

Teléfono

Opcional

Dirección

Opcional

Avatar URL

Opcional

Validar antes de enviar al Backend.

---

# Navegación

No permitir acceder directamente al Paso 2 si el Paso 1 no ha sido completado.

Si el usuario intenta acceder manualmente:

Redireccionar al Paso 1.

---

# UI

Mantener el mismo Design System.

Agregar un indicador de progreso.

Ejemplo:

Paso 1 de 2

Paso 2 de 2

No modificar la identidad visual de la aplicación.

---

# Arquitectura

No realizar llamadas HTTP desde los componentes.

La comunicación con ambos microservicios debe realizarse mediante la capa de servicios existente.

Separar claramente:

* Auth Service
* Users Service

No mezclar responsabilidades.

---

# Seguridad

Nunca almacenar la contraseña.

Nunca registrar tokens en consola.

Nunca registrar información sensible.

---

# Restricciones

No modificar:

* Login
* Dashboard
* Transferencias
* Perfil

Modificar únicamente el flujo de registro.

---

# Criterios de aceptación

## Paso 1

✓ Consume correctamente POST /auth/signup.

✓ Guarda temporalmente la información necesaria.

✓ Continúa automáticamente al Paso 2.

---

## Paso 2

✓ Consume correctamente POST /users/save.

✓ Utiliza el correo obtenido del Paso 1.

✓ Crea correctamente el perfil del usuario.

---

## Flujo

✓ El usuario finaliza ambos pasos.

✓ Es redireccionado al Dashboard.

✓ Los errores son manejados correctamente.

✓ El Wizard mantiene el estado entre pasos.

✓ No existen llamadas HTTP duplicadas.

✓ Se mantiene la arquitectura.

✓ No existen errores de TypeScript.

✓ No existen errores de ESLint.

---

# Definition of Done

La tarea estará terminada únicamente cuando:

* El registro esté dividido en dos pasos.
* Ambos microservicios estén correctamente integrados.
* El flujo de registro funcione de principio a fin.
* Se respeten las reglas de arquitectura del proyecto.
* El usuario pueda completar el registro sin inconsistencias.

---

# Entregables

Al finalizar proporcionar:

* Resumen del nuevo flujo implementado.
* Archivos creados.
* Archivos modificados.
* Servicios utilizados.
* Componentes nuevos del Wizard.
* Flujo de navegación implementado.
* Confirmación del cumplimiento de todos los criterios de aceptación.
