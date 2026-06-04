# Lupin — documentation & landing site

The open-source documentation and landing website for **Lupin**, an autonomous greenhouse
robot (MIRTE Master V2; ROS 2 Humble). Built with [Next.js](https://nextjs.org) +
[Fumadocs](https://fumadocs.dev), themed to match the robot's "greenhouse mission console"
HMI.

> This repository is the **public face** of the project. The robot source code lives on a
> private TU Delft GitLab; the documentation here is written against its `hardware` branch.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build

```bash
npm run build    # production build
npm start        # serve the production build
```

## Structure

| Path | What lives there |
| --- | --- |
| `src/app/(home)/page.tsx` | The landing page (composed from `src/components/landing/*`). |
| `src/app/docs/` | The Fumadocs documentation layout + renderer. |
| `content/docs/*.mdx` | All documentation pages. `meta.json` sets the sidebar order. |
| `src/app/global.css` | The design system — palette, fonts, and motifs ported from the HMI. |
| `src/lib/shared.ts` | Site name, URL, and the GitHub/GitLab links. |
| `public/demos/` | Demo video clips (see the README there). |

## Adding a docs page

1. Create `content/docs/<slug>.mdx` with `title` + `description` frontmatter.
2. Add `"<slug>"` to `content/docs/meta.json` in the position you want in the sidebar.

## Demo videos

Drop `.mp4` clips into `public/demos/` — see [`public/demos/README.md`](public/demos/README.md).
Until a clip exists, its slot renders a loud placeholder naming the missing file.

## Deploy

This is a standard Next.js App Router app — deploy to [Vercel](https://vercel.com) with
zero configuration (framework preset auto-detected; Node 22). Search (Orama), `llms.txt`,
and OG image generation all work out of the box.

---

MIT © 2026 Oscar Devos · Built for RO47007 MDP, Team Lupin, TU Delft.
