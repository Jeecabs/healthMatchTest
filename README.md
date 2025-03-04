# TreeMatch

TreeMatch is a web application that helps users find the perfect tree for their garden by answering a series of simple questions. This interactive questionnaire provides personalised tree recommendations based on user preferences and garden conditions.

## Features

- Interactive questionnaire flow
- Animated UI transitions
- Personalised tree recommendations
- Responsive design for all devices

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm, yarn, or pnpm package manager

### Environment Setup

1. Create a `.env.local` file in the root directory with the following content:

```
API_BASE_URL=http://fe-interview-api-dev.ap-southeast-2.elasticbeanstalk.com
```

### Installation

```bash
# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Running the Development Server

```bash
# Start the development server with Turbopack
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

- `app/` - Next.js app directory
  - `actions/` - Server actions for API communication
  - `page.tsx` - Main page component
  - `layout.tsx` - Root layout component
- `components/` - React components
- `hooks/` - Custom React hooks
- `schemas/` - Zod schemas for type validation

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [React](https://reactjs.org/) - UI library
- [TanStack Query](https://tanstack.com/query) - Data fetching and caching
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Zod](https://zod.dev/) - Schema validation
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
