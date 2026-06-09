import { cn } from '@/lib/cn';

/**
 * Photo, a reticle-framed local image (served from /public) in the cockpit
 * style, with the corner ticks + an optional caption rail. Pass a Tailwind
 * aspect utility (e.g. 'aspect-[3/4]', 'aspect-[16/9]') to crop consistently.
 */
export function Photo({
  src,
  alt,
  caption,
  aspect = 'aspect-[16/9]',
  className,
}: {
  src: string;
  alt: string;
  caption?: string;
  aspect?: string;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        'reticle relative m-0 overflow-hidden rounded-[5px] border border-hairline bg-fd-card/40',
        className,
      )}
    >
      <span className="reticle-bl" aria-hidden />
      <span className="reticle-br" aria-hidden />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={cn('block w-full object-cover', aspect)}
      />
      {caption ? (
        <figcaption className="tag flex items-center gap-2 border-t border-hairline px-3 py-2">
          <span className="inline-block h-1 w-1 rounded-full bg-chartreuse" />
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
