import { createFileRoute, Link } from '@tanstack/react-router'
import { Reveal } from '~/components/reveal'
import { work } from '~/lib/content'

export const Route = createFileRoute('/work/')({
  head: () => ({ meta: [{ title: 'Work — Ankit Hans' }] }),
  component: WorkIndex,
})

function WorkIndex() {
  return (
    <div className="wrap pt-16 sm:pt-20">
      <Reveal>
        <h1 className="label">Work</h1>
        <p className="mt-4 text-[--muted]">
          Case studies on agent infrastructure, developer tools, and realtime
          systems.
        </p>
      </Reveal>

      <div className="mt-10 space-y-4">
        {work.map((entry, i) => (
          <Reveal key={entry.slug} delay={0.06 + i * 0.04}>
            <Link
              to="/work/$slug"
              params={{ slug: entry.slug }}
              className="block border-b py-4"
            >
              <span className="meta">
                {entry.org} · {entry.role}
              </span>
              <span
                className="link mt-1 block text-[1.25rem]"
                style={{ textDecorationColor: 'transparent' }}
              >
                {entry.title}
              </span>
              <span className="mt-1 block text-[0.9375rem] text-[--muted]">
                {entry.summary}
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
