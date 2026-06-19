/// <reference types="vite/client" />
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import * as React from 'react'
import appCss from '~/styles/app.css?url'
import { site } from '~/lib/site'
import { seo } from '~/lib/meta'
import { ThemeProvider, themeScript } from '~/components/theme'
import { Header } from '~/components/header'
import { Footer } from '~/components/footer'

export const Route = createRootRoute({
  head: () => {
    const homeSeo = seo({ title: site.name, description: site.tagline })

    return {
      meta: [
        { charSet: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        ...homeSeo,
        { name: 'theme-color', content: '#141311' },
      ],
      links: [
        { rel: 'stylesheet', href: appCss },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
    }
  },
  component: RootComponent,
  notFoundComponent: NotFound,
})

function NotFound() {
  return (
    <div className="wrap pt-24 sm:pt-32">
      <p className="meta">404</p>
      <h1 className="mt-4 text-[1.4rem] leading-[1.5]">
        There's no page here. The site is short; whatever you were looking for
        is probably a door on the{' '}
        <a className="link hl" href="/">
          first page
        </a>
        .
      </h1>
    </div>
  )
}

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <HeadContent />
      </head>
      <body>
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-[--ink] focus:px-3 focus:py-2 focus:text-sm focus:text-[--paper]"
          >
            Skip to content
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  )
}
