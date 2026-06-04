import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { gitConfig } from './shared';
import { Logo } from '@/components/logo';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <Logo />,
      transparentMode: 'top',
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
    links: [
      { text: 'Docs', url: '/docs', active: 'nested-url' },
      { text: 'Architecture', url: '/docs/architecture' },
      { text: 'Hardware', url: '/docs/hardware' },
      { text: 'Demos', url: '/docs/demos' },
    ],
  };
}
