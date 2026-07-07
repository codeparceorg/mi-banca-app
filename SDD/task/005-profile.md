# Task 003 - Perfil de Usuario

## Objetivo

Implementar el módulo **Perfil de Usuario**, permitiendo al usuario consultar y actualizar su información personal.

Durante esta fase del proyecto toda la información deberá utilizar **Mock Data**, siguiendo la arquitectura definida en el proyecto.

---

# Historia de Usuario

Como usuario autenticado

Quiero consultar y actualizar mi información personal

Para mantener mis datos actualizados dentro de la aplicación.

---

# Contexto

Esta funcionalidad forma parte del módulo principal de la aplicación bancaria.

Debe mantener la misma experiencia visual, arquitectura y componentes utilizados en el resto de la aplicación.

---

# Antes de implementar

Leer obligatoriamente:

* AGENTS.md
* specs/vision.md
* specs/functional.md
* specs/design-system.md
* specs/architecture.md
* specs/components.md
* specs/implementation-rules.md

No comenzar la implementación sin revisar la documentación anterior.

---

# Alcance

Esta tarea incluye:

* Visualización de información personal.
* Edición de datos permitidos.
* Cambio de foto de perfil (simulado).
* Validaciones del formulario.
* Persistencia mediante Mock Data.

No incluye:

* Cambio de contraseña.
* Doble factor de autenticación (2FA).
* Gestión de dispositivos.
* Preferencias de seguridad.
* Eliminación de cuenta.
* Verificación por correo.
* Integración con Backend.

---

# Diseño

La pantalla debe contener:

## Encabezado

* Título "Mi Perfil"
* Breve descripción

---

## Tarjeta de Perfil

Mostrar:

* Foto de perfil
* Nombre completo
* Correo electrónico
* Número de cliente (solo lectura)
* Fecha de creación de la cuenta (solo lectura)

---

## Información Personal

Campos editables:

* Nombre completo
* Teléfono
* Dirección
* Ciudad

Campos de solo lectura:

* Correo electrónico
* Número de cliente

---

## Acciones

Botón:

Guardar cambios

Botón:

Cancelar cambios

---

# Componentes

Reutilizar únicamente componentes existentes:

* Card
* Button
* Input
* Avatar
* Alert
* Spinner

Crear nuevos componentes únicamente si son realmente necesarios y respetando el Design System.

---

# Validaciones

## Nombre

* Obligatorio
* Entre 3 y 100 caracteres

## Teléfono

* Opcional
* Solo números
* Longitud entre 7 y 15 caracteres

## Dirección

* Obligatoria
* Máximo 150 caracteres

## Ciudad

* Obligatoria

No permitir guardar mientras existan errores de validación.

---

# Mock Data

No consumir APIs.

Crear un proveedor de datos simulados.

Información de ejemplo:

* id
* nombre
* correo
* teléfono
* dirección
* ciudad
* número de cliente
* fecha de creación
* avatar

Los datos simulados deben estar centralizados siguiendo la arquitectura del proyecto.

---

# Organización

Los datos simulados deben almacenarse en una carpeta destinada para Mock Data.

Ejemplo:

src/

mock/

profile/

profile.mock.ts

No colocar información simulada dentro de componentes.

---

# Estados

## Loading

Mostrar Spinner.

---

## Error

Mostrar Alert con mensaje amigable.

---

## Success

Mostrar confirmación indicando que los cambios fueron guardados correctamente.

---

# Navegación

El módulo debe estar disponible mediante:

/profile

No modificar otras rutas existentes.

---

# Responsive

Debe funcionar correctamente en:

* Desktop
* Tablet
* Mobile

La experiencia debe mantenerse consistente.

---

# Accesibilidad

Todos los campos deben tener:

* Label
* Placeholder
* aria-label

Toda la pantalla debe poder utilizarse únicamente mediante teclado.

---

# Restricciones

No modificar:

* Dashboard
* Login
* Sign Up
* Transferencias
* Layout
* Sidebar
* Header

No integrar Backend.

No crear llamadas HTTP.

No utilizar datos aleatorios.

---

# Calidad

Antes de finalizar verificar:

* Sin errores de TypeScript.
* Sin errores de ESLint.
* Sin código duplicado.
* Componentes reutilizables.
* Responsive.
* Accesibilidad.
* Cumplimiento del Design System.

---

# Criterios de aceptación

✓ El usuario puede visualizar su información.

✓ El usuario puede editar los campos permitidos.

✓ Existen validaciones.

✓ Toda la información proviene de Mock Data.

✓ No existen llamadas HTTP.

✓ Se mantiene la arquitectura del proyecto.

✓ Se reutilizan componentes existentes.

✓ El diseño cumple el Design System.

✓ Funciona correctamente en Desktop, Tablet y Mobile.

✓ No existen errores de compilación.

✓ No existen errores de ESLint.

---

# Fuera del alcance

No implementar:

* Cambio de contraseña.
* MFA.
* Seguridad.
* Preferencias.
* Backend.
* Notificaciones.
* Eliminación de cuenta.

---

# Definition of Done

La tarea estará terminada únicamente cuando:

* Compila correctamente.
* No existen errores de TypeScript.
* No existen errores de ESLint.
* Sigue la arquitectura definida.
* Reutiliza componentes existentes.
* Toda la información utiliza Mock Data.
* Es responsive.
* Es accesible.
* Cumple todos los criterios de aceptación.

---

# Entregables

Al finalizar proporcionar:

* Resumen de los cambios realizados.
* Archivos creados.
* Archivos modificados.
* Componentes reutilizados.
* Componentes nuevos creados.
* Ubicación del Mock Data.
* Verificación del cumplimiento de los criterios de aceptación.
