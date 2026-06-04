import { cn } from '@/lib/cn';

/**
 * The ambient mission-console backdrop: hex-grid texture + chartreuse bloom
 * (top-left) + signal-cyan bloom (top-right), radially masked so it fades at
 * the edges. Drop as the first child of a `relative` section.
 */
export function Atmosphere({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn('pointer-events-none absolute inset-0 -z-10 overflow-hidden', className)}>
      {/* animated mesh-gradient aurora (CSS echo of the HMI's WebGL backdrop) */}
      <div
        className="aurora-anim absolute inset-0"
        style={{
          maskImage: 'radial-gradient(ellipse 90% 80% at 50% 25%, #000 35%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 50% 25%, #000 35%, transparent 85%)',
        }}
      />
      {/* grid */}
      <div
        className="bg-grid absolute inset-0"
        style={{
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 20%, #000 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 20%, #000 30%, transparent 80%)',
        }}
      />
      {/* chartreuse bloom */}
      <div
        className="absolute -left-[10%] -top-[10%] h-[700px] w-[1100px]"
        style={{ background: 'radial-gradient(circle at center, hsla(78,90%,45%,0.10), transparent 60%)' }}
      />
      {/* cyan bloom */}
      <div
        className="absolute right-[-10%] top-0 h-[600px] w-[900px]"
        style={{ background: 'radial-gradient(circle at center, hsla(192,90%,50%,0.06), transparent 60%)' }}
      />
    </div>
  );
}

/** Four reticle corner brackets, wrap any positioned element and add `.reticle`. */
export function ReticleCorners() {
  return (
    <>
      <span className="reticle-bl" aria-hidden />
      <span className="reticle-br" aria-hidden />
    </>
  );
}
