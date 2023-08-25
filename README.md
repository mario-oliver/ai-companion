This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

## Prisma

Install prisma by running:

-   npm i -D prisma
-   npx prisma init
-   npm install @prisma/client

Every time that we want to update our schema, we do three things:

-   Update the schema.prisma
-   npx prisma generate -> added it to our local prisma
-   npx prisma db push -> adds it to planet scale

To look at your MySQL data with Prisma do the following:

-   npx prisma studio

Which opens a prisma studio on localhost: origin. Chrome has an issue with the webpage, so you'll need to go to incognito.

We will need to seed our database. For this we created a scripts/seed.ts. Run the following command to seed the database with tables:

-   node scripts/seed.ts

## Working with Pinecone & AI Modeling

Installation

`npm i @pinecone-database/pinecone`
`npm i @upstash/redis`
`npm i @upstash/ratelimit`
`npm i langchain`
`npm i ai`

Vercel AI SDK (package ai) allows us to stream input's improving the user experience -> https://sdk.vercel.ai/docs/concepts/streaming. In our case, we are working with the langchain version.
