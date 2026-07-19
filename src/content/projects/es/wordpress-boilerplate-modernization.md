---
locale: es
published: true
title: Modernización de arquitectura WordPress para agencia
excerpt: Evolución de una base WordPress tradicional hacia un stack moderno con Vite, Docker, Tailwind CSS y mu-plugins compartidos.
stack:
  - WordPress Bedrock
  - Vite
  - Docker
  - Tailwind CSS
  - PHP
featured: true
order: 1
---

Caso de modernización técnica aplicado a una base WordPress usada como punto de partida para proyectos de agencia.

La base inicial resolvía el desarrollo con un enfoque más tradicional, apoyado en empaquetado con Webpack y estilos SCSS. La evolución llevó esa estructura hacia una arquitectura más moderna, reproducible y preparada para escalar entre proyectos: Vite para el flujo frontend, Docker para ambientes locales consistentes, Tailwind CSS para acelerar la construcción de interfaces y mu-plugins para extraer capacidades compartidas del tema.

## Decisiones principales

- Migrar el empaquetado frontend desde un flujo basado en Webpack hacia Vite.
- Incorporar Docker para reducir diferencias entre entornos locales y facilitar onboarding técnico.
- Integrar Tailwind CSS como herramienta de composición visual más rápida y consistente.
- Separar capacidades reutilizables en mu-plugins, incluyendo una base de design system, tokens y componentes compartidos.
- Mantener WordPress como CMS, pero con una estructura más cercana a ingeniería de producto que a un sitio tradicional.

## Resultado obtenido

El equipo contó con una base WordPress reproducible que agilizó el inicio de proyectos, alineó los entornos locales y concentró capacidades compartidas en mu-plugins sin abandonar el CMS existente.
