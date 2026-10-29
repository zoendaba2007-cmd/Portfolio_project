# Zoë | Portfolio Site

**Live site:** https://portfolio-project-self-eight.vercel.app/

A bright, modern portfolio, bringing together my projects and achievements so far.

## Who this site is for

Recruiters, hiring managers and tech teams who want to quickly see what I can build and what I have achieved, and get in touch with me.

## Role I'm aiming for

Junior developer / front-end developer, ideally at a product team or agency where I can keep learning and contribute to real user-facing work.

## Pages

| Page | Route | Purpose |
|---|---|---|
| **Home** | `/` | Introduction, a one-line pitch with my target role, key achievements and featured projects |
| **Projects** | `/projects` | Cards for my projects, each with a description, tech used and links to the code |
| **Contact** | `/contact` | Email and GitHub, plus a simple contact form 
| **Sign in** | `/login` | Sign in with the admin Supabase account; there is no public sign-up page |
| **Admin** | `/admin` | Manage projects; available only to the account matching the configured site email |

## Design

- **Look and feel:** bright, clean and modern, with generous whitespace, rounded cards and large typography.
- **Colour palette:** amethyst as the main brand colour, with a lavender tint, teal and amber as complements.
- **Accessibility:** a darker amethyst (`#6B3FA0`) is used for text, buttons and links so they pass Lighthouse's 4.5:1 contrast requirement. The lighter amethyst (`#9966CC`) is used for decoration only.
- **Wireframes:** see the [`docs/`](./docs) folder for Home, Projects and Contact.

## Tech stack

- [Next.js](https://nextjs.org/) (App Router)
- TypeScript
- Tailwind CSS
- Deployed on [Vercel](https://vercel.com/)

## Running locally

```bash
git clone https://github.com/zoendaba2007-cmd/Portfolio_project
cd portfolio-projecte
npm install
npm run dev
```

Then open http://localhost:3000.

## Environment variables

Set these in `.env.local` locally and in Vercel project settings. Never commit values.

| Name | Purpose |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase publishable (public) key |

## Supabase setup

1. Create a project and one user for yourself, and disable sign-ups.
2. Run `supabase/schema.sql` in the SQL Editor, replacing the placeholder UID with your user's UID.
3. Add the environment variables above.
4. Sign in at `/login`, then manage projects at `/admin`.

## Status

The portfolio is deployed and has working Home, Projects and Contact pages. Project content is stored in Supabase and can be managed through an admin area protected by sign-in and an admin-email check. The site uses a responsive amethyst design and is built with Next.js, TypeScript and Tailwind CSS. Some portfolio copy and achievement details are still placeholders and should be replaced with final content.

## Reflection

Building this portfolio has helped me connect a polished front end to a real data source. I added Supabase-backed project management and restricted the admin area so visitors can browse projects while only the admin account can manage them. I also learned to handle request-time data with Suspense so the project listings work with Next.js prerendering. I chose a deep amethyst for text, links and buttons to keep the interface readable, using lighter shades as decoration. My next step is to replace the remaining placeholder copy and achievements with my own final content.
