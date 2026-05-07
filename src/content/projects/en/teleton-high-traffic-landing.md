---
locale: en
published: true
title: Lightweight landing page for a massive live event
excerpt: Lead development of an HTML landing page for Teletón Chile, optimized to support massive live-event traffic and consume the public counter from Oracle Object Storage.
stack:
  - HTML
  - Vite
  - Tailwind CSS
  - JavaScript
  - Oracle Object Storage
featured: true
order: 2
---

High-traffic frontend case study built for one of Chile's largest live events.

For three consecutive years, I participated as the lead developer of the Teletón event landing page. The technical strategy was to keep the experience as lightweight as possible so it could support a massive number of viewers checking the website while watching the live broadcast.

The landing page combined static HTML, optimized assets, modular JavaScript, and external data consumption. The public counter was fetched from a JSON file hosted on Oracle Object Storage, decoupling public reads from a traditional application infrastructure and reducing pressure on dynamic servers.

## Key decisions

- Prioritize static HTML and a minimal JavaScript layer to reduce runtime cost on both client and server.
- Use Vite to generate versioned, minified assets organized by type.
- Keep section and component styles separated to support fast changes during the event cycle.
- Consume the public counter from Oracle Object Storage to separate critical data from the public landing page.
- Integrate streaming, countdown, news, sponsors, and counter updates without turning the experience into a heavy application.

## Expected outcome

A stable, lightweight landing page prepared for high concurrency, able to support a national live broadcast without depending on unnecessary dynamic architecture.
