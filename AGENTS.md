# Guía para agentes de IA

Este sitio es una plantilla de Ixbal: HTML, CSS y JavaScript sin dependencias ni paso de compilación. Lo que ves en `index.html` es exactamente lo que se publica.

## Reglas

- **No agregues frameworks, bundlers ni dependencias de npm.** El entorno no ejecuta `npm install`.
- **Valida siempre** con `npm run check` después de cada cambio. Debe terminar en `✓`.
- **Colores, tipografía y espacios solo en `assets/css/tokens.css`.** Los títulos usan `--font-display` y el texto `--font-sans`. No escribas colores hexadecimales fuera de ese archivo; usa `var(--color-…)`.
- **Un archivo CSS por componente o sección.** Si creas uno nuevo, impórtalo en `assets/css/main.css` dentro de su capa (`components` o `sections`).
- **Clases con convención BEM:** `bloque__elemento--modificador` (por ejemplo `service-card__title`, `button--primary`).
- **JavaScript en módulos** dentro de `assets/js/modules/`, registrados en `assets/js/main.js`. Los módulos localizan elementos con atributos `data-*` y no fallan si no los encuentran.
- **Íconos** en el sprite `assets/img/icons.svg`; agrega un `<symbol id="…">` y úsalo con `<use href="assets/img/icons.svg#…">`.

## Datos que se repiten

Cuando cambies uno de estos datos, cámbialo en **todos** sus lugares:

| Dato | Dónde aparece |
|---|---|
| Nombre del club | `<title>`, `og:title`, `.brand__name`, `aria-label` del logo, JSON-LD, nombres de sucursal (`PULSO Roma Norte`…), mensajes de WhatsApp, `data-message` del formulario, pie de página, `alt` de imágenes y `og-image.svg` |
| WhatsApp | Todos los enlaces con `data-contact="whatsapp"` (formato `https://wa.me/52XXXXXXXXXX`). El formulario toma el número del primero |
| Teléfono | Enlaces con `data-contact="phone"` (formato `tel:+52XXXXXXXXXX`) y `telephone` del JSON-LD |
| Dirección | Sección `#visitanos`, `src` del mapa y `address` del JSON-LD |
| Horario de cada sucursal | Su tabla `[data-hours]` dentro de su panel `[data-hours-scope]` en `#sucursales` (atributos `data-days`, `data-open`, `data-close`) y `openingHoursSpecification` del JSON-LD |
| Color principal | `--color-primary` en `tokens.css`, `theme-color`, `logo.svg`, `favicon.svg`, `og-image.svg`, `placeholder.svg` |
| Color de acento | `--color-primary` en `tokens.css`, `logo.svg`, `favicon.svg`, `og-image.svg` y `placeholder.svg` |
| Disciplinas | Mosaico `#disciplinas`, cinta `.marquee` (los dos grupos), `<option>` del filtro del horario, `data-discipline` de las clases, `<option>` del formulario y `--level` de intensidad |
| Sucursales | Pestañas y paneles de `#sucursales`, `<option>` del filtro del horario, `data-branch` de las clases, `<option>` del formulario y `department` del JSON-LD |
| Precios | `data-monthly`, `data-yearly` y el texto visible de cada `.plan__price` y `.plan__note` |

`npm run check` detecta WhatsApp o teléfonos distintos entre sí, archivos que no existen, anclas rotas, imágenes sin `alt` y JSON-LD inválido.

## Espacios de imagen

Cada foto del sitio vive en un espacio declarado en `template.json` → `imageSlots`:

```html
<figure class="media media--square" data-slot="galeria-1" data-placeholder data-hint="Foto del local · 1:1">
  <img src="assets/img/placeholder.svg" alt="Descripción de la foto" width="1200" height="1200" loading="lazy">
</figure>
```

Para poner una foto real en un espacio:

1. Cambia el `src` del `<img>` por la ruta de la foto. Las fotos que se suben desde Ixbal llegan a `images/` (por ejemplo `images/fachada.jpg`); usa esa ruta tal cual, sin mover ni renombrar el archivo.
2. Escribe un `alt` que describa la foto real y actualiza `width` y `height` con sus medidas.
3. Borra `data-placeholder` y `data-hint` del `<figure>`. Así desaparece la etiqueta de relleno.
4. No cambies la clase `media--…` ni el `data-slot`: CSS recorta la foto a la proporción del espacio.

Las fotos de `images/` que trae la plantilla son de ejemplo (generadas con IA para PULSO): reemplázalas por las del negocio real siguiendo los mismos pasos, y borra del repositorio las de ejemplo que ya no se usen.

Si la persona sube varias fotos sin decir dónde van, asígnalas según la `label` de cada espacio en `imageSlots`. `npm run check` dice cuántos espacios siguen con imagen de relleno.

## Estructura

```
index.html                 Página única, dividida en secciones con comentarios ============
assets/css/main.css        Orden de capas e imports
assets/css/tokens.css      Identidad visual (edita aquí primero)
assets/css/base.css        Reset y elementos HTML
assets/css/layout.css      Contenedores, secciones, rejillas
assets/css/components/     Piezas reutilizables (botón, tarjeta, encabezado…)
assets/css/sections/       Estilos propios de cada sección de la página
assets/css/utilities.css   Clases de una sola responsabilidad
assets/js/main.js          Registra los módulos
assets/js/modules/         Comportamiento (menú, horarios por sucursal, año, horario de clases, precios, pestañas, cuenta regresiva, formulario)
assets/img/                Logo, íconos e imágenes de relleno
images/                    Fotos que sube la persona desde Ixbal (se crea al subir la primera)
template.json              Metadatos para la galería de plantillas de Ixbal
scripts/check.mjs          Validador sin dependencias
```

## Tareas comunes

- **Agregar una clase:** copia un `<li class="session">` dentro del `<section data-day-panel>` del día (0 = domingo … 6 = sábado), en orden de hora. `data-start` y `data-end` en formato 24 h; `data-discipline` y `data-branch` deben existir en los filtros.
- **Nueva disciplina:** agrega su tarjeta en `.disciplines` (con `data-slot` nuevo en `imageSlots`), su `<option>` en el filtro `data-schedule-filter="discipline"` y en el formulario, y su nombre en los dos grupos de la cinta `.marquee`.
- **Una sola sucursal:** deja un solo panel `[data-tab-panel]`, borra el bloque de pestañas `.branches__tabs` y el filtro de sucursal del horario.
- **Nueva sucursal:** copia un `<article class="branch">` con su `data-tab-panel`, agrega su botón `data-tab`, su `<option>` en el filtro del horario y en el formulario, y su `department` en el JSON-LD.
- **Cambiar precios:** en cada plan, actualiza el texto visible y los atributos `data-monthly` y `data-yearly` (precio y nota).
- **Evento con cuenta regresiva:** `data-countdown="last-saturday"` (último sábado del mes) o `"day-15"` (un día fijo), con `data-countdown-time="08:00"`.
- **Quitar una sección:** borra el `<section>` completo y su enlace en `.site-nav__list`.
- **Nueva sección:** crea el `<section class="section" id="…">`, su archivo en `assets/css/sections/`, impórtalo en `main.css` y agrega el enlace al menú.
- **Cambiar fotos:** sigue los pasos de "Espacios de imagen".
- **Nuevo espacio de imagen:** agrega el `<figure class="media" data-slot="…">` y su entrada en `imageSlots` de `template.json`.
