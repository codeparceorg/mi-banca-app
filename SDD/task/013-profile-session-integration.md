# Task 013 - Integrar la Pantalla de Perfil con la Información de la Sesión

## Objetivo

Actualizar la pantalla **Mi Perfil** para que muestre la información del usuario autenticado utilizando el servicio de sesión implementado en la aplicación.

La pantalla no debe realizar peticiones HTTP al cargar.

Toda la información debe obtenerse desde la sesión actual del usuario.

---

# Contexto

La aplicación ya cuenta con un mecanismo centralizado para almacenar la sesión del usuario.

Actualmente la pantalla de Perfil utiliza información simulada o datos estáticos.

A partir de esta tarea deberá utilizar la información almacenada durante el Login o el Sign Up.

---

# Antes de implementar

Leer obligatoriamente:

* AGENTS.md
* specs/vision.md
* specs/architecture.md
* specs/components.md
* specs/implementation-rules.md
* Task 012 - User Session and Local Storage

No comenzar la implementación sin revisar la documentación anterior.

---

# Fuente de datos

La pantalla deberá obtener la información únicamente desde el servicio de sesión.

No acceder directamente al Local Storage.

No realizar llamadas HTTP.

---

# Información a mostrar

La pantalla debe visualizar correctamente la información disponible del usuario autenticado.

Como mínimo:

* Avatar
* Nombre completo
* Correo electrónico
* Número de cliente
* Teléfono
* Dirección
* Ciudad

Si algún dato no existe, mostrar un valor por defecto amigable sin producir errores en la interfaz.

---

# Avatar

Mostrar el avatar del usuario.

Si no existe un avatar configurado:

Mostrar un avatar por defecto definido por el Design System.

No mostrar imágenes rotas.

---

# Información de solo lectura

Los siguientes campos deberán mostrarse como solo lectura:

* Correo electrónico
* Número de cliente

---

# Información editable

Mantener preparados los siguientes campos para futuras actualizaciones:

* Nombre completo
* Teléfono
* Dirección
* Ciudad

En esta tarea no se implementará el guardado mediante API.

Solo mostrar la información correctamente.

---

# Arquitectura

La pantalla Profile no debe conocer cómo se obtiene la sesión.

Debe consumir únicamente el servicio o estado global definido por la arquitectura del proyecto.

No duplicar lógica.

No acceder al Local Storage desde componentes de UI.

---

# Estado

Mientras la información de la sesión se inicializa:

Mostrar el estado de carga definido por el proyecto.

No mostrar información incompleta.

---

# Navegación

Si no existe una sesión válida:

Redireccionar automáticamente al Login utilizando el mecanismo de protección de rutas existente.

---

# Restricciones

No modificar:

* Login
* Sign Up
* Dashboard
* Transferencias
* Servicios HTTP
* Flujo de autenticación

Modificar únicamente la integración de la pantalla de Perfil con la sesión del usuario.

---

# Rendimiento

No realizar peticiones HTTP durante la carga inicial del Perfil.

La información debe cargarse desde la sesión ya disponible en memoria o desde el mecanismo centralizado de autenticación.

---

# Seguridad

Nunca mostrar:

* Access Token
* Refresh Token
* Información sensible
* Datos internos del sistema

Solo mostrar información de perfil del usuario.

---

# Criterios de aceptación

✓ La pantalla Profile utiliza la información de la sesión.

✓ No existen llamadas HTTP al cargar la pantalla.

✓ Se muestran correctamente:

* Nombre
* Correo
* Avatar
* Número de cliente
* Teléfono
* Dirección
* Ciudad

✓ El avatar por defecto se muestra cuando no existe uno configurado.

✓ Los componentes no acceden directamente al Local Storage.

✓ Se respeta la arquitectura del proyecto.

✓ No existen errores de TypeScript.

✓ No existen errores de ESLint.

---

# Definition of Done

La tarea estará terminada únicamente cuando:

* Toda la información mostrada provenga del servicio de sesión.
* No existan datos simulados en la pantalla de Perfil.
* No existan llamadas HTTP innecesarias.
* La pantalla sea consistente con el resto de la aplicación.
* Se respeten todas las reglas de arquitectura.

---

# Entregables

Al finalizar proporcionar:

* Resumen de los cambios realizados.
* Archivos modificados.
* Componentes actualizados.
* Fuente de datos utilizada para el Perfil.
* Confirmación de que no se realizan llamadas HTTP al cargar la pantalla.
* Verificación del cumplimiento de todos los criterios de aceptación.
