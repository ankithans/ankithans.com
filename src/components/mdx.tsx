import * as React from 'react'
import { MDXProvider } from '@mdx-js/react'

/** Figure with caption. Used for representative / abstracted visuals. */
export function Figure({
  src,
  alt,
  caption,
}: {
  src?: string
  alt?: string
  caption?: string
  blueprint?: boolean
}) {
  return (
    <figure className="my-8">
      <div className="overflow-hidden rounded-md border">
        {src ? (
          <img src={src} alt={alt ?? ''} className="w-full" loading="lazy" />
        ) : (
          <div className="flex aspect-[16/9] items-center justify-center">
            <span className="meta">representative · {alt ?? 'figure'}</span>
          </div>
        )}
      </div>
      {caption && (
        <figcaption className="meta mt-3 text-center">{caption}</figcaption>
      )}
    </figure>
  )
}

export function Callout({
  children,
  label = 'note',
}: {
  children: React.ReactNode
  label?: string
}) {
  return (
    <aside
      className="my-6 border-l py-0.5 pl-5 text-[0.9375rem]"
      style={{ borderColor: 'var(--accent)' }}
    >
      <span className="label">{label} — </span>
      <span className="text-[--muted]">{children}</span>
    </aside>
  )
}

export function Metrics({
  items,
}: {
  items: { value: string; label: string }[]
}) {
  return (
    <dl className="my-8 flex flex-wrap gap-x-10 gap-y-4 border-y py-5">
      {items.map((m) => (
        <div key={m.label}>
          <dt className="meta">{m.label}</dt>
          <dd
            className="mt-0.5 text-xl font-medium"
            style={{ fontVariantNumeric: 'tabular-nums' }}
          >
            {m.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}

/** Two-column spec table for case studies. */
export function Spec({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="my-6 divide-y border-y">
      {rows.map(([k, v]) => (
        <div key={k} className="flex gap-4 py-2.5 text-[0.9375rem]">
          <dt className="meta w-28 shrink-0 pt-1">{k}</dt>
          <dd className="text-[--muted]">{v}</dd>
        </div>
      ))}
    </dl>
  )
}

export const mdxComponents = {
  Figure,
  Callout,
  Metrics,
  Spec,
}

export function Mdx({ children }: { children: React.ReactNode }) {
  return (
    <div className="prose">
      <MDXProvider components={mdxComponents}>{children}</MDXProvider>
    </div>
  )
}
