import { cn } from '@/lib/cn';

/** Local mp4 (from /public) framed in the cockpit style, click-to-play. */
export function Video({
  src,
  poster,
  className,
}: {
  src: string;
  poster?: string;
  className?: string;
}) {
  return (
    <figure className={cn('reticle my-6 overflow-hidden rounded-[5px] border border-hairline', className)}>
      <video className="aspect-video w-full bg-fd-card object-cover" controls playsInline poster={poster} preload="none">
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </figure>
  );
}

/** Privacy-friendly responsive YouTube embed. */
export function YouTube({ id, title = 'Demo video' }: { id: string; title?: string }) {
  return (
    <div className="reticle relative my-6 aspect-video w-full overflow-hidden rounded-[5px] border border-hairline">
      <iframe
        className="absolute inset-0 h-full w-full"
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        title={title}
        loading="lazy"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
