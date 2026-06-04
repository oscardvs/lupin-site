import { cn } from '@/lib/cn';

/** The spinning 12-spoke flower-ring "L" monogram, ported from the live HMI top bar. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'relative grid place-items-center overflow-hidden rounded-[3px] border border-chartreuse/40 bg-chartreuse/10 text-chartreuse',
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        className="absolute inset-0 h-full w-full opacity-50 animate-spin-slow"
        aria-hidden
      >
        <g fill="none" stroke="currentColor" strokeWidth="0.6">
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={i} x1="12" y1="2.5" x2="12" y2="5" transform={`rotate(${i * 30} 12 12)`} />
          ))}
        </g>
      </svg>
      <span className="font-display text-[0.95em] leading-none">L</span>
    </div>
  );
}

export function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <LogoMark className="h-7 w-7" />
      <div className="flex items-baseline gap-1.5 leading-none">
        <span className="font-display text-[20px] leading-none text-fd-foreground">Lupin</span>
        <span className="tag tag-accent hidden translate-y-[-1px] sm:inline">v0.1</span>
      </div>
    </div>
  );
}
