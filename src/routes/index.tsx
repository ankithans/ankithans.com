import { createFileRoute, Link } from '@tanstack/react-router'
import * as React from 'react'
import { Reveal } from '~/components/reveal'
import { Ink } from '~/components/ink'
import { Timeline } from '~/components/timeline'
import { site } from '~/lib/site'

export const Route = createFileRoute('/')({
  component: Home,
})

function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a className="link" href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  )
}

/* ----------------------------------------------------------------------------
   The ledger — orgs as mono rails, promotions on a spine, projects as doors.
---------------------------------------------------------------------------- */

interface Door {
  label: string
  /** internal case-study slug, or external href */
  slug?: string
  href?: string
  logo: string
  logoDark?: string
  logoClass?: string
  desc: React.ReactNode
}

interface Role {
  title: string
  period: string
  doors?: Door[]
  /** italic substance line for roles without a project door */
  note?: React.ReactNode
}

interface Entry {
  org: string
  period: string
  railLogo?: string
  /** single-role orgs put the role on the rail itself */
  railRole?: string
  roles?: Role[]
  doors?: Door[]
  note?: React.ReactNode
}

const STARSHIP: Door = {
  label: 'Starship',
  slug: 'starship',
  logo: '/media/logos/starship.svg',
  logoDark: '/media/logos/starship-dark.svg',
  desc: (
    <>
      co-builder agents running real software tasks in sandboxes on{' '}
      <Ext href="https://kubernetes.io">Kubernetes</Ext> — I build the runtime,
      the live console, and the workspace layer beneath them
    </>
  ),
}

const SPECTRA: Door = {
  label: 'Spectra',
  slug: 'spectra',
  logo: '/media/logos/spectra.png',
  logoClass: 'logo-spectra',
  desc: (
    <>
      <Ext href="https://www.postgresql.org">Postgres</Ext> that branches the
      way code does — I own the developer experience: console, SQL workbench,
      CLI, and the sub-second feel of all three
    </>
  ),
}

const LEDGER: Entry[] = [
  {
    org: 'Tessell',
    railLogo: '/media/logos/tessell.svg',
    period: '2025 — Present',
    roles: [
      {
        title: 'Product Engineer',
        period: 'May 2026 —',
        doors: [STARSHIP, SPECTRA],
      },
      {
        title: 'Associate Product Manager',
        period: 'Aug 2025 — May 2026',
      },
    ],
  },
  {
    org: 'Uplauz',
    railLogo: '/media/logos/uplauz.svg',
    railRole: 'Technical Cofounder',
    period: '2025 — Present',
    doors: [
      {
        label: 'Uplauz',
        slug: 'uplauz',
        logo: '/media/logos/uplauz.svg',
        logoClass: 'p-[2.5px]',
        desc: (
          <>
            song requests, UPI payments, and AI song detection for live shows
            — live at <Ext href="https://uplauz.com">uplauz.com</Ext>, and I
            wrote nearly every line of it
          </>
        ),
      },
    ],
  },
  {
    org: 'VidyutTech',
    railLogo: '/media/logos/vidyuttech.png',
    railRole: 'Associate Product Manager',
    period: '2024 — 2025',
    doors: [
      {
        label: 'Vidyut',
        slug: 'vidyut',
        logo: '/media/logos/vidyuttech.png',
        desc: (
          <>
            an in-house LLM/OCR document pipeline for EV lending — vendor cost
            down 70%, document processing from minutes to under thirty seconds
          </>
        ),
      },
    ],
  },
  {
    org: 'Volopay (YC S20)',
    railLogo: '/media/logos/volopay.png',
    railRole: 'Product Analyst',
    period: '2023 — 2024',
    note: (
      <>
        credit and data systems — recovered ~$200K, and a funding framework
        that saved ~$1M in monthly working capital
      </>
    ),
  },
  {
    org: 'AeroGear, Red Hat',
    railLogo: '/media/logos/google.png',
    railRole: 'Google Summer of Code',
    period: '2021',
    doors: [
      {
        label: 'Charmil',
        href: 'https://github.com/aerogear/charmil',
        logo: '/media/logos/redhat.png',
        desc: (
          <>
            validation tooling for Go CLIs, built in the open — shipped inside
            Red Hat's OpenShift Services CLI
          </>
        ),
      },
    ],
  },
]

function Rail({
  left,
  period,
  logo,
  logoClass,
}: {
  left: string
  period: string
  logo?: string
  logoClass?: string
}) {
  return (
    <div className="flex items-center gap-4">
      {logo && (
        <img
          src={logo}
          alt=""
          className={`logomark h-[1.05rem] w-[1.05rem] shrink-0 ${logoClass ?? ''}`}
        />
      )}
      <span className="meta uppercase" style={{ color: 'var(--muted)' }}>
        {left}
      </span>
      <span className="hairline min-w-6 flex-1" />
      <span className="meta shrink-0">{period}</span>
    </div>
  )
}

function DoorRow({ door }: { door: Door }) {
  const inner = (
    <>
      <span className="inline-flex w-8 shrink-0 justify-center self-center">
        <img
          src={door.logo}
          alt=""
          className={`logomark h-[1.5rem] w-[1.5rem] ${door.logoClass ?? ''} ${door.logoDark ? 'only-light' : ''}`}
        />
        {door.logoDark && (
          <img
            src={door.logoDark}
            alt=""
            className={`logomark only-dark h-[1.5rem] w-[1.5rem] ${door.logoClass ?? ''}`}
          />
        )}
      </span>
      <span
        className="link text-[1.35rem] sm:text-[1.5rem]"
        style={{ textDecorationColor: 'transparent' }}
      >
        {door.label}
      </span>
    </>
  )
  return (
    <div className="py-2">
      {door.slug ? (
        <Link
          to="/work/$slug"
          params={{ slug: door.slug }}
          className="group flex items-baseline gap-4"
        >
          {inner}
        </Link>
      ) : (
        <a
          href={door.href}
          target="_blank"
          rel="noreferrer"
          className="group flex items-baseline gap-4"
        >
          {inner}
        </a>
      )}
      <p className="mt-0.5 ml-12 max-w-[30rem] text-[0.9875rem] leading-relaxed italic text-[--muted]">
        {door.desc}
      </p>
    </div>
  )
}

function Home() {
  return (
    <div className="wrap pt-20 sm:pt-28">
      {/* the statement */}
      <Reveal>
        <a
          href="https://x.com/AnkitHans15"
          target="_blank"
          rel="noreferrer"
          aria-label="Ankit Hans on X"
          className="mb-6 inline-block rounded-full transition-opacity hover:opacity-80"
        >
          <img
            src="/media/avatar.png"
            alt="Ankit Hans"
            width={52}
            height={52}
            className="rounded-full"
            style={{ width: 52, height: 52, boxShadow: '0 0 0 1px var(--line)' }}
          />
        </a>
        <p className="meta mb-6 uppercase">Software engineer, Bengaluru</p>
        <h1
          className="text-[clamp(2rem,7vw,3.5rem)] leading-[1.2] font-normal tracking-[-0.01em]"
          style={{ fontVariationSettings: "'opsz' 48" }}
        >
          I build infrastructure for software&nbsp;agents, databases, and{' '}
          <Ink>live shows</Ink>.
        </h1>
      </Reveal>

      {/* proof of life */}
      <Reveal delay={0.12}>
        <p className="meta mt-12 uppercase">Last seen {site.lastSeen}</p>
      </Reveal>

      {/* the letter */}
      <div className="mt-14 space-y-5 text-[--muted]">
        <p>
          These days I'm at{' '}
          <a className="link hl" href="https://tessell.com" target="_blank" rel="noreferrer">
            Tessell
          </a>
          , building{' '}
          <Link className="link hl" to="/work/$slug" params={{ slug: 'starship' }}>
            Starship
          </Link>
          , an agentic engineering platform, and the developer experience for{' '}
          <Link className="link hl" to="/work/$slug" params={{ slug: 'spectra' }}>
            Spectra
          </Link>
          , a Postgres that branches like git. Evenings go to{' '}
          <Link className="link hl" to="/work/$slug" params={{ slug: 'uplauz' }}>
            Uplauz
          </Link>
          , a live-music platform I co-founded and build alone, so I spend a
          lot of nights at shows, watching strangers use my software.
        </p>
        <p>
          I like the hard, invisible parts of software: the runtime under the
          agent, the branching model under the database, the latency budget
          under the "instant". Most of what I build, you'd only notice if it
          were gone.
        </p>
        <p>
          Before this I built{' '}
          <Link className="link" to="/work/$slug" params={{ slug: 'vidyut' }}>
            lending infrastructure
          </Link>{' '}
          at two fintechs, and came up through open source: Google Summer of
          Code at{' '}
          <a
            className="link hl"
            href="https://github.com/aerogear/charmil"
            target="_blank"
            rel="noreferrer"
          >
            Red Hat
          </a>
          , where my CLI tooling shipped inside OpenShift.
        </p>
      </div>

      {/* the ledger */}
      <div className="mt-16 space-y-10">
        {LEDGER.map((entry) => (
          <section key={entry.org}>
              <Rail
                left={
                  entry.railRole
                    ? `${entry.org} · ${entry.railRole}`
                    : entry.org
                }
                period={entry.period}
                logo={entry.railLogo}
                logoClass={entry.railLogo?.includes('uplauz') ? 'p-[1.5px]' : ''}
              />

              {/* promotion spine for multi-role orgs */}
              {entry.roles && (
                <div className="mt-4 ml-1 space-y-4 border-l pl-6">
                  {entry.roles.map((role) => (
                    <div key={role.title} className="relative">
                      <span
                        className="absolute top-[0.55em] -left-[calc(1.5rem+2.5px)] h-[5px] w-[5px] rounded-full"
                        style={{ backgroundColor: 'var(--faint)' }}
                      />
                      <div className="flex items-baseline justify-between gap-4">
                        <span className="text-[0.9375rem] text-[--muted]">
                          {role.title}
                        </span>
                        <span className="meta shrink-0">{role.period}</span>
                      </div>
                      {role.doors && (
                        <div className="mt-2">
                          {role.doors.map((d) => (
                            <DoorRow key={d.label} door={d} />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* doors directly on the org */}
              {entry.doors && (
                <div className="mt-3">
                  {entry.doors.map((d) => (
                    <DoorRow key={d.label} door={d} />
                  ))}
                </div>
              )}

              {/* substance line for door-less orgs */}
              {entry.note && (
                <p className="mt-3 ml-12 max-w-[30rem] text-[0.9875rem] leading-relaxed italic text-[--muted]">
                  {entry.note}
                </p>
              )}
          </section>
        ))}

        {/* writing */}
        <section>
            <Rail left="Writing" period="2021 —" />
            <div className="mt-3">
              <div className="py-2">
                <Link to="/writing" className="group flex items-baseline gap-4">
                  <span className="inline-flex w-8 shrink-0 justify-center self-center">
                    <span className="label" aria-hidden="true">
                      ¶
                    </span>
                  </span>
                  <span
                    className="link text-[1.35rem] sm:text-[1.5rem]"
                    style={{ textDecorationColor: 'transparent' }}
                  >
                    Notes &amp; essays
                  </span>
                </Link>
                <p className="mt-0.5 ml-12 max-w-[30rem] text-[0.9875rem] leading-relaxed italic text-[--muted]">
                  on agents, developer tools, and the open-source road —
                  starting with{' '}
                  <Ext href="https://summerofcode.withgoogle.com">
                    Google Summer of Code
                  </Ext>
                </p>
              </div>
            </div>
        </section>

        {/* history at a glance */}
        <section>
          <Rail left="History" period="2021 — Now" />
          <div className="mt-6">
            <Timeline />
          </div>
          <p className="mt-6 text-[0.9375rem] text-[--muted]">
            Earlier: Myntra intern, Queen's University research fellow, and a
            B.Tech in computer science from SRM. Once won a national hackathon
            run by UIDAI, the people who issue ID cards to 1.4 billion humans.
            The formal record is available on request.
          </p>
        </section>
      </div>
    </div>
  )
}
