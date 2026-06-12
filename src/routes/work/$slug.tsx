import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { getWork, work } from '~/lib/content'
import { Mdx } from '~/components/mdx'
import { Reveal } from '~/components/reveal'

export const Route = createFileRoute('/work/$slug')({
  loader: ({ params }) => {
    const entry = getWork(params.slug)
    if (!entry) throw notFound()
    return { slug: params.slug }
  },
  head: ({ params }) => {
    const entry = getWork(params.slug)
    return { meta: [{ title: entry ? `${entry.title} — Ankit Hans` : 'Work' }] }
  },
  notFoundComponent: () => (
    <div className="wrap pt-32 text-center">
      <p className="meta">404</p>
      <p className="mt-3 text-[--muted]">That case study doesn't exist.</p>
      <Link to="/" className="link mt-4 inline-block">
        Back home
      </Link>
    </div>
  ),
  component: WorkDetail,
})

function WorkDetail() {
  const { slug } = Route.useLoaderData()
  const entry = getWork(slug)!
  const idx = work.findIndex((w) => w.slug === slug)
  const next = work[(idx + 1) % work.length]
  const Body = entry.Body

  return (
    <article className="wrap pt-16 sm:pt-20">
      <Reveal>
        <header>
          <p className="meta">
            {entry.org} · {entry.role} · {entry.period}
          </p>
          <h1 className="mt-3 text-[2rem] font-medium tracking-[-0.01em]">
            {entry.title}
          </h1>
          <p className="mt-4 text-[1.125rem] leading-relaxed text-[--muted]">
            {entry.summary}
          </p>
        </header>
      </Reveal>

      {entry.cover && (
        <Reveal delay={0.06}>
          <figure className="mt-10">
            <div className="overflow-hidden rounded-md border">
              <img
                src={entry.cover}
                alt={`${entry.title} — representative illustration`}
                className="w-full"
              />
            </div>
            <figcaption className="meta mt-3 text-center">
              representative — abstracted, not the real product
            </figcaption>
          </figure>
        </Reveal>
      )}

      <Reveal delay={0.1}>
        <div className="mt-12">
          <Mdx>
            <Body />
          </Mdx>
        </div>
      </Reveal>

      <div className="mt-20">
        <div className="hairline" />
        <p className="mt-6 text-[--muted]">
          <span className="label">Next — </span>
          <Link
            to="/work/$slug"
            params={{ slug: next.slug }}
            className="link"
          >
            {next.title}
          </Link>
        </p>
      </div>
    </article>
  )
}
