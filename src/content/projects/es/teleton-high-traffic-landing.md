---
locale: es
published: true
title: Landing liviana para evento masivo en vivo
excerpt: Desarrollo principal de una landing HTML para Teletón Chile, optimizada para soportar tráfico masivo durante la transmisión en vivo y consumir el cómputo desde Oracle Object Storage.
stack:
  - HTML
  - Vite
  - Tailwind CSS
  - JavaScript
  - Oracle Object Storage
featured: true
order: 2
---

Caso de frontend orientado a alto tráfico, construido para uno de los eventos en vivo más masivos de Chile.

Durante tres años consecutivos participé como desarrollador principal de la landing del evento Teletón. La estrategia técnica fue mantener la experiencia lo más liviana posible para soportar una gran cantidad de espectadores consultando la web mientras veían la transmisión en vivo.

La landing combinaba HTML estático, assets optimizados, JavaScript modular y consumo de datos externos. El cómputo se obtenía desde un archivo JSON alojado en Oracle Object Storage, desacoplando la lectura pública de una infraestructura de aplicación tradicional y reduciendo presión sobre servidores dinámicos.

## Decisiones principales

- Priorizar HTML estático y una capa mínima de JavaScript para reducir costo de ejecución en cliente y servidor.
- Usar Vite para generar assets versionados, minificados y organizados por tipo.
- Mantener secciones y componentes de estilos separados para facilitar cambios rápidos durante el ciclo del evento.
- Consumir el cómputo desde Oracle Object Storage para separar el dato crítico de la landing pública.
- Integrar streaming, countdown, noticias, sponsors y actualización de cifra sin convertir la experiencia en una aplicación pesada.

## Resultado esperado

Una landing estable, liviana y preparada para alta concurrencia, capaz de acompañar una transmisión nacional en vivo sin depender de una arquitectura dinámica innecesaria.
