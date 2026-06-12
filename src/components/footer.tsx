import * as React from 'react'
import { site } from '~/lib/site'

function useBengaluruTime() {
  const [time, setTime] = React.useState<string | null>(null)
  React.useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Kolkata',
    })
    const tick = () => setTime(fmt.format(new Date()))
    tick()
    const id = setInterval(tick, 30_000)
    return () => clearInterval(id)
  }, [])
  return time
}

export function Footer() {
  const time = useBengaluruTime()

  return (
    <footer className="wrap mt-24 pb-12">
      <div className="hairline" />
      <div className="mt-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <nav className="flex flex-wrap gap-5 text-[0.9375rem]">
          <a href={`mailto:${site.email}`} className="link-quiet">
            Email
          </a>
          {site.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-quiet"
            >
              {s.label}
            </a>
          ))}
        </nav>
        <span className="meta">
          Set in Newsreader · Bengaluru{time ? ` · ${time}` : ''}
        </span>
      </div>
    </footer>
  )
}
