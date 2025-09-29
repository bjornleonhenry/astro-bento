# astro-bento-portfolio

## A personal portfolio website made using `Astro`.

## Requirements

- Node.js 22 or higher
- pnpm

## Setup

1. Install Node.js 22:
   ```bash
   # Using nvm (recommended)
   nvm install 22
   nvm use 22

   # Or download binaries and add to PATH
   export PATH="$HOME/bin:$PATH"
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start development server:
   ```bash
   pnpm run dev
   ```

## Features

- Modern and Minimal bento-like, sleek UI Design
- All in one page (almost)
- Fully Responsive
- Performances and SEO optimizations
- Ready to be deployed on [Vercel](https://www.vercel.com/)
- Blog
- RSS support (your-domain/rss.xml)
- Cool 3d globe (with [D3](https://d3js.org/))

## Tech Stack

- [Astro](https://astro.build)
- [Unocss](https://unocss.dev/)
- [Motion](https://motion.dev/)
- [D3](https://d3js.org/)
- [Tailwind](https://tailwindcss.com/)

## API Endpoints

- `GET /api/v1/hello.json`
- `GET /api/v1/fetchNowFeed.json`
- `GET /api/v1/fetchProjectsFeed.json`

## Getting Started

```bash
# Clone this repository
$ git clone https://github.com/bjornleonhenry/astro-bento
```

```bash
# Go into the repository
$ cd astro-bento
```

```bash
# Install dependencies
$ pnpm install
or
$ npm install
```

```bash
# Start the project in development
$ pnpm run dev
or
$ npm run dev
```

## Example Endpoint

```bash
curl http://localhost:4321/api/v1/hello.json
```

## Analytics

**NOTE:** REMOVE THE umami analytics script tag (or replace it with your id) in `src/layouts/Layout.astro`

## Configuration

remember to replace the `site` and other properties with your data in `astro.config.mjs`

## Deploy on Vercel

Deploying your website on Vercel. it's optional but I reccomand it in order to deploy it faster and easly.

You just need to fork this repo and link it to your Vercel account.

```bash
pnpm i @astrojs/vercel
pnpm i -g vercel
$ vercel
```
