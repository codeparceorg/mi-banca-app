# Task 001 - Registro de Usuario (Sign Up)

## Objetivo

Implementar el módulo de registro de nuevos usuarios para la aplicación bancaria.

El usuario deberá poder crear una nueva cuenta proporcionando su información básica y credenciales de acceso.

---

# Historia de Usuario

Como nuevo cliente

Quiero crear una cuenta

Para poder acceder a los servicios de la aplicación bancaria.

---

# Alcance

Esta tarea incluye:

- Pantalla de registro
- Validaciones del formulario
- Consumo del endpoint de registro
- Manejo de errores
- Redirección al Login después del registro exitoso

No incluye:

- Verificación por correo electrónico
- Verificación por SMS
- Doble factor (2FA)
- Carga de documentos
- Aprobación manual de la cuenta

---

# Diseño

La pantalla debe contener:

- Logo del banco
- Título "Crear cuenta"
- Campo Nombre completo
- Campo Correo electrónico
- Campo Contraseña
- Campo Confirmar contraseña
- Checkbox de aceptación de términos y condiciones
- Botón "Crear cuenta"
- Link "¿Ya tienes una cuenta? Iniciar sesión"

La interfaz debe seguir el Design System definido en el proyecto.

---

# Componentes

Debe reutilizar:

- Button
- Input
- Card
- Checkbox
- Alert
- Spinner

No crear componentes nuevos si ya existen equivalentes.

---

# Validaciones

## Nombre completo

- Obligatorio
- Mínimo 3 caracteres
- Máximo 100 caracteres

## Correo electrónico

- Obligatorio
- Debe tener formato válido

## Contraseña

- Obligatoria
- Mínimo 8 caracteres
- Al menos una letra mayúscula
- Al menos una letra minúscula
- Al menos un número

## Confirmar contraseña

- Obligatorio
- Debe coincidir con la contraseña

## Términos y condiciones

- Obligatorio aceptar antes de enviar el formulario

No permitir enviar el formulario mientras existan errores de validación.

---

# API

## Endpoint

POST /auth/signup

### Request

```json
{
  "fullName": "Juan Pérez",
  "email": "juan@email.com",
  "password": "Password123"
}
```

### Response 201

```json
{
  "message": "Usuario registrado correctamente."
}
```

---

# Manejo de errores

## 400

Mostrar el mensaje devuelto por la API.

Ejemplo:

"El correo ya se encuentra registrado."

---

## 500

Mostrar:

"Ha ocurrido un error inesperado."

---

## Timeout

Mostrar:

"No fue posible conectar con el servidor."

---

# Navegación

Registro exitoso

→ Redirigir automáticamente al Login.

Cancelar

→ Regresar al Login.

---

# Estados

Loading

- Deshabilitar botón
- Mostrar Spinner

Error

- Mostrar Alert

Success

- Mostrar mensaje de éxito
- Redirigir al Login

---

# Accesibilidad

Todos los campos deben tener:

- Label
- Placeholder
- aria-label

Debe ser completamente navegable mediante teclado.

Todos los mensajes de error deben ser accesibles para lectores de pantalla.

---

# Responsive

Debe funcionar correctamente en:

- Desktop
- Tablet
- Mobile

---

# Seguridad

Nunca almacenar la contraseña en el navegador.

No registrar contraseñas en la consola.

No mostrar información sensible en mensajes de error.

---

# Criterios de aceptación

- El usuario puede crear una cuenta.
- Todas las validaciones funcionan correctamente.
- No es posible registrar correos duplicados.
- La contraseña debe cumplir las reglas establecidas.
- La confirmación de contraseña debe coincidir.
- El checkbox de términos es obligatorio.
- Se consume correctamente el endpoint.
- Se muestran los errores del servidor.
- Se redirige al Login después del registro exitoso.
- La pantalla es responsive.
- Cumple el Design System.
- No presenta errores de TypeScript.
- No presenta errores de ESLint.

---

# Fuera del alcance

No implementar:

- Inicio de sesión automático después del registro
- Recuperación de contraseña
- Confirmación por correo
- Verificación de identidad
- MFA
- Integración con Google o Apple

---

# Definition of Done

La tarea estará terminada únicamente cuando:

- Compila correctamente.
- No existen errores de TypeScript.
- No existen errores de ESLint.
- Sigue la arquitectura del proyecto.
- Reutiliza componentes existentes.
- Tiene pruebas unitarias.
- Tiene pruebas de integración.
- Cumple todos los criterios de aceptación.