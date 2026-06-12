export const site = {
  name: 'Ankit Hans',
  role: 'Software engineer',
  tagline:
    'Software engineer in Bangalore. I build the runtimes, sandboxes, and consoles where software agents do real work.',
  location: 'Bangalore, India',
  /* proof-of-life line on the homepage — update by hand whenever */
  lastSeen: 'at a live show in Bengaluru',
  email: 'ankithans1947@gmail.com',
  url: 'https://ankithans.com',
  socials: [
    { label: 'GitHub', href: 'https://github.com/ankithans', handle: '@ankithans' },
    { label: 'X', href: 'https://x.com/AnkitHans15', handle: '@AnkitHans15' },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/thisisankithans',
      handle: '@thisisankithans',
    },
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/ankithans',
      handle: 'in/ankithans',
    },
  ],
} as const

export const nav = [{ label: 'Writing', to: '/writing' }] as const
