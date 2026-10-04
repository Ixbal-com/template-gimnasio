# Plantilla Ixbal · Club deportivo

Plantilla para gimnasios y clubes con varias disciplinas, clases grupales y sucursales. Estilo **oscuro y enérgico**: casi negro con verde lima neón y títulos en mayúsculas condensadas (Anton).

**Incluye:** hero a todo lo ancho con cinta animada de disciplinas, mosaico de disciplinas con nivel de intensidad, sección Hyrox con las 8 estaciones y cuenta regresiva al simulacro mensual, **horario semanal con pestañas por día, filtros y la clase en vivo marcada**, instalaciones, membresías con interruptor mensual / anual, coaches, **sucursales con su propio horario y mapa**, y pase de un día gratis por WhatsApp.

## Uso

```bash
npm run dev     # servidor local en http://localhost:4321
npm run check   # valida el sitio (sin dependencias)
```

Ábrela con un servidor, no con doble clic: los navegadores no ejecutan módulos de JavaScript desde `file://`.

## Personalizar

1. **Identidad:** colores y tipografía en `assets/css/tokens.css`.
2. **Contenido:** textos, clases, precios y sucursales en `index.html`, organizado por secciones.
3. **Imágenes:** 17 espacios de imagen listados en `imageSlots` de `template.json`, con fotos de ejemplo en `images/` generadas con IA (`gpt-image-2.5-sunburst`). Reemplázalas por fotos reales; ver [AGENTS.md](AGENTS.md#espacios-de-imagen).

Las reglas de arquitectura y la lista de datos que se repiten están en [AGENTS.md](AGENTS.md).

## Publicar

Es un sitio estático: sirve la raíz del repositorio en GitHub Pages, Netlify, Vercel o AWS Amplify.

> Antes de publicar, convierte `assets/img/og-image.svg` a PNG de 1200 × 630 y usa una URL absoluta en `og:image`: WhatsApp y Facebook no muestran vistas previas en SVG.
