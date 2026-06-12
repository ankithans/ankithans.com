import { Link } from '@tanstack/react-router'
import { nav, site } from '~/lib/site'
import { useTheme } from '~/components/theme'

export function Header() {
  const { theme, toggle } = useTheme()

  return (
    <header className="wrap flex items-baseline justify-between pt-10 sm:pt-14">
      <Link to="/" className="link-quiet italic" style={{ color: 'var(--ink)' }}>
        {site.name}
      </Link>

      <nav className="flex items-baseline gap-5 text-[0.9375rem]">
        {nav.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="link-quiet"
            activeProps={{ style: { color: 'var(--ink)' } }}
          >
            {item.label}
          </Link>
        ))}
        <button
          onClick={toggle}
          aria-label="Toggle theme"
          title="Toggle theme"
          className="link-quiet cursor-pointer"
        >
          {theme === 'dark' ? '☀' : '☾'}
        </button>
      </nav>
    </header>
  )
}
