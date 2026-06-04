'use client';

import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/cn';

export function CopyButton({ text, className }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      aria-label="Copy command"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {
          /* clipboard unavailable */
        }
      }}
      className={cn(
        'grid h-7 w-7 shrink-0 place-items-center rounded-[3px] border border-hairline bg-fd-card/60 text-fd-muted-foreground transition-colors hover:border-chartreuse/50 hover:text-chartreuse',
        className,
      )}
    >
      {copied ? <Check className="h-3.5 w-3.5 text-chartreuse" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
}

function TrafficLights() {
  return (
    <div className="flex items-center gap-1.5" aria-hidden>
      <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
      <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
      <span className="h-2.5 w-2.5 rounded-full bg-chartreuse/70" />
    </div>
  );
}

const TARGETS = [
  {
    id: 'sim',
    label: 'Simulation',
    hint: 'Gazebo + SLAM + Nav2 + mission + HMI, one shot',
    command: 'ros2 launch lupin_bringup sim_full.launch.py',
    prompt: '~/ros2_ws',
  },
  {
    id: 'hardware',
    label: 'Hardware',
    hint: 'Laptop-side bring-up against the real MIRTE Master',
    command: 'ros2 launch lupin_bringup hardware.launch.py mission:=true',
    prompt: '~/ros2_ws',
  },
] as const;

/** Tabbed Sim/Hardware bring-up terminal with copy-to-clipboard. */
export function BringupTerminal() {
  const [active, setActive] = useState<(typeof TARGETS)[number]['id']>('sim');
  const target = TARGETS.find((t) => t.id === active)!;

  return (
    <div className="reticle overflow-hidden rounded-[5px] border border-hairline bg-fd-card/70 backdrop-blur">
      {/* title bar */}
      <div className="flex items-center gap-3 border-b border-hairline bg-fd-background/40 px-4 py-2.5">
        <TrafficLights />
        <span className="tag">lupin · bring-up</span>
        <div className="ml-auto flex items-center gap-1">
          {TARGETS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActive(t.id)}
              className={cn(
                'rounded-[3px] px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.12em] transition-colors',
                active === t.id
                  ? 'bg-chartreuse/15 text-chartreuse'
                  : 'text-fd-muted-foreground hover:text-fd-foreground',
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* command */}
      <div className="flex items-center gap-3 px-4 py-4 font-mono text-[13px] sm:text-sm">
        <span className="select-none text-chartreuse/70">{target.prompt}</span>
        <span className="select-none text-fd-muted-foreground">$</span>
        <code className="flex-1 truncate text-fd-foreground">{target.command}</code>
        <CopyButton text={target.command} />
      </div>

      {/* hint */}
      <div className="border-t border-hairline px-4 py-2.5">
        <span className="tag">{target.hint}</span>
      </div>
    </div>
  );
}
