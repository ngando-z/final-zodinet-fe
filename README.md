# Final Project: Nextjs App (Front End)

<hr />

### Instalation

```ssh
npm install
# or
yarn install
```

### Getting Started

```ssh
npm run dev
# or
yarn dev
```

Open http://localhost:3000 with your browser to see the result.

### Code Structure

```
├── README.md
├── api-client
│   ├── auth-api.ts
│   ├── axios-client.ts
│   └── index.ts
├── components
│   ├── common
│   │   └── Header
│   │       ├── Header.tsx
│   │       └── index.ts
│   └── layout
│       ├── Empty.tsx
│       ├── Main.tsx
│       └── index.ts
├── environments
├── models
│   ├── auth.interface.ts
│   ├── common.interface.ts
│   ├── index.ts
│   └── user.interface.ts
├── next-env.d.ts
├── next.config.js
├── package.json
├── pages
│   ├── _app.tsx
│   ├── index.tsx
│   ├── admin
│   │   └── index.tsx
│   ├── event
│   │   ├── [eventId].tsx
│   │   └── index.tsx
│   ├── login
│   │   └── index.tsx
│   ├── register
│   │   └── index.tsx
│   ├── user
│   │   └── index.tsx
├── public
│   ├── favicon.ico
│   └── vercel.svg
├── styles
│   ├── Home
│   │   └── styles.scss
│   ├── Home.module.css
│   ├── globals.scss
│   └── layout
│       └── main.scss
├── tsconfig.json
└── yarn.lock
```
