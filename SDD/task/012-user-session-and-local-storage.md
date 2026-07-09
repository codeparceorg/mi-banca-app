# Task 012 - Implementar Gestión de Sesión del Usuario utilizando Local Storage

## Objetivo

Implementar un mecanismo centralizado para obtener la información del usuario autenticado desde el **Local Storage**, evitando realizar consultas innecesarias al microservicio de usuarios durante la carga inicial de la aplicación.

La aplicación debe utilizar la información almacenada en la clave:

```text
user
```

como fuente principal para mostrar los datos del usuario autenticado.

---

# Contexto

Después de un Login o Sign Up exitoso, la aplicación almacena la información básica del usuario.

Actualmente algunos componentes intentan obtener nuevamente esta información desde el Backend.

Este comportamiento debe eliminarse.

La aplicación debe utilizar primero la información almacenada localmente.

---

# Antes de implementar

Leer obligatoriamente:

* AGENTS.md
* specs/vision.md
* specs/architecture.md
* specs/components.md
* specs/implementation-rules.md
* Task 010 - Login API Integration
* Task 011 - Auth Integration
* Task 012 - Signup Wizard

---

# Fuente de información

La información del usuario deberá obtenerse desde:

```text
localStorage["user"]
```

Ejemplo:

```json
{
  "id": "9f2c0ef3-6af5-4fd2-97f6-18c73e0d2d5d",
  "name": "Juan Pérez",
  "email": "juan@email.com",
  "full_name": "Juan Pérez",
  "avatar_url": "",
  "client_number": "0000001234"
}
```

No realizar peticiones HTTP para obtener esta información durante la carga inicial.

---

# Componentes que deben utilizar esta información

Actualizar todos los componentes que muestran información del usuario autenticado.

Ejemplos:

* Header
* Sidebar
* Menú de usuario
* Avatar
* Información del perfil
* Dashboard (bienvenida)
* Cualquier otro componente que muestre datos del usuario

Todos deben consumir una única fuente de datos.

---

# Arquitectura

No acceder directamente al Local Storage desde los componentes.

Crear un servicio centralizado responsable de:

* Leer la información del usuario.
* Obtener la sesión actual.
* Actualizar la información almacenada.
* Eliminar la sesión durante el Logout.

Los componentes deberán consumir únicamente este servicio o el mecanismo de estado definido por la arquitectura del proyecto.

---

# Estado global

Si la aplicación utiliza un gestor de estado (Context API, Zustand, Redux, etc.), inicializar dicho estado utilizando la información almacenada en Local Storage.

Evitar múltiples lecturas del Local Storage desde distintos componentes.

---

# Sincronización

Después de un Login exitoso:

* Guardar el objeto `user`.
* Actualizar el estado global.

Después de un Sign Up exitoso:

* Guardar el objeto `user`.
* Actualizar el estado global.

Después de un Logout:

* Eliminar:

  * accessToken
  * refreshToken
  * user
* Limpiar completamente el estado de autenticación.

---

# Futuras actualizaciones

La arquitectura debe permitir que, cuando el usuario actualice su perfil, la información almacenada en Local Storage también se actualice automáticamente.

No duplicar lógica.

---

# Restricciones

No realizar llamadas HTTP para obtener información del usuario al iniciar la aplicación.

Solo consultar el Backend cuando sea estrictamente necesario (por ejemplo, al actualizar el perfil o al refrescar explícitamente la información).

---

# Rendimiento

Reducir el número de peticiones al Backend.

La carga inicial de la aplicación debe utilizar exclusivamente la información disponible en la sesión local.

---

# Seguridad

Nunca almacenar:

* Contraseñas.
* Información sensible.
* Datos confidenciales innecesarios.

Únicamente almacenar la información requerida para la experiencia de usuario.

---

# Restricciones

No modificar:

* Diseño de la aplicación.
* Navegación.
* Flujo de Login.
* Flujo de Sign Up.
* Dashboard.
* Transferencias.

Modificar únicamente la gestión de la sesión del usuario.

---

# Criterios de aceptación

✓ La aplicación obtiene la información del usuario desde Local Storage.

✓ No se realizan peticiones HTTP innecesarias para obtener los datos del usuario.

✓ Header muestra correctamente el nombre del usuario.

✓ Sidebar muestra correctamente el nombre y avatar.

✓ El Dashboard utiliza la información almacenada localmente.

✓ Todos los componentes utilizan una única fuente de datos.

✓ El Logout elimina completamente la sesión.

✓ El estado de autenticación permanece sincronizado.

✓ No existen errores de TypeScript.

✓ No existen errores de ESLint.

---

# Definition of Done

La tarea estará terminada únicamente cuando:

* Toda la información del usuario provenga del servicio de sesión.
* No existan accesos directos al Local Storage desde componentes de UI.
* La aplicación reduzca las llamadas innecesarias al Backend.
* La arquitectura permanezca desacoplada y reutilizable.

---

# Entregables

Al finalizar proporcionar:

* Resumen de los cambios realizados.
* Archivos creados.
* Archivos modificados.
* Servicio de sesión implementado.
* Componentes actualizados.
* Estrategia utilizada para sincronizar el estado del usuario.
* Confirmación del cumplimiento de todos los criterios de aceptación.
