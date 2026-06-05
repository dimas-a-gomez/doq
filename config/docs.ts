import { Rocket, Box, Braces, Aperture } from "lucide-react";

export function getDocsConfig() {
  return [
    {
      title: 'Comenzando',
      icon: Rocket,
      items: [
        { title: 'Introducción', href: '/docs', description: 'Conoce los fundamentos de DOQMEN' },
        { title: 'Instalación', href: '/docs/installation', badge: 'Nuevo', badgeVariant: 'success', description: 'Aprende a instalar DOQMEN' },
        { title: 'Metadatos', href: '/docs/frontmatter', description: 'Configura las opciones de página' },
        { title: 'Registro de cambios', href: '/docs/changelog', description: 'Revisa las actualizaciones recientes' },
        { title: 'Explorador visual', href: '/docs/explorador-visual', description: 'Visualiza un recorrido del sitio' }
      ]
    },
    {
      title: 'Componentes',
      icon: Box,
      items: [
        { title: 'Botón', href: '/docs/components/button', description: 'Componente UI para botones' },
        { title: 'Menú Lateral', href: '/docs/components/sidebar', description: 'Descubre cómo funciona el Sidebar' },
      ]
    },
    {
      title: 'Shortcodes',
      icon: Braces,
      items: [
        { title: 'Avisos', href: '/docs/shortcodes/avisos', description: 'Bloques para destacar información' },
        { title: 'Badges', href: '/docs/shortcodes/badges', description: 'Etiquetas dinámicas y pequeñas' },
        { title: 'Botones', href: '/docs/shortcodes/botones', description: 'Botones interactivos en Markdown' },
        { title: 'Código', href: '/docs/shortcodes/codigo', description: 'Integrando extractos de código' },
        { title: 'Columnas', href: '/docs/shortcodes/columnas', description: 'Para dividir en cuadrículas' },
        { title: 'Enlace de página', href: '/docs/shortcodes/enlace-de-pagina', description: 'Tarjetas para enrutar usuarios' },
        { title: 'Tablas', href: '/docs/shortcodes/tablas', description: 'Presentar datos estructurados' },
      ]
    }
  ];
}
