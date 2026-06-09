import { Fragment } from 'react';
import Link from 'next/link';
import {
  Activity,
  ArrowRight,
  Boxes,
  Camera,
  Check,
  Compass,
  Cpu,
  Flower2,
  Gauge,
  Hand,
  Mic,
  Minus,
  Navigation,
  Radar,
  ScanLine,
} from 'lucide-react';
import { cn } from '@/lib/cn';
import { links } from '@/lib/shared';
import { GithubIcon } from '@/components/icons';
import { Atmosphere, ReticleCorners } from './atmosphere';
import { Reveal } from './reveal';
import { BringupTerminal } from './terminal';
import { DemoFrame } from './demo';
import { Photo } from './photo';

/* ---------------------------------------------------------------- shared */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 inline-flex items-center gap-2">
      <span className="h-px w-6 bg-chartreuse/60" />
      <span className="tag tag-accent">{children}</span>
    </div>
  );
}

function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn('mx-auto w-full max-w-6xl px-5 sm:px-8', className)}>
      {children}
    </section>
  );
}

/* ------------------------------------------------------------------- hero */

const HERO_BADGES = ['ROS 2 Humble', 'Nav2 · MPPI', 'Mecanum base', '23-tool voice', 'Open-source'];

export function Hero() {
  return (
    <header className="relative isolate overflow-hidden pb-20 pt-14 sm:pt-20">
      <Atmosphere />
      <Section className="flex flex-col items-center text-center">
        <Reveal>
          <Eyebrow>Autonomous greenhouse robot · ROS 2</Eyebrow>
        </Reveal>

        <Reveal delay={60}>
          <h1 className="max-w-4xl text-balance text-4xl leading-[1.05] tracking-tight text-fd-foreground sm:text-6xl">
            Your greenhouse, watched by a{' '}
            <span className="font-display text-chartreuse">robot that drives itself</span>, and a{' '}
            <span className="font-display text-chartreuse">live digital twin.</span>
          </h1>
        </Reveal>

        <Reveal delay={120}>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-base leading-relaxed text-fd-muted-foreground sm:text-lg">
            Lupin explores and patrols a greenhouse with Nav2, reads climate data off AprilTags,
            finds and grades flowers with YOLO, and streams it all into a digital twin you can
            drive by voice. ROS&nbsp;2, simulation and real hardware, fully open-source.
          </p>
        </Reveal>

        <Reveal delay={180}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/docs"
              className="group inline-flex items-center gap-2 rounded-[4px] bg-chartreuse px-5 py-2.5 text-sm font-semibold text-fd-primary-foreground transition-transform hover:-translate-y-0.5 glow-primary"
            >
              Read the docs
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/docs/architecture"
              className="inline-flex items-center gap-2 rounded-[4px] border border-hairline bg-fd-card/60 px-5 py-2.5 text-sm font-medium text-fd-foreground transition-colors hover:border-chartreuse/50"
            >
              How it works
            </Link>
            <a
              href={links.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-[4px] border border-hairline bg-fd-card/60 px-5 py-2.5 text-sm font-medium text-fd-foreground transition-colors hover:border-chartreuse/50"
            >
              <GithubIcon className="h-4 w-4" />
              Source
            </a>
          </div>
        </Reveal>

        <Reveal delay={240} className="mt-10 w-full max-w-2xl">
          <BringupTerminal />
        </Reveal>

        <Reveal delay={300} className="mt-10 w-full max-w-5xl">
          <DemoFrame
            label="01 · live mission"
            mode="ambient"
            aspect="16/9"
            src="/demos/hero.mp4"
            dropPath="/demos/hero.mp4"
            className="glow-primary"
          />
        </Reveal>

        <Reveal delay={340}>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {HERO_BADGES.map((b) => (
              <li key={b} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-chartreuse/80" />
                <span className="tag tag-strong">{b}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>
    </header>
  );
}

/* ------------------------------------------------------------- stat strip */

const STATS = [
  { v: '9', l: 'ROS 2 packages' },
  { v: '23', l: 'voice tools' },
  { v: '10 / 6', l: 'msgs / services' },
  { v: 'MPPI', l: 'omni controller' },
  { v: 'Sim + HW', l: 'one codebase' },
  { v: 'MIT', l: 'open-source' },
];

export function StatStrip() {
  return (
    <Section className="py-6">
      <Reveal>
        <dl className="reticle grid grid-cols-2 divide-x divide-y divide-hairline overflow-hidden rounded-[5px] border border-hairline bg-fd-card/40 sm:grid-cols-3 lg:grid-cols-6 lg:divide-y-0">
          {STATS.map((s) => (
            <div key={s.l} className="flex flex-col items-center gap-1 px-4 py-5">
              <dt className="ticker text-2xl text-fd-foreground">{s.v}</dt>
              <dd className="tag text-center">{s.l}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Section>
  );
}

/* ----------------------------------------------------------- problem band */

export function Problem() {
  return (
    <Section className="py-24">
      <Reveal className="mx-auto max-w-3xl text-center">
        <Eyebrow>The problem</Eyebrow>
        <p className="text-balance font-display text-3xl leading-snug text-fd-foreground sm:text-4xl">
          A greenhouse has thousands of plants and one grower&rsquo;s attention.
        </p>
        <p className="mx-auto mt-5 max-w-2xl text-fd-muted-foreground">
          Climate readings sit scattered on tags down every aisle, plant health is checked by hand,
          and nobody can be in every row at once. Fixed sensors only see their one spot; a person
          can&rsquo;t walk the rows all day.
        </p>
        <p className="mt-6 inline-block border-t border-chartreuse/40 pt-3 font-display text-xl text-chartreuse">
          Let the robot walk the rows.
        </p>
      </Reveal>

      <Reveal delay={120} className="mx-auto mt-12 max-w-4xl">
        <Photo
          src="/greenhouse/tulip-rows.jpeg"
          alt="Rows of tulips under glass at the Tulpen.nl greenhouse, stretching to the horizon"
          caption="Tulpen.nl · thousands of plants, every aisle"
          aspect="aspect-[16/9]"
        />
      </Reveal>
    </Section>
  );
}

/* -------------------------------------------------------------- features */

const FEATURES = [
  {
    code: '01',
    Icon: Compass,
    title: 'Autonomous exploration & monitoring',
    body:
      'A hierarchical state machine frontier-explores the live SLAM map until it discovers N distinct tags, then loops a continuous monitoring patrol, re-scanning each station forever.',
    href: '/docs/mission',
    featured: true,
  },
  {
    code: '02',
    Icon: Navigation,
    title: 'Nav2, tuned for a mecanum base',
    body:
      'MPPI controller with an Omni motion model so the holonomic base actually strafes, narrow-aisle costmaps, and a per-leg AMCL drift gate.',
    href: '/docs/navigation',
  },
  {
    code: '03',
    Icon: ScanLine,
    title: 'AprilTag climate reading',
    body:
      'OpenCV ArUco 36h11 + solvePnP on the depth camera reads the fixed climate tags; a bridge serves temperature, humidity, CO₂, light and soil moisture per tag.',
    href: '/docs/perception',
  },
  {
    code: '04',
    Icon: Flower2,
    title: 'Flower detection with YOLO',
    body:
      'An Ultralytics model (tulip red / white / pink + a “bug” anomaly) runs on the gripper cam; the aggregator fuses the dominant species onto the tag being scanned.',
    href: '/docs/perception',
  },
  {
    code: '05',
    Icon: Boxes,
    title: 'A live digital twin',
    body:
      'Observations aggregate into a latched world snapshot plus an inverse-distance-weighted get_field service, honesty-gated with NaN so the heatmap paints only where data exists.',
    href: '/docs/digital-twin',
  },
  {
    code: '06',
    Icon: Mic,
    title: 'A voice-controlled console',
    body:
      'A 23-tool Gemini Live agent drives, navigates, actuates the arm and gripper, throttles its own speed, and trips a software E-stop, every motion gated by the same caps as the joystick.',
    href: '/docs/web-hmi',
    featured: true,
  },
];

export function Features() {
  return (
    <Section id="features" className="py-12">
      <Reveal className="mb-12 text-center">
        <Eyebrow>What lupin does</Eyebrow>
        <h2 className="text-balance text-3xl tracking-tight text-fd-foreground sm:text-4xl">
          Six capabilities, one robot.
        </h2>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f, i) => (
          <Reveal key={f.code} delay={(i % 3) * 80}>
            <Link
              href={f.href}
              className={cn(
                'reticle group flex h-full flex-col rounded-[5px] border border-hairline bg-fd-card/50 p-6 transition-all hover:-translate-y-0.5 hover:border-chartreuse/40',
                f.featured && 'border-chartreuse/25',
              )}
            >
              <div className="mb-4 flex items-center justify-between">
                <span
                  className={cn(
                    'grid h-10 w-10 place-items-center rounded-[4px] border border-hairline bg-fd-background/50 text-fd-muted-foreground transition-colors group-hover:border-chartreuse/40 group-hover:text-chartreuse',
                    f.featured && 'border-chartreuse/40 text-chartreuse',
                  )}
                >
                  <f.Icon className="h-5 w-5" />
                </span>
                <span className="tag tag-accent">{f.code}</span>
              </div>
              <h3 className="text-lg font-semibold text-fd-foreground">{f.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-fd-muted-foreground">{f.body}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-chartreuse/80 transition-colors group-hover:text-chartreuse">
                Read more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------ system flow */

const FLOW = [
  { Icon: Compass, label: 'Explore', sub: 'frontier BFS', href: '/docs/mission' },
  { Icon: Navigation, label: 'Navigate', sub: 'Nav2 · MPPI', href: '/docs/navigation' },
  { Icon: ScanLine, label: 'Perceive', sub: 'AprilTag + YOLO', href: '/docs/perception' },
  { Icon: Boxes, label: 'Twin', sub: '/twin/state', href: '/docs/digital-twin' },
  { Icon: Mic, label: 'HMI / Voice', sub: ':8090 console', href: '/docs/web-hmi' },
];

export function SystemFlow() {
  return (
    <Section className="py-24">
      <Reveal className="mb-10 text-center">
        <Eyebrow>System flow</Eyebrow>
        <h2 className="text-balance text-3xl tracking-tight text-fd-foreground sm:text-4xl">
          From an empty map to a live twin.
        </h2>
      </Reveal>

      <Reveal>
        {/* Arrows live BETWEEN the cards (not inside each item) so every card is
            an equal-height flex sibling, the last one no longer stretches. */}
        <div className="flex flex-col items-stretch gap-3 md:flex-row md:gap-2">
          {FLOW.map((n, i) => (
            <Fragment key={n.label}>
              <Link
                href={n.href}
                className="reticle group flex flex-1 flex-col items-center gap-2 rounded-[5px] border border-hairline bg-fd-card/50 px-4 py-5 text-center transition-colors hover:border-chartreuse/40"
              >
                <span className="grid h-10 w-10 place-items-center rounded-[4px] border border-hairline bg-fd-background/50 text-chartreuse">
                  <n.Icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-semibold text-fd-foreground">{n.label}</span>
                <span className="tag">{n.sub}</span>
              </Link>
              {i < FLOW.length - 1 && (
                <ArrowRight className="mx-auto h-4 w-4 shrink-0 rotate-90 self-center text-chartreuse/50 md:rotate-0" />
              )}
            </Fragment>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

/* ------------------------------------------------------------- comparison */

const ROWS = [
  'Covers every aisle, continuously',
  'Reads climate tags automatically',
  'Assesses individual flower health',
  'Builds a live spatial field model',
  'One-click human takeover',
  'Open-source & reproducible',
];

export function Comparison() {
  const Cell = ({ ok }: { ok: boolean }) =>
    ok ? (
      <Check className="mx-auto h-4 w-4 text-chartreuse" />
    ) : (
      <Minus className="mx-auto h-4 w-4 text-fd-muted-foreground/50" />
    );

  return (
    <Section className="py-12">
      <Reveal className="mb-10 text-center">
        <Eyebrow>Why a robot</Eyebrow>
        <h2 className="text-balance text-3xl tracking-tight text-fd-foreground sm:text-4xl">
          vs. doing the rounds by hand.
        </h2>
      </Reveal>

      <Reveal>
        <div className="reticle overflow-hidden rounded-[5px] border border-hairline bg-fd-card/40">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-hairline">
                <th className="px-4 py-3 text-left font-medium text-fd-muted-foreground">Capability</th>
                <th className="px-4 py-3 text-center font-semibold text-chartreuse">Lupin</th>
                <th className="px-4 py-3 text-center font-medium text-fd-muted-foreground">Manual rounds</th>
                <th className="px-4 py-3 text-center font-medium text-fd-muted-foreground">Fixed sensors</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r, i) => (
                <tr key={r} className={cn(i % 2 && 'bg-fd-background/30')}>
                  <td className="px-4 py-3 text-fd-foreground">{r}</td>
                  <td className="px-4 py-3"><Cell ok /></td>
                  <td className="px-4 py-3"><Cell ok={false} /></td>
                  <td className="px-4 py-3"><Cell ok={false} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
    </Section>
  );
}

/* ----------------------------------------------------------------- demos */

const DEMOS = [
  { label: '02 · autonomous nav (sim)', path: '/demos/navigation.mp4' },
  { label: '03 · hardware run', path: '/demos/hardware.mp4' },
  { label: '04 · twin + HMI live', path: '/demos/twin.mp4' },
  { label: '05 · voice command', path: '/demos/voice.mp4' },
];

export function Demos() {
  return (
    <Section id="demos" className="py-24">
      <Reveal className="mb-10 text-center">
        <Eyebrow>See it move</Eyebrow>
        <h2 className="text-balance text-3xl tracking-tight text-fd-foreground sm:text-4xl">
          Demos.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-fd-muted-foreground">
          Drop clips into <code className="font-mono text-chartreuse/90">public/demos/</code> and they
          appear here automatically.
        </p>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2">
        {DEMOS.map((d, i) => (
          <Reveal key={d.path} delay={(i % 2) * 80}>
            <DemoFrame label={d.label} mode="clip" aspect="16/9" dropPath={d.path} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------- hardware */

const HW = [
  { Icon: Gauge, t: '4-wheel mecanum base', s: 'holonomic drive' },
  { Icon: Hand, t: '4-DOF arm + 1-DOF gripper', s: 'Hiwonder servos' },
  { Icon: Camera, t: 'Orbbec depth + gripper cam', s: 'RGB-D + close-up' },
  { Icon: Radar, t: 'RPLidar + IMU', s: 'SLAM + odometry' },
  { Icon: Cpu, t: 'Orange Pi onboard', s: 'laptop offload' },
  { Icon: Activity, t: 'wheel-encoder odometry', s: 'sim = hardware' },
];

export function Hardware() {
  return (
    <Section className="py-12">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <Eyebrow>The machine</Eyebrow>
          <h2 className="text-balance text-3xl tracking-tight text-fd-foreground sm:text-4xl">
            MIRTE Master V2.
          </h2>
          <p className="mt-4 max-w-md text-fd-muted-foreground">
            Lupin runs on the course&rsquo;s MIRTE Master V2, a holonomic mecanum platform with a
            small manipulator. The same codebase drives Gazebo and the real robot; only the
            downstream drive topic changes.
          </p>
          <Link
            href="/docs/hardware"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-chartreuse hover:underline"
          >
            Full hardware spec <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <Reveal delay={100}>
          <div className="grid grid-cols-2 gap-3">
            <Photo
              src="/robot/front.jpeg"
              alt="Lupin robot, front view: the 4-DOF arm raised with a flower in the gripper above its white 3D-printed crate"
              caption="Front · arm + crate"
              aspect="aspect-[3/4]"
            />
            <Photo
              src="/robot/back.jpeg"
              alt="Lupin robot, rear view: the mecanum drive base and the flower payload riding in the crate"
              caption="Rear · mecanum base"
              aspect="aspect-[3/4]"
            />
          </div>
        </Reveal>
      </div>

      <Reveal delay={150} className="mt-10">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {HW.map((h) => (
            <div
              key={h.t}
              className="reticle flex flex-col gap-2 rounded-[5px] border border-hairline bg-fd-card/50 p-4"
            >
              <h.Icon className="h-5 w-5 text-chartreuse" />
              <div>
                <p className="text-sm font-medium leading-tight text-fd-foreground">{h.t}</p>
                <p className="tag mt-1">{h.s}</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

/* ------------------------------------------------------------ highlights */

const HIGHLIGHTS = [
  {
    k: 'browser-side TF',
    t: 'The HMI walks the /tf tree itself',
    b: 'No tf2_web_republisher: RosProvider subscribes to /tf + /tf_static over CBOR, chains 2D transforms in the browser, and re-renders only when the robot moves >5 mm.',
  },
  {
    k: 'software E-stop',
    t: 'A permanent, heart-beating E-stop',
    b: 'It boots engaged, gates every cmd_vel publish, heartbeats a zero Twist at 20 Hz, and fires CancelGoal at both Nav2 servers, and auto-trips on tab-hide or rosbridge drop.',
  },
  {
    k: 'IDW field',
    t: 'A twin that admits what it can’t see',
    b: 'The get_field service interpolates sensor heatmaps but encodes any cell beyond 1.5 m of a real reading as NaN, so the console paints colour only where data supports it.',
  },
  {
    k: 'frontier BFS',
    t: 'A dependency-free frontier explorer',
    b: 'Pure-Python BFS over the occupancy grid, no numpy, no rclpy, masks unknown-adjacent free cells and scores clusters by size / (1 + distance) to pick the next goal.',
  },
];

export function Highlights() {
  return (
    <Section className="py-24">
      <Reveal className="mb-10 text-center">
        <Eyebrow>Under the hood</Eyebrow>
        <h2 className="text-balance text-3xl tracking-tight text-fd-foreground sm:text-4xl">
          Engineering you can read.
        </h2>
      </Reveal>

      <div className="grid gap-4 md:grid-cols-2">
        {HIGHLIGHTS.map((h, i) => (
          <Reveal key={h.k} delay={(i % 2) * 80}>
            <div className="reticle h-full rounded-[5px] border border-hairline bg-fd-card/50 p-6">
              <span className="tag tag-accent">{h.k}</span>
              <h3 className="mt-3 text-lg font-semibold text-fd-foreground">{h.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fd-muted-foreground">{h.b}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------- final CTA */

/* ------------------------------------------------------------------- team */

// The six co-authors & maintainers of group_14 / Lupin (RO47007 MDP, MSc
// Robotics, TU Delft, 2026 cohort), names, handles, and roles from the repo
// README team table.
const GITLAB = 'https://gitlab.tudelft.nl';
const GITLAB_GROUP = `${GITLAB}/cor/ro47007/2026/group_14`;

const TEAM = [
  { name: 'Koen Vogels', initials: 'KV', role: 'Perception · control interface', handle: 'kvogels' },
  { name: 'Lapo Veca', initials: 'LV', role: 'Navigation · manipulation', handle: 'lapoveca' },
  { name: 'Lievijn Simons', initials: 'LS', role: 'Hardware integration · logic', handle: 'lwmssimons' },
  { name: 'Oscar Devos', initials: 'OD', role: 'Navigation · manipulation', handle: 'odevos' },
  { name: 'Tejas Stanley', initials: 'TS', role: 'Perception', handle: 'tstanley' },
  { name: 'Tibbe Wouters', initials: 'TW', role: 'Task logic · control interface', handle: 'twouters' },
];

export function Team() {
  return (
    <Section id="team" className="relative py-24">
      <Atmosphere />
      <Reveal className="mb-10 text-center">
        <Eyebrow>The team</Eyebrow>
        <h2 className="text-balance text-3xl tracking-tight text-fd-foreground sm:text-4xl">
          Built by Team Lupin.
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-balance text-sm text-fd-muted-foreground">
          Six MSc Robotics students at TU Delft (group_14, RO47007 Multidisciplinary
          Project, 2026 cohort), co-authors, maintainers, and owners of the entire stack,
          from the mecanum base to the mission console.
        </p>
      </Reveal>

      <Reveal>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {TEAM.map((m) => (
            <a
              key={m.name}
              href={`${GITLAB}/${m.handle}`}
              target="_blank"
              rel="noreferrer noopener"
              className="reticle group flex flex-col items-center gap-2 rounded-[5px] border border-hairline bg-fd-card/50 px-3 py-6 text-center transition-colors hover:border-chartreuse/40"
            >
              <ReticleCorners />
              <span className="grid h-14 w-14 place-items-center rounded-full border border-chartreuse/40 bg-chartreuse/10 font-display text-xl text-chartreuse">
                {m.initials}
              </span>
              <span className="text-sm font-semibold leading-tight text-fd-foreground">{m.name}</span>
              <span className="tag leading-tight">{m.role}</span>
              <span className="tag tag-accent">@{m.handle}</span>
            </a>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-8">
        <Photo
          src="/team/tulpen-visit.jpeg"
          alt="Team Lupin at the Tulpen.nl growing facility, with a grower holding a bunch of yellow tulips"
          caption="Field study · Tulpen.nl growing facility visit"
          aspect="aspect-[4/5]"
          className="mx-auto max-w-md"
        />
      </Reveal>

      <Reveal className="mt-6 text-center">
        <a
          href={GITLAB_GROUP}
          target="_blank"
          rel="noreferrer noopener"
          className="tag inline-flex items-center gap-2 rounded-[4px] border border-hairline px-3 py-2 text-fd-muted-foreground transition-colors hover:border-chartreuse/40 hover:text-fd-foreground"
        >
          View the team on GitLab ↗
        </a>
      </Reveal>
    </Section>
  );
}

export function FinalCTA() {
  return (
    <section className="relative isolate overflow-hidden py-28">
      <Atmosphere />
      <Section className="flex flex-col items-center text-center">
        <Reveal>
          <h2 className="max-w-2xl text-balance font-display text-4xl leading-tight text-fd-foreground sm:text-5xl">
            Walk the rows without walking the rows.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-fd-muted-foreground">
            Bring Lupin up in simulation with one command, then point it at the real robot.
            Open-source, ROS&nbsp;2, sim and hardware.
          </p>
        </Reveal>
        <Reveal delay={120} className="mt-9 w-full max-w-xl">
          <BringupTerminal />
        </Reveal>
        <Reveal delay={180}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 rounded-[4px] bg-chartreuse px-6 py-3 text-sm font-semibold text-fd-primary-foreground transition-transform hover:-translate-y-0.5 glow-primary"
            >
              Get started <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={links.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-[4px] border border-hairline bg-fd-card/60 px-6 py-3 text-sm font-medium text-fd-foreground transition-colors hover:border-chartreuse/50"
            >
              <GithubIcon className="h-4 w-4" /> Star on GitHub
            </a>
          </div>
        </Reveal>
      </Section>
      <ReticleCorners />
    </section>
  );
}
