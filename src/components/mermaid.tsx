'use client';

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { Expand, Minus, Plus, RotateCcw, X } from 'lucide-react';

/**
 * Mermaid, renders a Mermaid diagram themed to the Lupin mission-console
 * palette, in light and dark (re-renders when the docs theme toggles). The
 * library is dynamically imported so it only ships on pages that use a diagram.
 * The inline render fills the content column (mermaid's `useMaxWidth` SVG would
 * otherwise collapse to its 300px intrinsic default inside a shrink-to-fit
 * wrapper), and clicking opens a fullscreen zoom/pan viewer so dense, wide
 * diagrams stay legible.
 * Usage in MDX: <Mermaid chart={`graph LR; A-->B`} />
 */
function themeVars(dark: boolean) {
  return dark
    ? {
        background: 'transparent',
        primaryColor: '#16351a',
        primaryBorderColor: '#aef359',
        primaryTextColor: '#e9efde',
        secondaryColor: '#0f2f37',
        secondaryBorderColor: '#38bdf8',
        secondaryTextColor: '#dbeaf2',
        tertiaryColor: '#10160f',
        tertiaryBorderColor: '#2c3a26',
        lineColor: '#52613f',
        textColor: '#cfd8c2',
        clusterBkg: 'rgba(174,243,89,0.04)',
        clusterBorder: '#2c3a26',
      }
    : {
        background: 'transparent',
        primaryColor: '#e7f0d0',
        primaryBorderColor: '#5b7d1f',
        primaryTextColor: '#1a2410',
        secondaryColor: '#d4eef6',
        secondaryBorderColor: '#2b7d96',
        secondaryTextColor: '#10303a',
        tertiaryColor: '#f4f6ec',
        tertiaryBorderColor: '#c7cdbb',
        lineColor: '#8a9472',
        textColor: '#26301a',
        clusterBkg: 'rgba(91,125,31,0.05)',
        clusterBorder: '#c7cdbb',
      };
}

const MIN_SCALE = 0.1;
const MAX_SCALE = 12;
const STEP = 1.25;

export function Mermaid({ chart }: { chart: string }) {
  const rawId = useId().replace(/[^a-zA-Z0-9]/g, '');
  const [svg, setSvg] = useState('');
  const [dark, setDark] = useState(true);
  const [zoomOpen, setZoomOpen] = useState(false);

  // Track the docs theme (Fumadocs toggles `.dark` on <html>).
  useEffect(() => {
    const el = document.documentElement;
    const read = () => setDark(el.classList.contains('dark'));
    read();
    const mo = new MutationObserver(read);
    mo.observe(el, { attributes: true, attributeFilter: ['class'] });
    return () => mo.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const mod = await import('mermaid');
        const mermaid = mod.default ?? (mod as unknown as typeof mod.default);
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'loose',
          theme: 'base',
          fontFamily: 'JetBrains Mono, ui-monospace, monospace',
          themeVariables: { ...themeVars(dark), fontSize: '13px' },
          flowchart: { curve: 'basis', padding: 14, useMaxWidth: true },
        });
        const { svg } = await mermaid.render(`mmd-${rawId}`, chart);
        if (!cancelled) setSvg(svg);
      } catch (err) {
        if (!cancelled)
          setSvg(
            `<pre style="color:#f87171;font-size:11px;white-space:pre-wrap;margin:0">mermaid: ${String(err)}</pre>`,
          );
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [chart, dark, rawId]);

  // Natural diagram size from the SVG viewBox, used to fit + bound the zoom view.
  const viewBox = useMemo(() => {
    const m = svg.match(/viewBox="([-\d.\s]+)"/);
    if (!m) return null;
    const p = m[1].trim().split(/\s+/).map(Number);
    if (p.length < 4 || !p[2] || !p[3]) return null;
    return { w: p[2], h: p[3] };
  }, [svg]);

  const canZoom = !!svg && !svg.startsWith('<pre') && !!viewBox;
  const open = useCallback(() => {
    if (canZoom) setZoomOpen(true);
  }, [canZoom]);

  return (
    <>
      <div className="not-prose reticle relative my-6 rounded-[5px] border border-hairline bg-fd-card/30">
        <span className="reticle-bl" aria-hidden />
        <span className="reticle-br" aria-hidden />
        <div
          role={canZoom ? 'button' : 'img'}
          tabIndex={canZoom ? 0 : undefined}
          aria-label={canZoom ? 'Diagram — open zoomable view' : 'diagram'}
          onClick={canZoom ? open : undefined}
          onKeyDown={
            canZoom
              ? (e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    open();
                  }
                }
              : undefined
          }
          className={`block w-full p-4 [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:w-full [&_svg]:max-w-full ${
            canZoom
              ? 'cursor-zoom-in outline-none focus-visible:ring-1 focus-visible:ring-chartreuse/60'
              : ''
          }`}
          dangerouslySetInnerHTML={{ __html: svg }}
        />
        {canZoom ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              open();
            }}
            aria-label="Zoom diagram"
            className="tag absolute right-2 top-2 flex items-center gap-1 rounded-[4px] border border-hairline bg-fd-card/80 px-2 py-1 text-fd-muted-foreground backdrop-blur transition hover:text-chartreuse"
          >
            <Expand className="size-3.5" aria-hidden />
            <span className="hidden sm:inline">zoom</span>
          </button>
        ) : null}
      </div>
      {zoomOpen && viewBox ? (
        <MermaidZoom
          svg={svg}
          viewBox={viewBox}
          onClose={() => setZoomOpen(false)}
        />
      ) : null}
    </>
  );
}

/**
 * MermaidZoom, a fullscreen overlay that pans (drag) and zooms (wheel /
 * buttons) the rendered SVG. The SVG is vector, so it stays crisp at any scale.
 * Rendered into <body> via a portal so the docs layout's transforms/overflow
 * can't clip the fixed overlay.
 */
function MermaidZoom({
  svg,
  viewBox,
  onClose,
}: {
  svg: string;
  viewBox: { w: number; h: number };
  onClose: () => void;
}) {
  const [t, setT] = useState({ s: 1, x: 0, y: 0 });
  const overlayRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; moved: boolean } | null>(null);

  const fit = useCallback(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const s = Math.max(
      MIN_SCALE,
      Math.min((vw * 0.92) / viewBox.w, (vh * 0.82) / viewBox.h, MAX_SCALE),
    );
    setT({
      s,
      x: (vw - viewBox.w * s) / 2,
      y: (vh - viewBox.h * s) / 2,
    });
  }, [viewBox]);

  // Fit on open and keep it sensible across viewport resizes.
  useEffect(() => {
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, [fit]);

  // Lock body scroll + close on Escape while open.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const zoomAt = useCallback((px: number, py: number, factor: number) => {
    setT((c) => {
      const ns = Math.max(MIN_SCALE, Math.min(c.s * factor, MAX_SCALE));
      const cx = (px - c.x) / c.s;
      const cy = (py - c.y) / c.s;
      return { s: ns, x: px - cx * ns, y: py - cy * ns };
    });
  }, []);

  // Wheel must be a non-passive native listener so we can preventDefault and
  // stop the page from scrolling underneath.
  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      zoomAt(e.clientX, e.clientY, e.deltaY < 0 ? STEP : 1 / STEP);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [zoomAt]);

  const zoomCenter = useCallback(
    (factor: number) => zoomAt(window.innerWidth / 2, window.innerHeight / 2, factor),
    [zoomAt],
  );

  const onPointerDown = (e: React.PointerEvent) => {
    try {
      (e.target as Element).setPointerCapture?.(e.pointerId);
    } catch {
      // Pointer may not be active (e.g. synthetic events); panning still works.
    }
    drag.current = { x: e.clientX, y: e.clientY, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (Math.abs(dx) + Math.abs(dy) > 3) d.moved = true;
    d.x = e.clientX;
    d.y = e.clientY;
    setT((c) => ({ ...c, x: c.x + dx, y: c.y + dy }));
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const moved = drag.current?.moved;
    drag.current = null;
    // A clean click on the backdrop itself (not a pan, and not the diagram or
    // controls, which are children) closes. Pointer capture on press keeps the
    // target stable for the duration of the gesture.
    if (!moved && e.target === e.currentTarget) onClose();
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <div
      ref={overlayRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      role="dialog"
      aria-modal="true"
      aria-label="Diagram zoom view"
      className="fixed inset-0 z-[120] cursor-grab touch-none select-none bg-black/85 backdrop-blur-sm active:cursor-grabbing"
    >
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: viewBox.w,
          height: viewBox.h,
          transformOrigin: '0 0',
          transform: `translate(${t.x}px, ${t.y}px) scale(${t.s})`,
        }}
        className="[&_svg]:!block [&_svg]:!h-full [&_svg]:!w-full [&_svg]:!max-w-none"
        dangerouslySetInnerHTML={{ __html: svg }}
      />

      {/* Controls — stop propagation so the buttons don't pan/close the view. */}
      <div
        onPointerDown={(e) => e.stopPropagation()}
        className="tag fixed bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-[5px] border border-hairline bg-fd-card/90 p-1 backdrop-blur"
      >
        <button
          type="button"
          onClick={() => zoomCenter(1 / STEP)}
          aria-label="Zoom out"
          className="flex size-8 items-center justify-center rounded-[4px] text-fd-muted-foreground transition hover:bg-fd-accent hover:text-chartreuse"
        >
          <Minus className="size-4" aria-hidden />
        </button>
        <button
          type="button"
          onClick={fit}
          aria-label="Reset zoom"
          className="flex size-8 items-center justify-center rounded-[4px] text-fd-muted-foreground transition hover:bg-fd-accent hover:text-chartreuse"
        >
          <RotateCcw className="size-4" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => zoomCenter(STEP)}
          aria-label="Zoom in"
          className="flex size-8 items-center justify-center rounded-[4px] text-fd-muted-foreground transition hover:bg-fd-accent hover:text-chartreuse"
        >
          <Plus className="size-4" aria-hidden />
        </button>
      </div>

      <button
        type="button"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={onClose}
        aria-label="Close zoom view"
        className="tag fixed right-4 top-4 flex size-9 items-center justify-center rounded-[5px] border border-hairline bg-fd-card/90 text-fd-muted-foreground backdrop-blur transition hover:text-chartreuse"
      >
        <X className="size-4" aria-hidden />
      </button>

      <div className="tag pointer-events-none fixed left-1/2 top-4 -translate-x-1/2 text-fd-muted-foreground/70">
        scroll to zoom · drag to pan · esc to close
      </div>
    </div>,
    document.body,
  );
}
