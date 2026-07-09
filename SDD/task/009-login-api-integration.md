# Task 010 - Integración del Login con el Backend

## Objetivo

Integrar el módulo de Login con el microservicio de autenticación.

La implementación debe reemplazar el Mock Data utilizado actualmente por una llamada HTTP al servicio de autenticación, manteniendo la arquitectura, el diseño y la experiencia de usuario existentes.

---

# Contexto

El Backend del servicio de autenticación ya se encuentra disponible.

A partir de esta tarea, el Login dejará de utilizar Mock Data y comenzará a consumir la API REST del microservicio de autenticación.

No se debe modificar el comportamiento visual del Login.

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

No asumir información que no esté documentada.

---

# URL Base

Utilizar el siguiente Base URL para todas las peticiones de autenticación:

```text
http://microservicio.sis-main-ms.lab
```

La URL debe configurarse mediante variables de entorno.

No escribir la URL directamente en los servicios.

Ejemplo:

```env
VITE_API_BASE_URL=http://microservicio.sis-main-ms.lab
```

Toda la aplicación debe consumir esta variable.

---

# Alcance

Esta tarea incluye únicamente:

* Integrar el Login con la API.
* Consumir el endpoint de autenticación.
* Persistir los tokens.
* Persistir la información básica del usuario.
* Manejar errores del servidor.

No incluye:

* Registro de usuarios.
* Refresh Token automático.
* Logout.
* Recuperación de contraseña.

---

# Endpoint

## Login

POST

```text
/auth/login
```

URL final

```text
http://microservicio.sis-main-ms.lab/auth/login
```

---

# Request

```json
{
  "email": "cliente@correo.com",
  "password": "Password123"
}
```

---

# Response 200

```json
{
  "accessToken": "...",
  "refreshToken": "...",
  "user": {
    "id": "uuid",
    "name": "Juan Pérez"
  }
}
```

---

# Response 401

```json
{
  "message": "Credenciales inválidas"
}
```

Mostrar:

"Correo o contraseña incorrectos."

---

# Response 500

Mostrar:

"Ha ocurrido un error inesperado."

---

# Timeout

Mostrar:

"No fue posible conectar con el servidor."

---

# Persistencia

Guardar:

* accessToken
* refreshToken
* user.id
* user.name

Utilizar la estrategia de almacenamiento definida por la arquitectura del proyecto.

No guardar información innecesaria.

Nunca almacenar la contraseña.

---

# Navegación

Si el Login es exitoso

Redirigir automáticamente a:

```text
/dashboard
```

Si el Login falla

Permanecer en la pantalla actual mostrando el mensaje correspondiente.

---

# Arquitectura

La integración debe respetar la arquitectura existente.

No realizar llamadas HTTP directamente desde los componentes.

La comunicación con la API debe realizarse mediante la capa de servicios definida en el proyecto.

Separar responsabilidades entre:

* Servicio HTTP
* Servicio de autenticación
* Hooks (si aplica)
* Componentes UI

---

# Cliente HTTP

Reutilizar el cliente HTTP existente.

Si no existe, crear un cliente centralizado.

No utilizar llamadas HTTP duplicadas.

No utilizar URLs hardcodeadas.

---

# Manejo de Errores

Implementar un manejo consistente para:

* 400
* 401
* 403
* 404
* 500
* Timeout
* Error de red

Todos los mensajes deben ser amigables para el usuario.

No mostrar errores internos del servidor.

---

# Loading

Mientras la petición está en progreso:

* Deshabilitar el botón "Ingresar".
* Mostrar Spinner.
* Evitar múltiples envíos.

---

# Seguridad

Nunca registrar tokens en la consola.

Nunca registrar contraseñas.

No exponer información sensible.

Preparar la arquitectura para futuras integraciones de Refresh Token.

---

# Restricciones

No modificar:

* Diseño del Login.
* Componentes reutilizables.
* Dashboard.
* Sign Up.
* Transferencias.
* Perfil.

Modificar únicamente la lógica necesaria para integrar el Login con el Backend.

---

# Criterios de aceptación

✓ El Login consume correctamente la API.

✓ Se utiliza la URL definida en las variables de entorno.

✓ No existen URLs hardcodeadas.

✓ Se almacenan correctamente los tokens.

✓ Se almacena la información básica del usuario.

✓ Se muestran correctamente los errores del servidor.

✓ Se mantiene el diseño existente.

✓ Se respeta la arquitectura del proyecto.

✓ No existen errores de TypeScript.

✓ No existen errores de ESLint.

---

# Definition of Done

La tarea estará terminada únicamente cuando:

* El Login funcione contra el Backend real.
* Los tokens se almacenen correctamente.
* La navegación funcione correctamente.
* No existan llamadas Mock.
* Toda la integración siga la arquitectura del proyecto.
* No existan errores de compilación.

---

# Entregables

Al finalizar proporcionar:

* Resumen de la integración realizada.
* Archivos creados.
* Archivos modificados.
* Variables de entorno agregadas.
* Servicios creados.
* Flujo de autenticación implementado.
* Confirmación del cumplimiento de todos los criterios de aceptación.
