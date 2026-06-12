import type { ComponentType } from 'react'

export interface Metric {
  label: string
  value: string
}

export interface WorkFrontmatter {
  title: string
  slug: string
  org: string
  role: string
  period: string
  status?: string
  summary: string
  /** one short clause for list rows — keep it under ~8 words */
  tagline?: string
  stack: string[]
  metrics?: Metric[]
  order: number
  /** abstracted / representative cover image (no confidential data) */
  cover?: string
}

export interface PostFrontmatter {
  title: string
  slug: string
  date: string
  summary: string
  tags?: string[]
  /** hide from the index without deleting */
  draft?: boolean
}

interface MdxModule<T> {
  default: ComponentType
  frontmatter: T
}

const workModules = import.meta.glob<MdxModule<WorkFrontmatter>>(
  '../content/work/*.mdx',
  { eager: true },
)

const postModules = import.meta.glob<MdxModule<PostFrontmatter>>(
  '../content/writing/*.mdx',
  { eager: true },
)

export interface WorkEntry extends WorkFrontmatter {
  Body: ComponentType
}
export interface PostEntry extends PostFrontmatter {
  Body: ComponentType
}

export const work: WorkEntry[] = Object.values(workModules)
  .map((m) => ({ ...m.frontmatter, Body: m.default }))
  .sort((a, b) => a.order - b.order)

export const posts: PostEntry[] = Object.values(postModules)
  .map((m) => ({ ...m.frontmatter, Body: m.default }))
  .filter((p) => !p.draft)
  .sort((a, b) => (a.date < b.date ? 1 : -1))

export function getWork(slug: string) {
  return work.find((w) => w.slug === slug)
}
export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug)
}

export function formatYear(iso: string) {
  return iso.slice(0, 4)
}

export function formatDate(iso: string) {
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
