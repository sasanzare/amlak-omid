# Amlak Omid

[![Next.js](https://img.shields.io/badge/Next.js-12.2.1-000000?logo=nextdotjs)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.8.3-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-PostgreSQL-2D3748?logo=prisma)](https://www.prisma.io/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)
[![Repository](https://img.shields.io/badge/GitHub-sasanzare%2Famlak--omid-181717?logo=github)](https://github.com/sasanzare/amlak-omid)

## Executive Summary

Amlak Omid is a full-stack real-estate platform built with Next.js, React, TypeScript, Prisma, and PostgreSQL. The project combines a public real-estate marketplace, agency discovery, property advertisements, user authentication, an admin dashboard, management pages, SMS verification, content publishing, contact workflows, FAQ management, reporting, saved listings, map-based location input, and API documentation through Swagger.

The repository demonstrates the ability to design and implement a business-oriented web application with both customer-facing and back-office capabilities. It is not only a UI prototype: the codebase includes database models, API routes, file upload handling, JWT utilities, SMS integration, admin authentication, and operational configuration for PostgreSQL and standalone Next.js output.

## Product Positioning

Amlak Omid is designed for the real-estate domain. It supports a marketplace-style experience where visitors can browse rental and sale listings, inspect property details, discover agencies, read articles, ask questions, and register or sign in through a phone verification flow. On the management side, the platform exposes admin and operational pages for agencies, users, real estate records, city and area data, contact messages, reports, articles, and temporary users.

## Core Capabilities

| Capability | Description |
| --- | --- |
| Property marketplace | Public listing pages for buy, rent, fast sale, special sale, and detail views |
| Agency directory | Agency listing, best agency section, agency details, agency search, and agency rating interface |
| User onboarding | Phone-based login flow with verification code support |
| Real-estate posting | API support for creating and updating advertisements, including image upload |
| Admin panel | Dashboard pages for operational management and reporting |
| Content system | Article pages, single article view, FAQ, rules, and informational pages |
| Contact workflow | Contact form API and management routes |
| Saved listings and notes | Data model support for user saves, notes, and reports |
| Location support | Map component and latitude/longitude fields in the real-estate model |
| API documentation | Swagger handler through `next-swagger-doc` |
| Deployment support | Docker Compose for PostgreSQL and pgAdmin, standalone Next.js output, Liara config |

## User Experience

The application is structured around three major user journeys.

### 1. Visitor Journey

Visitors can land on the homepage, search for properties, browse buy and rent listings, view property cards, navigate to detail pages, read articles, inspect agencies, and submit contact or registration-related forms. The UI uses React Bootstrap, custom components, loading state management, toast notifications, Jalali date formatting, and responsive page sections.

### 2. Authenticated User Journey

Users can sign in with a phone number and verification code. The codebase includes temporary user records, SMS verification logic, local client-side login handling, dashboard routing, and user-related API routes. The data model also supports notes, saved listings, reports, agency ownership, and agent membership.

### 3. Admin and Management Journey

Admin and management pages exist for agencies, agency rating interfaces, agent interfaces, articles, cities, city areas, contact forms, real estate records, temporary users, and users. Admin authentication is protected through JWT-based token handling and middleware that redirects unauthenticated admin access to the login page.

## Technology Stack

| Layer | Technologies |
| --- | --- |
| Frontend framework | Next.js 12.2.1, React 18.2.0 |
| Language | TypeScript, JavaScript |
| Styling/UI | Bootstrap 5, React Bootstrap, SCSS, CSS Modules, Font Awesome |
| State/data fetching | React Context, Axios, SWR, React hooks |
| Forms and validation | React Hook Form, Express Validator |
| Rich text | TipTap, Draft.js, Jodit React, React Draft WYSIWYG |
| Database ORM | Prisma 4.x |
| Database | PostgreSQL |
| Authentication | JWT, bcryptjs, cookie/token middleware |
| SMS | Kavenegar and IPPanel-style SMS provider integration |
| Maps | Leaflet, React Leaflet |
| Charts | Chart.js, React Chart.js 2 |
| File uploads | Formidable, custom `parse-form` helper |
| API docs | next-swagger-doc, Swagger UI React |
| Deployment/runtime | Docker Compose, standalone Next.js output, Liara CLI/config |

## Repository Structure

```text
amlak-omid/
├── api/
│   └── index.js
├── blocks/
│   ├── adminBlock/
│   ├── articleCards/
│   ├── carousel/
│   ├── footer/
│   ├── header/
│   ├── search/
│   ├── searchRent/
│   └── sidebar/
├── components/
│   ├── admin/
│   ├── Faq/
│   ├── HomeDetailsContent/
│   ├── RealState/
│   ├── RealStateDetails/
│   ├── RequestCard/
│   ├── SingleBlog/
│   ├── UserPanel/
│   ├── map/
│   └── modal/
├── context/
│   └── index.js
├── layout/
├── lib/
│   ├── enum-converter.ts
│   ├── init-middleware.ts
│   ├── jwt-provider.ts
│   ├── parse-form.ts
│   ├── prisma.ts
│   ├── sms-provider.ts
│   └── validate-middleware.ts
├── pages/
│   ├── Admin/
│   ├── Agencies/
│   ├── Articles/
│   ├── Buy/
│   ├── Rent/
│   ├── Search/
│   ├── api/
│   ├── dashboard/
│   ├── management/
│   └── signin/
├── prisma/
│   └── schema.prisma
├── public/
├── scripts/
├── styles/
├── docker-compose.yml
├── middleware.ts
├── next-swagger-doc.json
├── next.config.js
├── package.json
└── tsconfig.json
```

## Application Pages

| Area | Notable routes |
| --- | --- |
| Public pages | `/`, `/About`, `/Contact`, `/Faq`, `/Rules`, `/SpecialSale`, `/Search` |
| Property flows | `/Buy`, `/Buy/[buyid]`, `/Rent`, `/Rent/[rentid]`, `/HomeDetails` |
| Agency flows | `/Agencies`, `/Agencies/[agencieid]`, `/AdvisorDetail` |
| Content | `/Articles`, `/Articles/[articleid]`, `/New` |
| Authentication | `/signin/Login`, `/signin/AdvisorRegistration`, `/signin/RealStateRegistration` |
| User area | `/dashboard` |
| Admin | `/Admin`, `/Admin/login`, `/Admin/register`, plus admin CRUD pages |
| Management | `/management/*` pages for operational modules |
| API docs | `/api/doc` |

## API Surface

The project uses Next.js API routes under `pages/api`. The API surface is organized by domain and follows a pragmatic CRUD-style structure.

| API domain | Examples |
| --- | --- |
| Authentication | `auth`, `auth/sendVerificationCode`, `admin/login`, `admin/login/verifyToken` |
| Agencies | `agency/create`, `agency/getAllAgency`, `agency/getAgencyById`, `agency/search`, `agency/bestAgency`, `agency/remove` |
| Agency ratings | `agencyRatingInterface`, `agencyRatingInterface/search`, `agencyRatingInterface/changeAgencyRating` |
| Agency agents | `agentInterface/getAgents`, `agentInterface/getAgentsAgency`, `agentInterface/acceptExpert`, `agentInterface/rejectExpert` |
| Real estate | `realEstate`, `realEstate/create`, `realEstate/search`, `realEstate/getBuyRealEstate`, `realEstate/getRentRealEstate`, `realEstate/getSpecial`, `realEstate/getFastRealEstate` |
| Users | `user`, `user/post`, `user/createAgency`, `user/createAgencyAgent`, `user/getInfoUser`, `user/remove`, `user/search` |
| Geography | `city`, `city/search`, `cityArea`, `cityArea/create`, `cityArea/nestedGet`, `cityArea/search`, `cityArea/remove` |
| Content | `article`, `article/search`, `faq`, `faq/get` |
| Engagement | `note`, `contactForm`, `report`, `tempUser` |
| Documentation | `doc` through `next-swagger-doc` |

## Data Model

The Prisma schema models the marketplace, identity, content, and engagement domains.

### Enums

| Enum | Purpose |
| --- | --- |
| `role` | `admin`, `agencyOwner`, `agencyAgent`, `normal` |
| `requestStatus` | Agency and request status: `accepted`, `pending`, `denied` |
| `assignmentType` | Listing type: `rental`, `forSale`, `fastSale`, `special` |
| `propertyType` | Property category such as commercial, apartment, villa/garden, land, independent |
| `roomCount` | Room count bucket |
| `meter` | Meterage bucket |
| `AdStatus` | Advertisement lifecycle: awaiting payment, awaiting confirmation, active, expired, deleted |

### Main Models

| Model | Responsibility |
| --- | --- |
| `user` | Platform identity, profile, phone number, role, agency relations, listings, notes, saves, reports, articles |
| `tempUser` | Phone number and verification code storage for login/registration flow |
| `agency` | Real-estate agency profile, owner, city, area, status, coordinates, rating, agents, listings |
| `agentInterface` | Relationship between users and agencies for agent admission/activation |
| `agencyRatingInterface` | User-submitted agency ratings |
| `city` and `cityArea` | Geographic hierarchy for agencies and real-estate listings |
| `realEstate` | Core property advertisement model with assignment type, property type, price, city, area, image, coordinates, status, notes, saves, reports, gallery |
| `article` | Content publishing model |
| `contactFrom` | Contact form messages |
| `faq` | Frequently asked questions |
| `note` | User notes against listings |
| `save` | Saved listings |
| `report` | User reports |
| `gallery` | Real-estate gallery images |

## Real Estate Listing Model

The `realEstate` model is the central business entity. It stores the listing title, phone number, description, address, room count, meterage bucket, image, assignment type, property type, price, city, city area, optional latitude/longitude, active state, advertisement status, gallery records, and user/agency ownership.

This model supports multiple marketplace views:

- Rental listings
- Sale listings
- Fast-sale listings
- Special listings
- User-owned listings
- Agency-owned listings
- Area-based and search-based discovery

## Authentication and Authorization

The project includes two different authentication-related flows.

### Phone Verification

`pages/api/auth/sendVerificationCode.ts` validates Iranian mobile numbers, generates a verification code, stores it in `tempUser`, and attempts to send the code through the SMS provider. The frontend login page converts Persian digits to English digits before submitting phone numbers and verification codes.

### Admin Login

`pages/api/admin/login/index.ts` validates credentials with bcrypt and returns a JWT. The middleware checks for a `token` cookie and rewrites unauthenticated `/Admin` requests to `/Admin/login`.

## SMS Integration

The `SmsProvider` class reads `SMS_API_KEY` and `SMS_DEFAULT_NUMBER` from environment variables and sends messages through an IPPanel-style API endpoint. The dependency list also includes Kavenegar, so the project shows practical familiarity with Iranian SMS provider integration.

## File Uploads

Property advertisement creation disables the default Next.js body parser and uses a custom `parseForm` helper with Formidable. Uploaded media is stored under an advertising upload category, then persisted as `estateImage` in the real-estate record.

## Map and Location Features

The project uses Leaflet and React Leaflet. The map component dynamically imports Leaflet components to avoid server-side rendering issues in Next.js. It lets users drag a marker and capture latitude/longitude, with a default center around Shiraz.

## Admin Dashboard

The admin area uses React Bootstrap cards, Font Awesome icons, and Chart.js. It contains dashboard UI patterns such as metric cards, charts, dropdown actions, and route-based management pages. The dashboard currently includes placeholder metrics in places, but the structure is ready to connect to real analytics endpoints.

## Local Development

### Prerequisites

- Node.js compatible with Next.js 12
- npm or yarn
- PostgreSQL
- Docker and Docker Compose, optional but recommended
- Prisma CLI through project dependencies

### Clone

```bash
git clone https://github.com/sasanzare/amlak-omid.git
cd amlak-omid
```

### Install Dependencies

```bash
npm install
```

or:

```bash
yarn install
```

### Configure Environment

Create a local `.env` file and configure at least:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres"
JWT_SECRET="replace-with-a-local-development-secret"
SMS_API_KEY="replace-with-your-sms-provider-key"
SMS_DEFAULT_NUMBER="replace-with-your-sender-number"
```

Do not commit production secrets.

### Start PostgreSQL With Docker

```bash
docker compose up -d db pgadmin
```

Default services from `docker-compose.yml`:

| Service | Port | Purpose |
| --- | --- | --- |
| `db` | `5432` | PostgreSQL database |
| `pgadmin` | `5050` | pgAdmin web interface |

### Generate Prisma Client

```bash
npx prisma generate
```

### Apply Database Changes

Use the migration command that matches the current project state:

```bash
npx prisma migrate dev
```

or, if migrations are not available:

```bash
npx prisma db push
```

### Run Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

### Build

```bash
npm run build
npm run start
```

The build script runs Prisma client generation before building Next.js:

```json
"build": "npx prisma generate && next build"
```

## Environment Variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | Yes | PostgreSQL connection string for Prisma |
| `JWT_SECRET` | Yes | Signing and verifying JWT tokens |
| `SMS_API_KEY` | For SMS | API key for the SMS provider |
| `SMS_DEFAULT_NUMBER` | For SMS | Sender number used by SMS provider |

## API Documentation

Swagger is exposed through `pages/api/doc.ts` using `next-swagger-doc`. After running the app locally, the generated API documentation can be accessed at:

```text
http://localhost:3000/api/doc
```

## Portfolio Presentation

This project is suitable to present as a real full-stack sample because it demonstrates:

- Building a domain-specific marketplace rather than a generic CRUD app
- Designing relational data models for users, agencies, listings, geography, content, reports, and saved records
- Implementing API routes in Next.js
- Integrating Prisma with PostgreSQL
- Handling authentication with JWT and bcrypt
- Supporting phone verification and SMS delivery
- Implementing image upload workflows
- Building admin and management dashboards
- Creating public-facing pages with reusable React components
- Working with maps, charts, rich text editors, forms, search, pagination, and notifications
- Preparing deployment-related configuration

## Suggested Demo Script For Interviews

1. Start with the homepage and explain the marketplace goal.
2. Show buy and rent listing pages and how listing cards are rendered from API data.
3. Open a property detail page and explain city/area, agency, image, price, type, and coordinate data.
4. Show agency listing and agency search.
5. Walk through phone login and SMS verification design.
6. Open the admin dashboard and explain the management modules.
7. Show the Prisma schema and describe the main relationships.
8. Open one API route, such as `realEstate/create`, and explain upload handling, JWT verification, and Prisma upsert.
9. Show Docker Compose and explain the local PostgreSQL/pgAdmin environment.
10. Finish with production-hardening items to show engineering maturity.

## Production Hardening Notes

The repository is a strong full-stack portfolio project, and these are the natural next steps before production deployment:

- Move all secrets to environment variables and remove any local `.env` from version control.
- Replace development/admin placeholder credentials with a proper user-management flow.
- Set `typescript.ignoreBuildErrors` to `false` after resolving type issues.
- Review CORS headers and restrict allowed origins.
- Ensure JWT expiration handling is correct and tokens are stored securely.
- Add rate limiting for SMS and authentication endpoints.
- Add validation to all mutation endpoints.
- Add upload size limits and file type validation.
- Add integration tests for critical API routes.
- Add seed data and a one-command demo setup.
- Add screenshots or a short demo video to the README.

## Roadmap

| Priority | Improvement |
| --- | --- |
| High | Add complete setup docs, seed script, and screenshots |
| High | Harden authentication and SMS verification |
| High | Add validation and authorization checks to all write endpoints |
| Medium | Add role-based access control for admin and agency owners |
| Medium | Add unit/integration tests around API routes |
| Medium | Connect dashboard charts to real metrics |
| Low | Add Storybook or component documentation |

## Source

Repository: <https://github.com/sasanzare/amlak-omid>

---

This README was prepared as a portfolio-grade project document based on the public repository structure, `package.json`, Prisma schema, API routes, UI pages, and supporting configuration reviewed on May 31, 2026.
