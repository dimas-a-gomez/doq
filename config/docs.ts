import { Rocket, Box, Braces, Aperture } from "lucide-react";

export function getDocsConfig() {
  return [
    {
      title: 'Comenzando',
      icon: Rocket,
      items: [
        { title: 'Introducción', href: '/docs' },
        { title: 'Instalación', href: '/docs/installation', badge: 'Nuevo', badgeVariant: 'success' },
        { title: 'Registro de cambios', href: '/docs/changelog' },
        { title: 'Explorador visual', href: '/docs/explorador-visual' }
      ]
    },
    {
      title: 'Componentes',
      icon: Box,
      items: [
        { title: 'Botón', href: '/docs/components/button' },
      ]
    },
    {
      title: 'Otro',
      icon: Aperture,
      items: [
        { title: 'Other', href: '/docs/otro/other' },
      ]
    },
    {
      title: 'Shortcodes',
      icon: Braces,
      items: [
        { title: 'Avisos', href: '/docs/shortcodes/avisos' },
        { title: 'Badges', href: '/docs/shortcodes/badges' },
        { title: 'Botones', href: '/docs/shortcodes/botones' },
        { title: 'Código', href: '/docs/shortcodes/codigo' },
        { title: 'Columnas', href: '/docs/shortcodes/columnas' },
        { title: 'Enlace de página', href: '/docs/shortcodes/enlace-de-pagina' },
        { title: 'Tablas', href: '/docs/shortcodes/tablas' },
      ]
    }
  ];
}
