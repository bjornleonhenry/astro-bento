---
active: true
featured: true
pubDate: 2025-09-27T12:00:00Z
title: Flow Scrape
description: A modern, full-stack SaaS web application for building and executing custom automated workflows, with a focus on web scraping and data processing. Built with Next.js, TypeScript, Prisma.
excerpt: hello world
category: projects
image: "/images/flow-scrape.webp"
tags:
  - Next.js
  - TypeScript
  - Prisma
  - Stripe
  - TailwindCSS
  - shadcn/ui
  - PostgreSQL
  - Workflow
  - Automation
  - Web Scraping
projectURL: "https://flow-scrape.vercel.app"
repoURL: "https://github.com/bjornleonhenry/flow-scrape"
---

### What's included in flow-scrape?

Flow Scrape provides a comprehensive platform for creating, managing, and executing automated workflows. It features a drag-and-drop workflow builder, real-time execution tracking, and integrations with popular services.

## Tech Stack

- [Next.js](https://nextjs.org/): The React framework for production.
- [TypeScript](https://www.typescriptlang.org/): JavaScript with syntax for types.
- [Prisma](https://www.prisma.io/): Next-generation ORM for TypeScript & Node.js.
- [PostgreSQL](https://www.postgresql.org/): Advanced open source relational database.
- [Stripe](https://stripe.com/): Payment processing for internet businesses.
- [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework.
- [shadcn/ui](https://ui.shadcn.com/): Re-usable components built on Radix UI and Tailwind CSS.
- [NextAuth.js](https://next-auth.js.org/): Complete open source authentication solution.

### &nbsp;

![Screenshot 1](/images/flow-scrape-1.webp)

### &nbsp;

![Screenshot 1](/images/flow-scrape-2.webp)

### &nbsp;

## Features
- Workflow Builder: Drag-and-drop interface to create custom workflows
- Node-Based Editor: Visual workflow editor with various node types
- Execution Engine: Run workflows with real-time progress tracking
- User Authentication: Secure user management with NextAuth.js
- Billing Integration: Stripe-powered subscription management
- Credential Management: Secure storage of API keys and credentials
- Analytics Dashboard: Track workflow performance and usage
- Responsive Design: Modern UI built with Tailwind CSS and shadcn/ui

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Stripe account for payments

### Installation

1. Clone the repository:
```bash
git clone https://github.com/bjornleonhenry/flow-scrape.git
cd flow-scrape
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Fill in the required environment variables:
- `DATABASE_URL`: Your PostgreSQL connection string
- `NEXTAUTH_SECRET`: Random secret for NextAuth.js
- `NEXTAUTH_URL`: Your app's URL
- `STRIPE_PUBLISHABLE_KEY`: Stripe publishable key
- `STRIPE_SECRET_KEY`: Stripe secret key
- `STRIPE_WEBHOOK_SECRET`: Stripe webhook secret

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
# or
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Dashboard pages
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Custom components
├── lib/                  # Utility functions and configurations
├── prisma/               # Database schema and migrations
├── public/               # Static assets
└── types/                # TypeScript type definitions
```

## Contributing to flow-scrape

Contributions are welcomed, and appreciated. If you have a feature request, please add it as an issue or make a pull request.