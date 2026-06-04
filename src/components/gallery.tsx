'use client'

import { useCallback, useEffect, useState } from 'react'

import { cn } from '@/lib/cn'

export interface Shot {
  src: string
  alt: string
  caption?: string
  /** Tall (phone) shots render in a narrower column. */
  phone?: boolean
}

/**
 * ScreenGallery, a responsive, reticle-framed screenshot grid with a
 * click-to-zoom lightbox (keyboard + backdrop dismiss, no external dep so it
 * works on an offline AP-mode mirror). Drop into MDX as <ScreenGallery .../>.
 */
export function ScreenGallery({ shots }: { shots: Shot[] }) {
  const [open, setOpen] = useState<number | null>(null)
  const close = useCallback(() => setOpen(null), [])

  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') setOpen((i) => (i === null ? i : (i + 1) % shots.length))
      if (e.key === 'ArrowLeft') setOpen((i) => (i === null ? i : (i - 1 + shots.length) % shots.length))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, shots.length, close])

  return (
    <>
      <div className="not-prose my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {shots.map((s, i) => (
          <figure
            key={s.src}
            className={cn(
              'reticle group relative m-0 cursor-zoom-in overflow-hidden rounded-sm border border-hairline bg-fd-card transition-colors hover:border-[color:var(--color-chartreuse)]',
              s.phone && 'sm:col-span-2 sm:mx-auto sm:max-w-xs',
            )}
            onClick={() => setOpen(i)}
          >
            <span className="reticle-bl" aria-hidden />
            <span className="reticle-br" aria-hidden />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s.src}
              alt={s.alt}
              loading="lazy"
              className="block w-full transition-transform duration-500 ease-out group-hover:scale-[1.015]"
            />
            {s.caption ? (
              <figcaption className="tag flex items-center gap-2 border-t border-hairline px-3 py-2">
                <span className="inline-block h-1 w-1 rounded-full bg-[color:var(--color-chartreuse)]" />
                {s.caption}
              </figcaption>
            ) : null}
          </figure>
        ))}
      </div>

      {open !== null ? (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={shots[open].src}
            alt={shots[open].alt}
            className="max-h-[90vh] max-w-[95vw] rounded-sm border border-hairline shadow-2xl"
          />
          <button
            type="button"
            className="tag absolute right-4 top-4 rounded-sm border border-hairline px-2 py-1 text-fd-muted-foreground hover:text-fd-foreground"
            onClick={close}
          >
            [ esc ]
          </button>
        </div>
      ) : null}
    </>
  )
}
