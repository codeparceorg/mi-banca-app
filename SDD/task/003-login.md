# Task 000 - Login

## Objetivo

Implementar el módulo de autenticación para la aplicación bancaria.

El login será la pantalla inicial de la aplicación y permitirá autenticar al usuario antes de acceder al Dashboard.

---

# Historia de Usuario

Como cliente del banco

Quiero iniciar sesión con mi correo y contraseña

Para acceder de forma segura a mi información bancaria.

---

# Alcance

Esta tarea incluye únicamente:

- Pantalla de Login
- Validaciones del formulario
- Consumo del endpoint de autenticación
- Manejo de errores
- Persistencia del token
- Redirección al Dashboard

No incluye:

- Registro de usuarios
- Recuperación de contraseña
- Doble factor (2FA)
- Login biométrico
- Login con Google
- Login con Apple

---

# Diseño

La pantalla debe contener:

Logo del banco

Título

"Iniciar sesión"

Campo Email

Campo Contraseña

Botón

"Ingresar"

Link

"¿Olvidaste tu contraseña?"

(No debe tener funcionalidad todavía.)

---

# Componentes

Debe reutilizar:

Button

Input

Card

Alert

Spinner

No crear nuevos componentes si ya existen equivalentes.

---

# Validaciones

Email

- Obligatorio
- Formato válido

Contraseña

- Obligatoria
- Mínimo 8 caracteres

No permitir enviar el formulario si existen errores.

---

# API

POST /auth/login

Request

{
  "email": "cliente@correo.com",
  "password": "Password123"
}

Response 200

{
  "accessToken": "...",
  "refreshToken": "...",
  "user": {
      "id": 1,
      "name": "Juan Pérez"
  }
}

---

# Manejo de errores

401

Mostrar

"Correo o contraseña incorrectos."

500

Mostrar

"Ha ocurrido un error inesperado."

Timeout

Mostrar

"No fue posible conectar con el servidor."

---

# Persistencia

Guardar:

accessToken

refreshToken

user

Usar la estrategia definida en la arquitectura del proyecto.

No almacenar información innecesaria.

---

# Navegación

Si el login es exitoso

Redirigir automáticamente a

/dashboard

Si ya existe una sesión válida

No mostrar el Login.

Redirigir al Dashboard.

---

# Estados

Loading

Deshabilitar botón

Mostrar Spinner

Error

Mostrar Alert

Success

Redireccionar

---

# Accesibilidad

Todos los campos deben tener:

- Label
- Placeholder
- aria-label

Debe poder utilizarse únicamente con teclado.

---

# Responsive

Desktop

Tablet

Mobile

La experiencia debe mantenerse consistente en todos los tamaños.

---

# Criterios de aceptación

✔ El usuario puede ingresar email y contraseña.

✔ Existen validaciones.

✔ No permite enviar datos inválidos.

✔ Consume el endpoint correctamente.

✔ Guarda el token.

✔ Redirecciona al Dashboard.

✔ Muestra errores del servidor.

✔ Es responsive.

✔ Cumple el Design System.

✔ No presenta errores de TypeScript.

✔ No presenta errores de ESLint.

---

# Fuera del alcance

No implementar:

- Registro
- Recuperación de contraseña
- MFA
- Recordar sesión
- Login social

---

# Definition of Done

La tarea estará terminada únicamente cuando:

- Compila correctamente.
- No existen errores de lint.
- Sigue la arquitectura del proyecto.
- Reutiliza componentes existentes.
- Tiene pruebas unitarias.
- Tiene pruebas de integración.
- Cumple todos los criterios de aceptación.