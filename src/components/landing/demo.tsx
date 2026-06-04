import { Film, Play } from 'lucide-react';
import { cn } from '@/lib/cn';

interface DemoFrameProps {
  /** Path under /public, e.g. "/demos/navigation.mp4". Leave undefined to show the loud placeholder. */
  src?: string;
  poster?: string;
  /** "ambient" = autoplay muted loop (hero); "clip" = click-to-play with controls. */
  mode?: 'ambient' | 'clip';
  aspect?: '16/9' | '4/3' | '1/1';
  label: string;
  /** The exact file to drop in, shown on the placeholder so handoff is unambiguous. */
  dropPath: string;
  className?: string;
}

/**
 * A cockpit-framed demo slot. If `src` is set it renders a real video; otherwise
 * it renders a deliberately LOUD placeholder naming the file to drop into /public,
 * so an unfilled demo can never be mistaken for finished work.
 */
export function DemoFrame({
  src,
  poster,
  mode = 'clip',
  aspect = '16/9',
  label,
  dropPath,
  className,
}: DemoFrameProps) {
  const ratio = aspect === '16/9' ? 'aspect-video' : aspect === '4/3' ? 'aspect-[4/3]' : 'aspect-square';

  return (
    <figure className={cn('reticle group relative overflow-hidden rounded-[5px] border border-hairline bg-fd-card/60', ratio, className)}>
      {/* corner label */}
      <figcaption className="pointer-events-none absolute left-3 top-3 z-10 flex items-center gap-1.5">
        <span className="tag tag-strong bg-fd-background/70 px-1.5 py-1 backdrop-blur">{label}</span>
      </figcaption>

      {src ? (
        mode === 'ambient' ? (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={poster}
            preload="metadata"
          >
            <source src={src} type="video/mp4" />
          </video>
        ) : (
          <video className="h-full w-full object-cover" controls playsInline poster={poster} preload="none">
            <source src={src} type="video/mp4" />
          </video>
        )
      ) : (
        <Placeholder dropPath={dropPath} mode={mode} />
      )}
    </figure>
  );
}

function Placeholder({ dropPath, mode }: { dropPath: string; mode: 'ambient' | 'clip' }) {
  return (
    <div
      className="scanline flex h-full w-full flex-col items-center justify-center gap-3 bg-grid-fine text-center"
      style={{
        backgroundImage:
          'repeating-linear-gradient(45deg, hsla(300,100%,50%,0.08) 0 14px, transparent 14px 28px)',
      }}
    >
      <div className="grid h-12 w-12 place-items-center rounded-full border border-fuchsia-400/60 bg-fuchsia-500/10 text-fuchsia-300">
        {mode === 'ambient' ? <Film className="h-5 w-5" /> : <Play className="h-5 w-5" />}
      </div>
      <div className="px-4">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-fuchsia-300">
          DEMO&nbsp;VIDEO&nbsp;PLACEHOLDER
        </p>
        <p className="mt-1.5 font-mono text-[11px] text-fd-muted-foreground">
          drop your clip at <span className="text-fuchsia-200">public{dropPath}</span>
        </p>
      </div>
    </div>
  );
}
