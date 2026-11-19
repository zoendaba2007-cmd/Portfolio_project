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
| **Home** | `/` | Introduction, featured projects, achievement placeholders, CV link and contact links |
| **About** | `/about` | Background, learning history and current studies |
| **Projects** | `/projects` | Project cards loaded from Supabase |
| **Project case study** | `/projects/[slug]` | A project's summary, role, stack, screenshots and links |
| **Skills** | `/skills` | Skills grouped by area, with links to supporting evidence |
| **Contact** | `/contact` | Email, GitHub and LinkedIn links, plus a form that saves messages |
| **Sign in** | `/login` | Admin sign-in through Supabase Auth; there is no public sign-up page |
| **Admin** | `/admin` | Add and delete projects, and review contact messages; restricted to the site admin |
| **Edit project** | `/admin/[id]` | Edit an existing project; restricted to the site admin |

## Design

- **Look and feel:** bright, clean and modern, with generous whitespace, rounded cards and responsive typography. Page headings scale from `text-4xl` on narrow screens to `text-5xl` at the `sm` breakpoint.
- **Colour palette:** amethyst as the main brand colour, with a lavender tint, teal and amber as complements.
- **CV:** the downloadable one-page PDF uses a calm blue theme.
- **Accessibility:** includes a keyboard-accessible skip link, responsive navigation and high-contrast amethyst for text, buttons and links.
- **Wireframes:** see the [`docs/`](./docs) folder for Home, Projects and Contact.

## SEO and accessibility

- Every page has a page-specific title and meta description using the Next.js Metadata API and the shared `lib/seo.ts` helper.
- Open Graph metadata includes the generated share image at `/og`; the site layout also sets a large-image Twitter card.
- `/sitemap.xml` lists the static public pages and project case studies loaded from Supabase. `/robots.txt` links to the sitemap and disallows `/admin` and `/login`.
- GitHub and LinkedIn are linked from the footer and Contact page.
- Keyboard users can skip directly to the main content using the link at the top of each page.

### Lighthouse (mobile, live site; not yet measured)

No verified Lighthouse report or scores are available yet. Add scores and the audit date after running Lighthouse against the deployed site; do not treat unmeasured scores as 100.

| Page | Accessibility | SEO |
|---|---:|---:|
| Home | Not measured | Not measured |
| Projects | Not measured | Not measured |
| About | Not measured | Not measured |
| Skills | Not measured | Not measured |
| Contact | Not measured | Not measured |

## Tech stack

- [Next.js](https://nextjs.org/) (App Router)
- TypeScript
- Tailwind CSS 4
- [Supabase](https://supabase.com/) for project data, authentication and contact messages
- Deployed on [Vercel](https://vercel.com/)

## Running locally

```bash
git clone https://github.com/zoendaba2007-cmd/Portfolio_project
cd Portfolio_project
pnpm install
pnpm dev
```

Then open http://localhost:3000.

Available scripts:

```bash
pnpm dev
pnpm lint
pnpm build
pnpm start
```

## Environment variables

Set these in `.env.local` locally and in Vercel project settings. Never commit values.

| Name | Purpose |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase publishable (public) key |

## Supabase setup

1. Create a Supabase project and an admin user. Disable public sign-ups.
2. In `supabase/schema.sql`, replace each `YOUR-USER-UID` placeholder with the admin user's Supabase Auth UID, then run the script in the SQL Editor. It creates the projects and contact-message tables, access policies and a contact-message rate limit.
3. Add the environment variables above.
4. Ensure the admin user's email matches `site.email` in `lib/site.ts`.
5. Sign in at `/login` to manage projects and view submitted messages at `/admin`.

## Spam protection

The contact form includes a hidden honeypot field; submissions that fill it are discarded. A database trigger also limits contact messages to 5 per minute.

## AI disclosure

AI assistance was used to update responsive heading styles and the skip-to-main-content link, create and revise the downloadable CV PDF, document the Supabase setup and spam protections, and implement the page-specific SEO metadata and descriptions described above. No SQL changes were made as part of these updates.

## Status

The public portfolio, project case studies, skills evidence, contact form, and protected Supabase-backed admin tools are in place. The CV is available from the footer and homepage. The homepage image and achievement cards, and the introductory copy on the Contact page, still contain placeholders that should be replaced with final content. Lighthouse scores have not yet been recorded.

## Reflection

The project supports Supabase-backed project management, case-study pages and a contact-message inbox, with admin access restricted to the configured site email. Project listings use Suspense while request-time data loads. Page-specific metadata, canonical URLs, social-sharing metadata, a generated share image, sitemap and robots rules support discovery and sharing. 

Remaining content work includes replacing the homepage image and achievement placeholders, finalizing the Contact page introduction, and recording real mobile Lighthouse scores for the live site.
