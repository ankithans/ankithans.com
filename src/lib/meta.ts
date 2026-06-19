import { site } from './site'

const defaultImage = '/og.png'

export function absoluteUrl(path: string) {
  return new URL(path, site.url).toString()
}

interface SeoInput {
  title: string
  description: string
  path?: string
  image?: string
  imageAlt?: string
  type?: 'website' | 'article'
}

export function seo({
  title,
  description,
  path = '/',
  image = defaultImage,
  imageAlt = title,
  type = 'website',
}: SeoInput) {
  const url = absoluteUrl(path)
  const imageUrl = absoluteUrl(image)

  return [
    { title },
    { name: 'description', content: description },
    { property: 'og:site_name', content: site.name },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:type', content: type },
    { property: 'og:url', content: url },
    { property: 'og:image', content: imageUrl },
    { property: 'og:image:alt', content: imageAlt },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: imageUrl },
    { name: 'twitter:image:alt', content: imageAlt },
    { name: 'twitter:creator', content: '@AnkitHans15' },
  ]
}
