import Link from 'next/link';
import { GithubIcon } from '@/components/icons';
import { LogoMark } from '@/components/logo';
import { links } from '@/lib/shared';

const COLUMNS = [
  {
    title: 'Docs',
    items: [
      { label: 'Overview', href: '/docs' },
      { label: 'Quickstart', href: '/docs/quickstart' },
      { label: 'Architecture', href: '/docs/architecture' },
      { label: 'Interfaces', href: '/docs/interfaces' },
    ],
  },
  {
    title: 'Stack',
    items: [
      { label: 'Navigation', href: '/docs/navigation' },
      { label: 'Perception', href: '/docs/perception' },
      { label: 'Digital twin', href: '/docs/digital-twin' },
      { label: 'Web HMI & voice', href: '/docs/web-hmi' },
    ],
  },
  {
    title: 'Project',
    items: [
      { label: 'Hardware', href: '/docs/hardware' },
      { label: 'Demos', href: '/docs/demos' },
      { label: 'GitHub', href: links.github, external: true },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative mt-12 border-t border-hairline bg-fd-background/60">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-chartreuse/50 to-transparent"
      />
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <div className="flex items-center gap-2.5">
            <LogoMark className="h-8 w-8" />
            <span className="font-display text-xl text-fd-foreground">Lupin</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-fd-muted-foreground">
            An autonomous greenhouse robot, Nav2 autonomy, AprilTag + YOLO perception, a live
            digital twin, and a voice-controlled mission console.
          </p>
          <a
            href={links.github}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-[4px] border border-hairline px-3 py-1.5 text-xs font-medium text-fd-muted-foreground transition-colors hover:border-chartreuse/50 hover:text-fd-foreground"
          >
            <GithubIcon className="h-3.5 w-3.5" /> oscardvs/lupin
          </a>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="tag mb-4">{col.title}</p>
            <ul className="space-y-2.5">
              {col.items.map((it) => (
                <li key={it.label}>
                  {'external' in it && it.external ? (
                    <a
                      href={it.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-fd-muted-foreground transition-colors hover:text-chartreuse"
                    >
                      {it.label}
                    </a>
                  ) : (
                    <Link
                      href={it.href}
                      className="text-sm text-fd-muted-foreground transition-colors hover:text-chartreuse"
                    >
                      {it.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-hairline">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-5 py-6 text-xs text-fd-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            Built for RO47007 MDP, Team Lupin, TU&nbsp;Delft. Not affiliated with the MIRTE project
            or course staff.
          </p>
          <p className="tag">MIT © 2026 Oscar Devos</p>
        </div>
      </div>
    </footer>
  );
}
