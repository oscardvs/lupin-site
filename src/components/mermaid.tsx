'use client';

import { useEffect, useId, useState } from 'react';

/**
 * Mermaid, renders a Mermaid diagram themed to the Lupin mission-console
 * palette, in light and dark (re-renders when the docs theme toggles). The
 * library is dynamically imported so it only ships on pages that use a diagram.
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

export function Mermaid({ chart }: { chart: string }) {
  const rawId = useId().replace(/[^a-zA-Z0-9]/g, '');
  const [svg, setSvg] = useState('');
  const [dark, setDark] = useState(true);

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

  return (
    <div
      className="not-prose reticle relative my-6 flex justify-center overflow-x-auto rounded-[5px] border border-hairline bg-fd-card/30 p-4 [&_svg]:h-auto [&_svg]:max-w-full"
      role="img"
      aria-label="diagram"
    >
      <span className="reticle-bl" aria-hidden />
      <span className="reticle-br" aria-hidden />
      <div dangerouslySetInnerHTML={{ __html: svg }} />
    </div>
  );
}
