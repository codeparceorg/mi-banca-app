# Task 015 - Estabilización del flujo de Sign Up e Integración con Auth y Users

## Objetivo

Revisar, corregir y estabilizar completamente el flujo de registro de usuarios.

El objetivo es garantizar que la implementación del Frontend sea completamente compatible con los contratos OpenAPI del microservicio de Autenticación y del microservicio de Usuarios.

No se deben realizar cambios funcionales adicionales.

Esta tarea tiene como finalidad corregir inconsistencias de implementación.

---

# Contexto

Durante la implementación del flujo de registro se identificaron múltiples inconsistencias entre el Frontend y los contratos oficiales de los microservicios.

Antes de continuar con nuevas funcionalidades es necesario estabilizar completamente este flujo.

---

# Documentación obligatoria

Antes de modificar cualquier archivo revisar obligatoriamente:

* AGENTS.md
* specs/vision.md
* specs/architecture.md
* specs/components.md
* specs/implementation-rules.md

Revisar además los siguientes contratos:

* Contrato OpenAPI del Auth Service en la carpeta 05-api
* Contrato OpenAPI del Users Service

La implementación debe ajustarse estrictamente a dichos contratos.

No asumir campos que no existan.

No modificar los contratos.

---

# Alcance

Esta tarea debe revisar completamente:

* Wizard de registro.
* Flujo entre ambos pasos.
* Integración con Auth Service.
* Integración con Users Service.
* Validaciones.
* Persistencia temporal.
* Navegación.
* Manejo de errores.

---

# Paso 1 - Auth Service

Verificar que la implementación utilice correctamente:

```http
POST /auth/signup
```

Validar:

* URL
* Método HTTP
* Headers
* Body
* Manejo de errores
* Response

Confirmar que la información obtenida sea utilizada correctamente en el segundo paso.

---

# Paso 2 - Users Service

Verificar que la implementación utilice correctamente:

```http
POST /users/save
```

Validar:

* URL
* Método HTTP
* Headers
* Body
* Response
* Errores

Confirmar que únicamente se envíen los campos definidos en el contrato OpenAPI.

---

# Validación del contrato

Comparar la implementación contra ambos contratos.

Corregir cualquier diferencia encontrada.

Ejemplos:

* Campos adicionales.
* Campos faltantes.
* Tipos incorrectos.
* Nombres incorrectos.
* URLs incorrectas.
* Métodos HTTP incorrectos.
* Headers incorrectos.

---

# Persistencia temporal

Verificar que durante el Wizard únicamente se almacene la información necesaria.

Confirmar que los datos utilizados por el segundo paso provengan del resultado del primer paso.

No solicitar nuevamente información ya disponible.

---

# Navegación

Validar completamente el flujo:

Sign Up

↓

Paso 1

↓

Paso 2

↓

Dashboard

Corregir cualquier navegación incorrecta.

---

# Manejo de errores

Validar correctamente las respuestas:

## Auth Service

* 400
* 401
* 500

## Users Service

* 400
* 409
* 500

Mostrar mensajes amigables al usuario.

No exponer errores internos.

---

# UI

No modificar:

* Diseño
* Componentes
* Layout
* Responsive
* Design System

Esta tarea únicamente debe corregir problemas de integración.

---

# Arquitectura

Mantener la arquitectura existente.

No realizar llamadas HTTP desde componentes.

No duplicar lógica.

No crear servicios redundantes.

Toda la comunicación con los microservicios debe permanecer centralizada.

---

# Seguridad

Nunca registrar:

* Contraseñas.
* Tokens.
* Información sensible.

No almacenar datos innecesarios.

---

# Restricciones

No implementar nuevas funcionalidades.

No modificar:

* Login.
* Dashboard.
* Transferencias.
* Profile.

No cambiar el comportamiento visual del registro.

Esta tarea únicamente debe estabilizar el flujo existente.

---

# Validaciones finales

Antes de finalizar verificar:

* Todos los formularios.
* Todas las validaciones.
* Todos los servicios.
* Todas las rutas.
* Todas las respuestas HTTP.
* Todas las redirecciones.

No dejar comportamientos inconsistentes.

---

# Criterios de aceptación

✓ El Wizard funciona de principio a fin.

✓ La integración con Auth Service cumple el contrato OpenAPI.

✓ La integración con Users Service cumple el contrato OpenAPI.

✓ No existen diferencias entre la implementación y los contratos.

✓ No existen errores de navegación.

✓ No existen errores de validación.

✓ No existen errores de TypeScript.

✓ No existen errores de ESLint.

✓ No existen errores de compilación.

---

# Definition of Done

La tarea estará terminada únicamente cuando:

* El flujo completo de registro funcione correctamente.
* La implementación sea consistente con ambos contratos OpenAPI.
* No existan inconsistencias entre el Frontend y los microservicios.
* Todos los criterios de aceptación hayan sido verificados.

---

# Entregables

Al finalizar proporcionar:

* Resumen de los problemas encontrados.
* Lista de inconsistencias corregidas.
* Archivos modificados.
* Confirmación de compatibilidad con el contrato del Auth Service.
* Confirmación de compatibilidad con el contrato del Users Service.
* Evidencia de que el flujo completo fue validado.
