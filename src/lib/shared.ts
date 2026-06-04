export const appName = 'Lupin';
export const tagline = 'Autonomous Greenhouse Robot';
export const siteUrl = 'https://lupin-robot.vercel.app';

export const docsRoute = '/docs';
export const docsImageRoute = '/og/docs';
export const docsContentRoute = '/llms.mdx/docs';

// Public documentation repository (docs site is open-source; robot source
// stays on the team's private GitLab). Used for the "view source / edit" links.
export const gitConfig = {
  user: 'oscardvs',
  repo: 'lupin',
  branch: 'main',
};

export const links = {
  github: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  gitlab: 'https://gitlab.tudelft.nl/cor/ro47007/2026/group_14/lupin',
};
