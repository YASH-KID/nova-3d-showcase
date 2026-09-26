const scenes = [
  { label: 'Studio', gradient: 'linear-gradient(135deg, #1a0f2e, #ff5a1f)' },
  { label: 'Street', gradient: 'linear-gradient(135deg, #0a0713, #a855f7)' },
  { label: 'Night Run', gradient: 'linear-gradient(135deg, #1c2b3a, #2d1b3d)' },
  { label: 'Trail', gradient: 'linear-gradient(135deg, #2d1b3d, #e8c07d)' },
]

export default function Gallery() {
  return (
    <section className="relative bg-cosmic px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-12 font-display text-4xl text-mist sm:text-5xl">Where it lives.</h2>
        <div className="scrollbar-none -mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4">
          {scenes.map((s) => (
            <div
              key={s.label}
              className="relative h-64 w-64 shrink-0 snap-start overflow-hidden rounded-2xl sm:h-72 sm:w-72"
              style={{ background: s.gradient }}
            >
              <span className="absolute bottom-5 left-5 font-display text-lg text-mist">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
