# 🚀 TalentDash: Career Intelligence Platform

[![Next.js Version](https://img.shields.io/badge/Next.js-15.5-black?logo=next.dot.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-ORM-2496ED?logo=prisma)](https://prisma.io)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql)](https://www.postgresql.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

TalentDash is a comprehensive, type-safe **Career Intelligence Platform** designed to analyze market dynamics, evaluate technical skills, and provide data-driven career path forecasting. Featuring deep predictive calculator systems, structured data normalization layers, and high-performance UI states.

---

## ⚡ Key Features

- **Intelligence Calculation Engine (`/calculate`)**: Computes localized career status vectors, market percentiles, and dynamic salary caps using experience and skill indicators.
- **Robust Type Architecture**: Completely type-safe pipeline utilizing unified namespaces to manage complex domain objects seamlessly (APIs, Salary matrices, and Company payloads).
- **Relational Data Management**: Powered by Prisma ORM and PostgreSQL with built-in connection pooling for high-concurrency production resilience.
- **Production Performance Boundaries**: Fully optimized build architecture pre-configured for modern hosting platforms like Render.

## 🛠️ Tech Stack

- **Frontend Core:** Next.js 15 (App Router), React, Tailwind CSS
- **Programming Engine:** TypeScript (Strict Mode)
- **Database Architecture:** PostgreSQL
- **Data Access Layer:** Prisma Client & Migrations
- **Hosting Environment:** Render / Vercel

---

## 📦 Getting Started

### Prerequisites

Ensure you have the following global dependencies installed:
- **Node.js** (v18.x or higher, production builds optimized for v20+)
- **npm** or your preferred package manager (pnpm/yarn)
- An active instance of **PostgreSQL**

### Local Installation & Configuration

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/PreetiKumari2005/TalentDash-Career-Intelligence-Platform.git](https://github.com/PreetiKumari2005/TalentDash-Career-Intelligence-Platform.git)
   cd TalentDash-Career-Intelligence-Platform
   1.Install project dependencies: npm install
   2.Set up Environment variables:
Create a local .env file in the root directory. Use .env.example as a template:
# Application Environment
PORT=3000
NODE_ENV=development

# Database Connection Strings (Add pooling query parameters if needed)
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/talentdash?schema=public&connection_limit=10"
3.Synchronize the Database Schema:
Generate the local Prisma Client and push migration files directly to your database:
npx prisma db push
# Or run official dev migrations:
# npx prisma migrate dev --name init
4.Fire up the local Development Server: npm run dev
