---
locale: es
published: true
title: Experiencia cartográfica React integrada en WordPress
excerpt: Aplicación React y TypeScript con OpenLayers, tiles personalizados y build optimizado para integrarse dentro de un sitio WordPress existente.
stack:
  - React
  - TypeScript
  - Vite
  - OpenLayers
  - Mapbox
  - Tailwind CSS
featured: true
order: 4
---

Caso de integración frontend donde una experiencia interactiva moderna debía convivir con un ecosistema WordPress existente.

La aplicación permite explorar un mapa interactivo de rutas, filtros y direcciones usando React, TypeScript y OpenLayers. Antes de construir el micro frontend, desarrollé un script para capturar todos los tiles de una zona específica con Mapbox, permitiendo generar una base cartográfica personalizada para la experiencia. El desafío no era solo construir la interfaz, sino preparar los datos visuales del mapa y empaquetar la aplicación para integrarla como una vista aislada dentro de WordPress, cuidando dependencias, assets, estilos y rendimiento.

## Decisiones principales

- Construir la experiencia como una aplicación React independiente para encapsular la lógica interactiva.
- Crear un script previo de captura de tiles con Mapbox para personalizar la base visual del mapa según una zona definida.
- Usar TypeScript para definir contratos claros entre componentes, servicios, hooks y datos del mapa.
- Integrar OpenLayers para manejar mapas, tiles personalizados, marcadores y niveles de zoom.
- Configurar Vite con separación de chunks para React y OpenLayers, reduciendo fricción en carga y mantenimiento.
- Preparar la integración en WordPress mediante templates específicos y assets generados por el build.

## Resultado obtenido

La solución dejó disponible una experiencia de mapa moderna y mantenible, integrada como una vista aislada en WordPress sin convertir todo el sitio en una SPA ni comprometer la arquitectura existente.
