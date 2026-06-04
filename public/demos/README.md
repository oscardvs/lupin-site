# Demo videos — drop your clips here

These files are referenced by the landing page (`src/components/landing/sections.tsx`)
and the docs Demos page (`content/docs/demos.mdx`). Until a file exists, the landing page
renders a **loud magenta placeholder** naming the missing file — that is intentional.

Add `.mp4` files (H.264) with these exact names:

| File | Used by | Notes |
| --- | --- | --- |
| `hero.mp4` | Landing hero (autoplay, muted, loop) | 10–20 s, 720p, keep it small (≤2–3 MB) |
| `navigation.mp4` | Demos grid | Autonomous Nav2 run in Gazebo |
| `hardware.mp4` | Demos grid | Real MIRTE Master driving / reading a tag |
| `twin.mp4` | Demos grid | HMI + digital-twin heatmap updating live |
| `voice.mp4` | Demos grid | A spoken command executing |

Optionally add a matching poster frame (`hero.jpg`, `navigation.jpg`, …) and pass it as
the `poster` prop — it prevents layout shift and is used for social-media previews.
