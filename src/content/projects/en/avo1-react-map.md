---
locale: en
published: true
title: React map experience integrated into WordPress
excerpt: React and TypeScript application with OpenLayers, custom tiles, and an optimized build designed to integrate into an existing WordPress site.
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

Frontend integration case study where a modern interactive experience had to coexist with an existing WordPress ecosystem.

The application lets users explore an interactive route map with filters and directions using React, TypeScript, and OpenLayers. Before building the micro frontend, I developed a script to capture all tiles from a specific area with Mapbox, enabling a customized cartographic base for the experience. The challenge was not only building the interface, but preparing the map’s visual data and packaging the application so it could be integrated as an isolated view inside WordPress while keeping dependencies, assets, styles, and performance under control.

## Key decisions

- Build the experience as an independent React application to encapsulate interactive logic.
- Create a preliminary Mapbox tile capture script to customize the map’s visual base for a defined area.
- Use TypeScript to define clear contracts between components, services, hooks, and map data.
- Integrate OpenLayers to handle maps, custom tiles, markers, and zoom levels.
- Configure Vite with separated chunks for React and OpenLayers to reduce loading and maintenance friction.
- Prepare the WordPress integration through dedicated templates and build-generated assets.

## Outcome achieved

The solution delivered a modern, maintainable map experience integrated as an isolated view in WordPress without turning the whole site into a SPA or compromising the existing architecture.
