'use client'

function formatIndex(n: number): string {
  return String(n).padStart(2, '0')
}

export default function SectionNumber({ index }: { index: number }) {
  return (
    <span
      className="mono text-[11px] font-semibold tracking-[0.24em] uppercase"
      style={{ color: 'var(--accent)' }}
      aria-hidden="true"
    >
      {formatIndex(index)}
      <span className="inline-block mx-2 text-white/30">—</span>
    </span>
  )
}
