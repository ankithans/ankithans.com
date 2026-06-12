/**
 * A quiet Tufte-style timeline of work history: thin bars on hairlines,
 * mono year ticks. Positions are fractions of the 2021 → now range.
 */
const START = 2021
const END = 2026.6

interface Span {
  label: string
  from: number
  to: number
  current?: boolean
}

const SPANS: Span[] = [
  { label: 'Tessell', from: 2025.6, to: END, current: true },
  { label: 'Uplauz', from: 2025.85, to: END, current: true },
  { label: 'VidyutTech', from: 2024.6, to: 2025.6 },
  { label: 'Volopay', from: 2023.0, to: 2024.6 },
  { label: 'Red Hat · GSoC', from: 2021.4, to: 2021.75 },
]

const YEARS = [2021, 2022, 2023, 2024, 2025, 2026]

const pct = (v: number) => `${(((v - START) / (END - START)) * 100).toFixed(2)}%`

export function Timeline() {
  return (
    <div aria-label="Work history timeline, 2021 to now">
      {/* year ticks */}
      <div className="relative mb-2 h-4">
        {YEARS.map((y) => (
          <span
            key={y}
            className="meta absolute"
            style={{ left: pct(y) }}
          >
            {y}
          </span>
        ))}
      </div>

      <div className="space-y-2.5">
        {SPANS.map((s) => (
          <div key={s.label} className="relative h-4">
            <div className="hairline absolute top-1/2 w-full" />
            <div
              className="absolute top-1/2 h-[3px] -translate-y-1/2 rounded-full"
              style={{
                left: pct(s.from),
                width: `calc(${pct(s.to)} - ${pct(s.from)})`,
                backgroundColor: s.current
                  ? 'var(--accent)'
                  : 'color-mix(in oklab, var(--accent) 38%, var(--line))',
              }}
            />
            <span
              className="meta absolute -top-0.5"
              style={
                s.from - START > (END - START) / 2
                  ? { right: `calc(100% - ${pct(s.from)} + 0.6rem)` }
                  : { left: `calc(${pct(s.to)} + 0.6rem)` }
              }
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
