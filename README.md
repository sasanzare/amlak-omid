# Amlak Omid

[![Language](https://img.shields.io/badge/TypeScript-primary-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)
[![Repository](https://img.shields.io/badge/GitHub-sasanzare%2Famlak--omid-181717?logo=github)](https://github.com/sasanzare/amlak-omid)

## Overview

Amlak Omid is a TypeScript web application with a modern full-stack layout. The repository includes Next.js-style configuration, Prisma, API routes, reusable components, middleware, Docker Compose support, and deployment configuration, which suggests a real-estate oriented platform with both application and service concerns.

## Highlights

- TypeScript-first frontend and application structure
- Componentized UI with `components`, `blocks`, `layout`, and `microComponents`
- API and data layers through `api`, `lib`, and `prisma`
- Docker Compose and deployment-related configuration
- MIT licensed

## Tech Stack

| Area | Details |
| --- | --- |
| Application | TypeScript, JavaScript, Next.js-style structure |
| Styling | CSS, SCSS |
| Data | Prisma |
| Operations | Docker Compose, Liara configuration |
| Key files | `package.json`, `next.config.js`, `tsconfig.json`, `docker-compose.yml` |

## Getting Started

```bash
git clone https://github.com/sasanzare/amlak-omid.git
cd amlak-omid
npm install
npm run dev
```

Before running in a production-like environment, review `.env`, Prisma settings, and the Docker Compose services.

## Suggested README Additions

- Feature screenshots and main user flows
- Database schema overview
- Environment variable table
- Deployment instructions
- API documentation generated from the existing Swagger-related files

## Source

Repository: <https://github.com/sasanzare/amlak-omid>
