import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Geist, JetBrains_Mono, Instrument_Serif } from 'next/font/google';
import type { Metadata } from 'next';
import { appName, siteUrl, tagline } from '@/lib/shared';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', display: 'swap' });
const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${appName}, ${tagline}`,
    template: `%s · ${appName}`,
  },
  description:
    'Lupin is an autonomous greenhouse robot: it explores and patrols the rows with Nav2, reads climate data off AprilTags, assesses flowers with YOLO, and streams everything to a live digital twin you can drive by voice. ROS 2, sim + hardware, open-source.',
  keywords: [
    'autonomous robot', 'greenhouse robot', 'ROS 2', 'Nav2', 'digital twin',
    'MIRTE Master', 'AprilTag', 'YOLO', 'mecanum', 'SLAM', 'voice control',
  ],
  authors: [{ name: 'Oscar Devos' }],
  openGraph: {
    type: 'website',
    title: `${appName}, ${tagline}`,
    description:
      'An autonomous greenhouse robot with Nav2 autonomy, AprilTag + YOLO perception, a live digital twin, and a voice-controlled mission console.',
    url: siteUrl,
    siteName: appName,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${appName}, ${tagline}`,
    description:
      'Autonomous greenhouse robot · Nav2 · digital twin · voice-controlled HMI. Open-source, ROS 2, sim + hardware.',
  },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${mono.variable} ${serif.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <RootProvider theme={{ defaultTheme: 'dark', enableSystem: false }}>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
