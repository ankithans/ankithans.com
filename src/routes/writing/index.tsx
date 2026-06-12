import { createFileRoute, Link } from '@tanstack/react-router'
import { Reveal } from '~/components/reveal'
import { posts, formatDate } from '~/lib/content'

export const Route = createFileRoute('/writing/')({
  head: () => ({ meta: [{ title: 'Writing — Ankit Hans' }] }),
  component: WritingIndex,
})

function WritingIndex() {
  return (
    <div className="wrap pt-16 sm:pt-20">
      <Reveal>
        <h1 className="label">Writing</h1>
        <p className="mt-4 text-[--muted]">
          Notes on agents, developer tools, and the open-source road that got me
          here.
        </p>
      </Reveal>

      <div className="mt-10">
        {posts.map((p, i) => (
          <Reveal key={p.slug} delay={0.06 + i * 0.04}>
            <Link
              to="/writing/$slug"
              params={{ slug: p.slug }}
              className="flex items-baseline justify-between gap-4 border-b py-4"
            >
              <span>
                <span className="link" style={{ textDecorationColor: 'transparent' }}>
                  {p.title}
                </span>
                <span className="block text-[0.9375rem] text-[--muted]">
                  {p.summary}
                </span>
              </span>
              <time className="meta shrink-0">{formatDate(p.date)}</time>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
