# Task 004 - Fix Dashboard

## Objetivo

Reimplementar completamente el Dashboard para que cumpla con la arquitectura, el Design System y las especificaciones funcionales del proyecto.

La implementación actual **no debe utilizarse como referencia de diseño ni de estructura**. Solo puede reutilizar componentes compartidos que ya existan en el proyecto.

---

# Contexto

Durante la revisión se identificó que el Dashboard actual no cumple con las especificaciones definidas en el proyecto.

Se tomo la desision de eliminar la carpeta dashboard de pages para la nueva implementacion 

El objetivo de esta tarea es realizar la implementación alineada con toda la documentación del proyecto.

---

# Antes de implementar

Lee obligatoriamente los siguientes documentos:

1. AGENTS.md
2. specs/vision.md
3. specs/functional.md
4. specs/design-system.md
5. specs/architecture.md
6. specs/components.md
7. specs/routing.md
8. specs/implementation-rules.md

No comiences a escribir código hasta haber revisado toda la documentación.

---

# Implementación requerida

Eliminar la implementación visual actual del Dashboard.

Construir nuevamente toda la pantalla respetando:

* La arquitectura del proyecto.
* El Design System.
* La estructura de carpetas.
* Los componentes reutilizables.
* Las reglas de desarrollo.

No copiar el diseño existente.

No adaptar el Dashboard actual.

Construir una nueva implementación siguiendo únicamente la documentación del proyecto.

---

# Componentes permitidos

Reutilizar únicamente componentes compartidos como:

* Button
* Card
* Table
* Badge
* Avatar
* Input
* Modal
* Spinner

Si falta algún componente necesario, crearlo siguiendo el Design System.

---

# Estructura esperada

La pantalla debe dividirse claramente en:

* Header
* Sidebar
* Área principal
* Tarjetas de resumen
* Movimientos recientes
* Acciones rápidas
* Gráficos
* Estado vacío
* Estado de carga
* Estado de error

Cada sección debe implementarse mediante componentes independientes.

No crear un único componente con toda la lógica.

---

# Arquitectura

Cada responsabilidad debe estar separada.

Ejemplo:

pages/
dashboard/

components/
DashboardHeader
BalanceCard
QuickActions
RecentTransactions
ExpenseChart

hooks/

services/

types/

No colocar toda la lógica en un solo archivo.

---

# Diseño

Debe seguir exactamente el Design System.

Respetar:

* Colores
* Espaciados
* Tipografía
* Bordes
* Sombras
* Iconografía
* Responsive

No utilizar estilos inline.

No crear estilos fuera del sistema establecido.

---

# Código

Eliminar código duplicado.

Eliminar componentes innecesarios.

Eliminar estilos sin uso.

Eliminar lógica muerta.

Extraer componentes cuando sea necesario.

Mantener archivos pequeños y con una única responsabilidad.

---

# Restricciones

No modificar:

* Login
* Sign Up
* Transferencias
* Perfil
* Servicios compartidos
* API
* Rutas existentes

Esta tarea únicamente puede modificar el Dashboard y los componentes nuevos que sean necesarios para su correcta implementación.

---

# Calidad

Antes de finalizar verificar:

* Sin errores de TypeScript.
* Sin errores de ESLint.
* Sin código duplicado.
* Componentes reutilizables.
* Responsive.
* Accesible.
* Compatible con el Design System.

---

# Criterios de aceptación

✓ El Dashboard fue reconstruido completamente.

✓ No depende del diseño anterior.

✓ Sigue la arquitectura del proyecto.

✓ Utiliza componentes reutilizables.

✓ Mantiene separación de responsabilidades.

✓ Es responsive.

✓ Cumple el Design System.

✓ Todos los datos provienen de la API correspondiente.

✓ No existen errores de compilación.

✓ No existen advertencias de ESLint.

---

# Entregables

Al finalizar, proporcionar:

* Resumen de los cambios realizados.
* Lista de archivos creados.
* Lista de archivos modificados.
* Justificación de las decisiones de arquitectura.
* Componentes reutilizados.
* Componentes nuevos creados.
* Verificación del cumplimiento de los criterios de aceptación.
