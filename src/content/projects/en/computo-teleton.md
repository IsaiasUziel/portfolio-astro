---
locale: en
published: true
title: Secure operational app for Cómputo Teletón
excerpt: Laravel tool to update a public number in real time with JWT authentication, ReCaptcha, and external cache purging.
stack:
  - Laravel
  - JWT
  - ReCaptcha
  - Vite
  - Tailwind CSS
featured: false
order: 3
---

Operational development case study: a small, secure, purpose-built application to update a public number during a controlled workflow.

The solution avoids unnecessary complexity: it does not require a users table, protects access with a single password stored as a hash, validates the login form with ReCaptcha, and generates a JWT to authenticate subsequent actions. Once authenticated, the administrator can update a public JSON file, execute an associated script, and purge an external cache so the public site reflects the change.

## Key decisions

- Use single-user authentication with a password hash stored in environment variables.
- Generate JWTs to protect actions after login.
- Add ReCaptcha as an extra defense against automated attempts.
- Persist the number in a public JSON file to simplify external consumption.
- Trigger cache purging after each update to reduce delay between operation and public display.

## Outcome achieved

The solution allowed the team to update the public number through a focused, protected workflow with JSON persistence and cache purging, without introducing an over-engineered architecture.
