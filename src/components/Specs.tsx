const specs = [
  { value: '245g', label: 'Weight, single shoe (US 9)' },
  { value: '32mm', label: 'Heel stack height' },
  { value: '8mm', label: 'Heel-to-toe drop' },
  { value: '3', label: 'Launch colorways' },
  { value: '5–14', label: 'US sizes planned' },
  { value: '0', label: 'Units ever sold — concept only' },
]

export default function Specs() {
  return (
    <section className="relative bg-void px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="mb-14 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <h2 className="font-display text-4xl text-mist sm:text-5xl">By the numbers.</h2>
          <p className="max-w-xs text-sm text-mist-dim">
            Specs written for a real launch, on a shoe that only exists as a 3D file.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">
          {specs.map((s) => (
            <div key={s.label} className="bg-void px-6 py-10 text-center">
              <div className="font-display text-3xl text-gradient sm:text-4xl">{s.value}</div>
              <div className="mt-2 text-xs uppercase tracking-widest text-mist-dim">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
