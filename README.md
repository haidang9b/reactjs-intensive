# React Workshop 2026

[![Deploy to GitHub Pages](https://github.com/haidang9b/reactjs-intensive/actions/workflows/deploy.yml/badge.svg)](https://github.com/haidang9b/reactjs-intensive/actions/workflows/deploy.yml)
[![Tests](https://img.shields.io/badge/tests-32%20passing-brightgreen)](https://github.com/haidang9b/reactjs-intensive/actions/workflows/deploy.yml)
[![Build](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/haidang9b/reactjs-intensive/actions/workflows/deploy.yml)

React 19 + Vite monorepo starter with pnpm, Turborepo, Storybook, TanStack Query, React Hook Form, Tailwind CSS, and shared packages.

**Live demo:** <https://haidang9b.github.io/reactjs-intensive/>

## Status

Latest local run of `pnpm test` and `pnpm build`:

| Check       | Result                                     |
| ----------- | ------------------------------------------ |
| Test result | **32 passed** / 32 total (11 test files)   |
| &nbsp;      | `@react-workshop/web` — 28 passed (9 files) |
| &nbsp;      | `@react-workshop/ui` — 2 passed (1 file)   |
| &nbsp;      | `@react-workshop/http-client` — 2 passed (1 file) |
| Build       | **passing** — 2/2 tasks (`turbo build`)    |
| Build time  | ~1.3s cold (web app via Vite); ~0.02s cached (Turbo full-cache hit) |

> Status badges above reflect the latest `Deploy to GitHub Pages` workflow run,
> which runs `lint → typecheck → test → build` before publishing.

## Requirements

- Node.js 20.19+ or 22.12+
- pnpm 10+

## Getting Started

```bash
pnpm install
pnpm dev
```

## Scripts

- `pnpm dev` - run all development tasks through Turborepo
- `pnpm build` - build apps and packages
- `pnpm lint` - lint all workspaces
- `pnpm typecheck` - type-check all workspaces
- `pnpm storybook` - run the UI package Storybook

## Workspace

- `apps/web` - Vite React app
- `packages/ui` - shared UI components developed with Storybook
- `packages/http-client` - shared typed fetch client
- `packages/eslint-config` - shared ESLint flat configs
- `packages/tsconfig` - shared TypeScript configs

## Figma design

<https://www.figma.com/design/QFZc37IcA93Y60Zi1kbYsz/eCommerce-Website-%7C-Web-Page-Design-%7C-UI-KIT-%7C-Interior-Landing-Page--Community-?node-id=0-1&p=f&t=qazEdbbLf2KnueQT-0>

## Api Mock

<https://dummyjson.com/custom-response>

## Api Example

```json
{
  "products": {
    "method": "GET",
    "file": "products.json",
    "url": "https://dummyjson.com/c/abbb-80dc-4582-8e14",
    "expiresOn": null
  },
  "productDetails": {
    "method": "GET",
    "file": "product-details.json",
    "url": "https://dummyjson.com/c/feb3-066a-4263-88a8",
    "expiresOn": null
  },
  "categories": {
    "method": "GET",
    "file": "categories.json",
    "url": "https://dummyjson.com/c/796e-8dd2-4c34-8a9c",
    "expiresOn": null
  },
  "compare": {
    "method": "GET",
    "file": "compare.json",
    "url": "https://dummyjson.com/c/ac50-924b-4fce-9002",
    "expiresOn": null
  },
  "posts": {
    "method": "GET",
    "file": "posts.json",
    "url": "https://dummyjson.com/c/5f3e-0afd-424a-a144",
    "expiresOn": null
  },
  "postDetails": {
    "method": "GET",
    "file": "post-details.json",
    "url": "https://dummyjson.com/c/0641-2273-4e42-8738",
    "expiresOn": null
  },
  "cart": {
    "method": "GET",
    "file": "cart.json",
    "url": "https://dummyjson.com/c/4758-8939-498e-a12c",
    "expiresOn": null
  },
  "cartAdd": {
    "method": "POST",
    "file": "cart-add.json",
    "url": "https://dummyjson.com/c/0bd3-1de3-4e85-92fb",
    "expiresOn": null
  },
  "cartUpdate": {
    "method": "PATCH",
    "file": "cart-update.json",
    "url": "https://dummyjson.com/c/05e7-d03f-434a-960f",
    "expiresOn": null
  },
  "cartRemove": {
    "method": "DELETE",
    "file": "cart-remove.json",
    "url": "https://dummyjson.com/c/dc1d-e752-4dc6-b4f7",
    "expiresOn": null
  },
  "checkout": {
    "method": "POST",
    "file": "checkout.json",
    "url": "https://dummyjson.com/c/2bf1-c646-4b04-b713",
    "expiresOn": null
  },
  "contact": {
    "method": "POST",
    "file": "contact.json",
    "url": "https://dummyjson.com/c/d46d-a885-4d10-afc3",
    "expiresOn": null
  }
}
```

## Passing Criteria

### Functional

- Product listing page
- Product details page
- Product search
- Shopping cart
- Add product to cart
- Update product quantity
- Remove product from cart
- Checkout form
- Contact form
- Loading states
- Empty states
- Error states

### UI

- At least **70%** visual similarity with the Figma design
- Responsive on desktop and mobile

### Code Quality

The following commands must pass:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

### Testing

- Minimum **70%** unit test coverage
