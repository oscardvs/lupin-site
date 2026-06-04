'use client';

import { useState } from 'react';

import { cn } from '@/lib/cn';

/**
 * FacilityPhoto, a framed photo with a LOUD placeholder until the image is
 * dropped in. Used for the Tulpen.nl facility-visit shot; replace by adding the
 * file at `public<src>` (e.g. public/team/tulpen-visit.jpg).
 */
export function FacilityPhoto({
  src,
  alt,
  caption,
  className,
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <figure
      className={cn(
        'reticle relative m-0 overflow-hidden rounded-[5px] border border-hairline bg-fd-card/40',
        className,
      )}
    >
      <span className="reticle-bl" aria-hidden />
      <span className="reticle-br" aria-hidden />
      {failed ? (
        <div className="grid aspect-[16/9] place-items-center bg-fuchsia-500/10 p-6 text-center">
          <div>
            <div className="font-mono text-xs font-semibold tracking-widest text-fuchsia-400">
              IMAGE_PLACEHOLDER
            </div>
            <div className="mt-2 text-sm text-fd-muted-foreground">
              Drop the Tulpen.nl visit photo at{' '}
              <code className="font-mono text-chartreuse">public{src}</code>
            </div>
          </div>
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="block aspect-[16/9] w-full object-cover"
          onError={() => setFailed(true)}
        />
      )}
      {caption ? (
        <figcaption className="tag flex items-center gap-2 border-t border-hairline px-3 py-2">
          <span className="inline-block h-1 w-1 rounded-full bg-chartreuse" />
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
