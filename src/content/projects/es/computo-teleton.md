---
locale: es
published: true
title: Aplicación operativa segura para Cómputo Teletón
excerpt: Herramienta Laravel para actualizar una cifra pública en tiempo real con autenticación JWT, ReCaptcha y limpieza de caché externa.
stack:
  - Laravel
  - JWT
  - ReCaptcha
  - Vite
  - Tailwind CSS
featured: true
order: 3
---

Caso de desarrollo orientado a operación crítica: una aplicación pequeña, segura y específica para actualizar una cifra pública durante un flujo controlado.

La solución evita complejidad innecesaria: no requiere una tabla de usuarios, protege el acceso con una contraseña única almacenada como hash, valida el formulario con ReCaptcha y genera un JWT para autenticar las acciones posteriores. Una vez autenticado, el administrador puede actualizar un archivo JSON público, ejecutar un script asociado y limpiar una caché externa para reflejar el cambio en el sitio visible.

## Decisiones principales

- Usar autenticación de un solo usuario con hash en variables de entorno.
- Generar JWT para proteger las acciones posteriores al inicio de sesión.
- Incorporar ReCaptcha como defensa adicional contra intentos automatizados.
- Persistir la cifra en un JSON público para simplificar consumo externo.
- Ejecutar limpieza de caché después de cada actualización para reducir desfase entre operación y visualización pública.

## Resultado esperado

Una herramienta acotada, segura y fácil de operar para un momento de alta visibilidad, priorizando confiabilidad, simplicidad y control sobre una arquitectura sobredimensionada.
