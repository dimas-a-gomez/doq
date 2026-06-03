import { Rocket, Box } from "lucide-react";

export function getDocsConfig() {
  return [
    {
      title: 'Comenzando',
      icon: Rocket,
      items: [
        { title: 'Introducción', href: '/docs' },
        { title: 'Instalación', href: '/docs/installation' }
      ]
    },
    {
      title: 'Componentes',
      icon: Box,
      items: [
        { title: 'Botón', href: '/docs/components/button' },
      ]
    }
  ];
}
