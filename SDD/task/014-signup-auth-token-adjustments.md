# Task 014 - Ajustes en el flujo de Sign Up para la creación del Perfil

## Objetivo

Actualizar el flujo del segundo paso del registro (Información del Usuario) para adaptarlo a los últimos cambios realizados en el microservicio de usuarios.

La integración debe mantenerse compatible con el flujo actual del Wizard de registro.

---

# Contexto

El contrato entre el Frontend y el Backend fue actualizado.

A partir de esta tarea:

* Ya no se enviará el campo `avatar_url`.
* Se deberá enviar el identificador `auth_token_id` obtenido durante el primer paso del registro.
* El número de cliente será generado automáticamente por el Backend.
* El Frontend no debe generar ni calcular ningún identificador relacionado con el cliente.

---

# Antes de implementar

Leer obligatoriamente:

* AGENTS.md
* specs/architecture.md
* Task 011 - Signup Wizard

---

# Cambios requeridos

## Paso 1 - Auth Service

Después de ejecutar correctamente:

```http
POST /auth/signup
```

Guardar temporalmente la siguiente información:

* accessToken
* refreshToken
* user.id
* user.email
* auth_token_id

El valor de `auth_token_id` deberá obtenerse de la respuesta del servicio de autenticación.

Este identificador será utilizado únicamente durante el segundo paso del registro.

---

# Paso 2 - Users Service

Consumir:

```http
POST /users/save
```

Actualizando el cuerpo de la petición.

---

## Request esperado

```json
{
  "full_name": "Juan Pérez",
  "email": "cliente@email.com",
  "phone": "3001234567",
  "address": "Calle 10 #20-30",
  "city": "Bogotá",
  "auth_token_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
}
```

---

# Eliminar

No enviar el siguiente campo:

```text
avatar_url
```

El Backend será responsable de establecer el valor correspondiente cuando aplique.

---

# Client Number

No enviar:

* client_number

No mostrar:

* client_number durante el registro.

El Backend genera automáticamente este valor mediante la secuencia configurada en PostgreSQL.

El Frontend únicamente deberá consumir este dato cuando consulte posteriormente la información del usuario.

---

# Persistencia temporal

Durante el Wizard mantener disponibles:

* accessToken
* refreshToken
* email
* auth_token_id

No volver a solicitar esta información.

---

# Arquitectura

No modificar:

* Componentes visuales.
* Diseño del Wizard.
* Navegación.
* Validaciones existentes.

Modificar únicamente la lógica necesaria para construir correctamente la petición al microservicio de usuarios.

---

# Compatibilidad

El flujo del Wizard debe continuar funcionando de la siguiente manera:

Paso 1

↓

Auth Service

↓

Guardar datos temporales

↓

Paso 2

↓

Users Service

↓

Dashboard

---

# Restricciones

No modificar:

* Login
* Dashboard
* Profile
* Transferencias

No modificar la experiencia visual del registro.

No agregar nuevos campos al formulario.

---

# Criterios de aceptación

✓ El campo `avatar_url` ya no se envía al Backend.

✓ El campo `auth_token_id` se envía correctamente al microservicio de usuarios.

✓ El valor de `auth_token_id` proviene del primer paso del registro.

✓ El Frontend no genera el `client_number`.

✓ El flujo del Wizard continúa funcionando correctamente.

✓ No existen errores de TypeScript.

✓ No existen errores de ESLint.

---

# Definition of Done

La tarea estará terminada únicamente cuando:

* El segundo paso del registro utilice el nuevo contrato del microservicio de usuarios.
* El flujo completo del Wizard siga funcionando correctamente.
* El Frontend no envíe información que ahora es responsabilidad del Backend.
* La arquitectura del proyecto permanezca consistente.

---

# Entregables

Al finalizar proporcionar:

* Resumen de los cambios realizados.
* Archivos modificados.
* Ajustes realizados en los DTOs o modelos.
* Confirmación de que el nuevo contrato del Backend se está utilizando correctamente.
* Verificación del cumplimiento de todos los criterios de aceptación.
