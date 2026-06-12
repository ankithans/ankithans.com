import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { getPost, formatDate } from '~/lib/content'
import { Mdx } from '~/components/mdx'
import { Reveal } from '~/components/reveal'

export const Route = createFileRoute('/writing/$slug')({
  loader: ({ params }) => {
    const entry = getPost(params.slug)
    if (!entry) throw notFound()
    return { slug: params.slug }
  },
  head: ({ params }) => {
    const entry = getPost(params.slug)
    return { meta: [{ title: entry ? `${entry.title} — Ankit Hans` : 'Writing' }] }
  },
  notFoundComponent: () => (
    <div className="wrap pt-32 text-center">
      <p className="meta">404</p>
      <p className="mt-3 text-[--muted]">That post doesn't exist.</p>
      <Link to="/writing" className="link mt-4 inline-block">
        Back to writing
      </Link>
    </div>
  ),
  component: PostDetail,
})

function PostDetail() {
  const { slug } = Route.useLoaderData()
  const entry = getPost(slug)!
  const Body = entry.Body

  return (
    <article className="wrap pt-16 sm:pt-20">
      <Reveal>
        <header>
          <time className="meta">{formatDate(entry.date)}</time>
          <h1 className="mt-3 text-[1.75rem] leading-snug font-medium tracking-[-0.01em] sm:text-[2rem]">
            {entry.title}
          </h1>
        </header>
      </Reveal>

      <Reveal delay={0.06}>
        <div className="essay mt-8">
          <Mdx>
            <Body />
          </Mdx>
        </div>
      </Reveal>
    </article>
  )
}
