# Task 011 - Integración de Sign Up con API y Protección de Rutas

## Objetivo

Completar la integración del módulo de autenticación implementando:

* Integración del Sign Up con el Backend.
* Corrección del flujo inicial de navegación.
* Protección de rutas privadas.
* Redirecciones según el estado de autenticación del usuario.

El objetivo es que la aplicación utilice correctamente el servicio de autenticación y controle el acceso a las rutas privadas.

---

# Contexto

El Login ya consume el microservicio de autenticación.

Ahora el Sign Up también debe utilizar el Backend y la aplicación debe controlar correctamente las rutas públicas y privadas.

Actualmente existe un problema:

Al ingresar a:

```
http://localhost:5173/
```

la aplicación redirecciona automáticamente al Dashboard.

Este comportamiento es incorrecto.

---

# Antes de implementar

Leer obligatoriamente:

* AGENTS.md
* specs/vision.md
* specs/functional.md
* specs/architecture.md
* specs/routing.md
* specs/api/authentication.md
* Task 000 - Login
* Task 001 - Sign Up
* Task 010 - Login API Integration

No comenzar la implementación sin revisar toda la documentación.

---

# URL Base

Utilizar la URL configurada mediante variables de entorno.

Ejemplo:

```env
VITE_API_BASE_URL=http://microservicio.sis-main-ms.lab
```

No utilizar URLs hardcodeadas.

---

# Parte 1 - Integración del Sign Up

Eliminar completamente el Mock Data utilizado por el registro.

Consumir el endpoint:

```
POST /auth/signup
```

URL final

```
http://microservicio.sis-main-ms.lab/auth/signup
```

---

# Request

```json
{
  "email": "cliente@email.com",
  "password": "Password123"
}
```

---

# Response 201

```json
{
  "accessToken": "...",
  "refreshToken": "...",
  "user": {
    "id": "uuid",
    "name": "Juan"
  }
}
```

---

# Comportamiento esperado

Cuando el registro sea exitoso:

* Guardar accessToken.
* Guardar refreshToken.
* Guardar información básica del usuario.
* Considerar al usuario autenticado.
* Redireccionar automáticamente al Dashboard.

No solicitar un Login nuevamente.

---

# Manejo de errores

400

Mostrar el mensaje devuelto por la API.

Ejemplo:

```
El correo ya se encuentra registrado.
```

401

Mostrar un mensaje amigable.

500

Mostrar:

```
Ha ocurrido un error inesperado.
```

Timeout

Mostrar:

```
No fue posible conectar con el servidor.
```

---

# Parte 2 - Corregir la navegación inicial

Actualmente:

```
/
```

redirecciona directamente a:

```
/dashboard
```

Esto es incorrecto.

Debe modificarse el comportamiento.

---

# Comportamiento esperado

## Usuario NO autenticado

```
/
```

↓

Redireccionar a

```
/login
```

---

## Usuario autenticado

```
/
```

↓

Redireccionar a

```
/dashboard
```

---

# Parte 3 - Protección de rutas

Implementar protección para todas las rutas privadas.

Las siguientes rutas deben requerir autenticación:

```
/dashboard

/profile

/transfers
```

---

# Usuario NO autenticado

Si intenta acceder a cualquiera de esas rutas:

↓

Redireccionar automáticamente a:

```
/login
```

---

# Usuario autenticado

Debe poder acceder normalmente.

---

# Rutas públicas

Las siguientes rutas deben permanecer públicas:

```
/login

/signup
```

---

# Usuario autenticado intentando acceder a Login o Sign Up

Si ya existe una sesión válida y el usuario intenta ingresar a:

```
/login

/signup
```

Debe ser redireccionado automáticamente a:

```
/dashboard
```

---

# Validación de autenticación

La aplicación debe verificar la existencia de una sesión válida utilizando la estrategia definida por la arquitectura.

No duplicar lógica de autenticación.

Centralizar la validación en un único lugar.

---

# Arquitectura

No realizar validaciones de autenticación dentro de cada página.

Implementar un mecanismo reutilizable.

Ejemplos:

* Protected Route
* Auth Guard
* Route Guard
* Middleware de navegación

Debe seguir la arquitectura del proyecto.

---

# Persistencia

Utilizar la misma estrategia utilizada por el Login.

No duplicar almacenamiento.

---

# Restricciones

No modificar:

* Diseño del Login.
* Diseño del Sign Up.
* Dashboard.
* Transferencias.
* Perfil.

Modificar únicamente la lógica de autenticación y navegación.

---

# Seguridad

Nunca almacenar contraseñas.

Nunca registrar tokens en consola.

No exponer información sensible.

Preparar la arquitectura para futuras implementaciones de Refresh Token automático.

---

# Criterios de aceptación

## Sign Up

✓ Consume correctamente el Backend.

✓ Elimina completamente el Mock Data.

✓ Guarda correctamente los tokens.

✓ Guarda la información del usuario.

✓ Redirecciona automáticamente al Dashboard.

---

## Navegación

✓ "/" redirecciona a Login cuando no existe sesión.

✓ "/" redirecciona al Dashboard cuando existe sesión.

---

## Protección de rutas

✓ Dashboard requiere autenticación.

✓ Profile requiere autenticación.

✓ Transfers requiere autenticación.

✓ Un usuario no autenticado nunca puede acceder a rutas privadas.

✓ Un usuario autenticado no puede acceder nuevamente a Login o Sign Up.

---

## Calidad

✓ No existen URLs hardcodeadas.

✓ Se utiliza la variable de entorno.

✓ Se respeta la arquitectura.

✓ No existen errores de TypeScript.

✓ No existen errores de ESLint.

---

# Definition of Done

La tarea estará terminada únicamente cuando:

* El Sign Up funcione contra el Backend.
* Existan Route Guards para las rutas privadas.
* La navegación inicial funcione correctamente.
* Todas las redirecciones sean correctas.
* No existan llamadas Mock para autenticación.
* La arquitectura permanezca limpia y desacoplada.

---

# Entregables

Al finalizar proporcionar:

* Resumen de los cambios realizados.
* Archivos creados.
* Archivos modificados.
* Servicios implementados.
* Guards o componentes de protección creados.
* Variables de entorno utilizadas.
* Flujo completo de autenticación implementado.
* Verificación del cumplimiento de todos los criterios de aceptación.
