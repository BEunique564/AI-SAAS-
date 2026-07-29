# AI Business OS

> **Every Business Gets AI Employees.**

The world's most powerful AI Business Operating System for SMEs. An AI-native platform where businesses hire AI employees instead of manually performing repetitive work.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, React 18, Tailwind CSS, Zustand |
| Backend | Fastify, tRPC, Drizzle ORM |
| Database | PostgreSQL 16, Redis 7, Qdrant, Meilisearch |
| AI | LangChain, OpenAI, Anthropic, LiteLLM |
| Infra | Turborepo, Docker, Kubernetes |
| CI/CD | GitHub Actions, ArgoCD |

## Project Structure

```
ai-business-os/
  apps/
    web/              # Next.js frontend (port 3000)
    api/              # Fastify backend (port 3001)
  packages/
    shared/           # Shared types and utilities
    ui/               # React component library
    db/               # Drizzle ORM schema + migrations
    ai/               # AI agent framework
  infra/
    docker/           # Dockerfiles
    k8s/              # Kubernetes manifests
```

## Quick Start

### Prerequisites

- Node.js 20+
- Docker & Docker Compose
- npm 10+

### Setup

```bash
# Clone and install
cd ai-business-os
npm install

# Start infrastructure (Postgres, Redis, Qdrant, Meilisearch)
docker-compose up -d

# Copy environment variables
cp .env.example .env.local

# Start development servers
npm run dev
```

This starts:
- Frontend at http://localhost:3000
- Backend at http://localhost:3001

### Database Setup

```bash
# Generate migration
npm run db:generate

# Push schema to database
npm run db:push
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start all apps in dev mode |
| `npm run build` | Build all apps |
| `npm run lint` | Lint all apps |
| `npm run typecheck` | Type-check all apps |
| `npm run db:generate` | Generate DB migration |
| `npm run db:push` | Push schema to DB |
| `npm run clean` | Clean all build artifacts |

## AI Employees

The platform includes 25+ AI employees:

| AI Employee | Role |
|------------|------|
| AI CEO Dashboard | Business health overview |
| AI Receptionist | 24/7 customer greeting |
| AI Sales Executive | Lead qualification & follow-up |
| AI CRM Manager | Contact data management |
| AI WhatsApp Agent | WhatsApp communications |
| AI Email Manager | Email triage & drafts |
| AI Recruiter | Hiring pipeline |
| AI HR Manager | Attendance & payroll |
| AI Accountant | Invoicing & GST |
| AI Marketing Manager | Campaign automation |
| AI Customer Support | Ticket resolution |
| AI Proposal Generator | Business proposals |
| AI Contract Reviewer | Contract analysis |
| AI Operations Manager | Process optimization |
| AI Report Generator | Analytics reports |
| AI Compliance Officer | Regulatory tracking |
| AI Knowledge Assistant | Internal knowledge |
| AI Project Manager | Task tracking |
| AI Meeting Assistant | Schedule & notes |
| AI Lead Qualification | Lead scoring |
| AI Analytics Agent | Data analysis |
| AI Inventory Manager | Stock optimization |
| AI Procurement Assistant | Supplier management |
| AI Finance Copilot | Cash flow management |

## Environment Variables

See `.env.example` for the full list of required environment variables.

## License

Proprietary. All rights reserved.
