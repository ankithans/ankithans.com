import * as React from 'react'

function useInkPath() {
  const [d, setD] = React.useState<string | null>(null)

  React.useEffect(() => {
    const jitter = (amp: number) => (Math.random() - 0.5) * amp
    const points = [0, 1, 2, 3].map((i) => ({
      x: 4 + (i * 192) / 3 + (i > 0 && i < 3 ? jitter(14) : 0),
      y: 5.5 + jitter(4.5),
    }))
    const [p0, ...rest] = points
    let path = `M ${p0.x.toFixed(1)} ${p0.y.toFixed(1)}`
    let prev = p0
    for (const p of rest) {
      const cx = (prev.x + p.x) / 2 + jitter(10)
      const cy = (prev.y + p.y) / 2 + jitter(5)
      path += ` Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`
      prev = p
    }
    setD(path)
  }, [])

  return d
}

/**
 * A hand-drawn ink stroke under a word or phrase — the page's one ornament.
 * The path is re-jittered on every visit, so no two strokes are identical.
 * Draws itself on load; renders instantly (no animation) under reduced motion.
 */
export function Ink({ children }: { children: React.ReactNode }) {
  const d = useInkPath()
  return (
    <span className="ink">
      {children}
      {d && (
        <svg viewBox="0 0 200 11" preserveAspectRatio="none" aria-hidden="true">
          <path d={d} pathLength={1} />
        </svg>
      )}
    </span>
  )
}

/** Standalone ink stroke used as a divider — the printer's mark. */
export function InkLine({ width = '11rem' }: { width?: string }) {
  const d = useInkPath()
  return (
    <span className="ink-line" style={{ width }} aria-hidden="true">
      {d && (
        <svg viewBox="0 0 200 11" preserveAspectRatio="none">
          <path d={d} pathLength={1} />
        </svg>
      )}
    </span>
  )
}
