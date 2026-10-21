# Erick Hernández · Portafolio personal

Portafolio estático con una estética oscura, cuadrícula roja, navegación flotante y panel de código. Desarrollado con HTML, CSS y JavaScript, sin dependencias externas.

## Ejecutar

Abrí `index.html` en un navegador, o usá Live Server en Visual Studio Code.

## Personalizar proyectos

Editá `projects.js`. Cada objeto genera una tarjeta y admite:

- `title`, `description`, `status`: textos con versiones `es` y `en`.
- `technologies`: lista de tecnologías reales del proyecto.
- `repo`, `demo`: enlaces HTTPS o `null`. Los botones sin enlace no aparecen.
- `image`: captura local, por ejemplo `assets/proyecto.png`, o `null`.
- `placeholder`: `true` para un espacio reservado.

La primera tarjeta está pendiente de completar con el proyecto terminado del autor. La segunda es un espacio para proyectos futuros. No representan proyectos verificados.

Para agregar una captura, guardala dentro de `assets/` y actualizá `image`. Para agregar proyectos, copiá un objeto dentro de la lista.

## Archivos

| Archivo | Función |
| --- | --- |
| `index.html` | Contenido y secciones |
| `styles.css` | Estilos y adaptación móvil |
| `projects.js` | Datos de proyectos |
| `languajes.js` | Traducciones de la interfaz |
| `effects.js` | Menú, idioma y tarjetas |

Los contenidos ahora están en una sola página. `competencias.html` se conserva como un acceso a la sección «Sobre mí».

## Autor

Erick Francis Hernández Angel · Formación en Desarrollo de Software, ITCA-FEPADE.

[GitHub](https://github.com/ErickFrancis-22)
