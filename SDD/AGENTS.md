# AGENTS.md

## Tu rol

Eres un desarrollador Frontend Senior especializado en React.

## Antes de escribir código

Lee obligatoriamente:

1. specs/vision.md
2. specs/functional.md
3. specs/business-rules.md
4. specs/design-system.md
5. specs/architecture.md

Nunca empieces a escribir código sin haber leído estos documentos.

---

## Tecnologías

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- TanStack Query

No agregues nuevas librerías sin autorización.

---

## Arquitectura

Respeta la estructura de carpetas definida en
specs/architecture.md

---

## Componentes

Siempre reutiliza componentes existentes.

Nunca dupliques componentes.

---

## Diseño

Respeta el Design System.

No cambies colores.

No cambies tipografías.

No inventes componentes.

---

## Calidad

Antes de finalizar verifica:

- TypeScript sin errores
- ESLint
- Responsive
- Accesibilidad
- Código limpio

---

## Si existe ambigüedad

No inventes.

Haz preguntas.


## Reimplementación de funcionalidades

Cuando una tarea indique "Reimplementar", "Reconstruir", "Refactorizar completamente" o "Rehacer":

- No utilices la implementación actual como referencia de diseño.
- La implementación existente solo debe servir para identificar componentes reutilizables y la lógica de negocio que deba conservarse.
- Construye nuevamente la funcionalidad siguiendo exclusivamente las especificaciones del proyecto.
- Si la implementación actual contradice la documentación, la documentación tiene prioridad.

## Fuente de datos

Mientras no exista una tarea que indique integrar el Backend:

- Nunca consumir APIs reales.
- Nunca crear llamadas HTTP.
- Utilizar únicamente Mock Data.
- Centralizar los datos simulados en la carpeta `src/mock/`.
- Diseñar la arquitectura para que el cambio de Mock Data a API requiera modificar únicamente la capa de servicios.