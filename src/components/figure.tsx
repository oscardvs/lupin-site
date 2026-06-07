'use client';

import { useState } from 'react';

import { cn } from '@/lib/cn';

/**
 * Figure, a framed image with a LOUD placeholder until the real asset is
 * dropped in. Renders the image at `public<src>` when it exists; if the file is
 * missing it fails loud with a fuchsia IMAGE_PLACEHOLDER block naming the exact
 * drop path, so nothing ships as a neutral blank and adding the file later needs
 * zero code changes. Use in MDX:
 *   <Figure src="/diagrams/mission-fsm.png" caption="The mission lifecycle" />
 */
export function Figure({
  src,
  alt,
  caption,
  ratio = '16/9',
  className,
}: {
  src: string;
  alt?: string;
  caption?: string;
  ratio?: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <figure
      className={cn(
        'reticle not-prose relative my-6 overflow-hidden rounded-[5px] border border-hairline bg-fd-card/40',
        className,
      )}
    >
      <span className="reticle-bl" aria-hidden />
      <span className="reticle-br" aria-hidden />
      {failed ? (
        <div
          className="grid place-items-center bg-fuchsia-500/10 p-6 text-center"
          style={{ aspectRatio: ratio }}
        >
          <div>
            <div className="font-mono text-xs font-semibold tracking-widest text-fuchsia-400">
              IMAGE_PLACEHOLDER
            </div>
            <div className="mt-2 text-sm text-fd-muted-foreground">
              Drop the asset at{' '}
              <code className="font-mono text-chartreuse">public{src}</code>
            </div>
            {caption ? (
              <div className="mt-1 text-xs text-fd-muted-foreground/80">
                {caption}
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt ?? caption ?? 'figure'}
          loading="lazy"
          className="block w-full object-cover"
          style={{ aspectRatio: ratio }}
          onError={() => setFailed(true)}
        />
      )}
      {caption && !failed ? (
        <figcaption className="tag flex items-center gap-2 border-t border-hairline px-3 py-2">
          <span className="inline-block h-1 w-1 rounded-full bg-chartreuse" />
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
