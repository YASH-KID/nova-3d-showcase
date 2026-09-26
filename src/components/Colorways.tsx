import type { Variant } from './SneakerModel'

const colorways: { id: Variant; name: string; hex: string; tag: string }[] = [
  { id: 'midnight', name: 'Midnight', hex: '#2f6f9e', tag: 'Signature' },
  { id: 'beach', name: 'Beach', hex: '#c98fa0', tag: 'Warm Weather' },
  { id: 'street', name: 'Street', hex: '#c23b3b', tag: 'Limited' },
]

type Props = {
  variant: Variant
  onSelect: (variant: Variant) => void
}

export default function Colorways({ variant, onSelect }: Props) {
  return (
    <section id="colorways" className="relative bg-void px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="mb-4 font-display text-4xl text-mist sm:text-5xl">Pick your shade.</h2>
        <p className="mx-auto mb-16 max-w-md text-mist-dim">
          Three colorways, one model — tap a swatch and watch the hero shoe change in real time.
        </p>
        <div className="grid gap-6 sm:grid-cols-3">
          {colorways.map((c) => {
            const active = c.id === variant
            return (
              <button
                key={c.id}
                onClick={() => onSelect(c.id)}
                className={`group rounded-2xl border p-8 text-left transition-colors ${
                  active ? 'border-ember bg-white/5' : 'border-white/10 hover:border-white/30'
                }`}
              >
                <div
                  className="mx-auto mb-6 h-20 w-20 rounded-full transition-transform group-hover:scale-110"
                  style={{ backgroundColor: c.hex, boxShadow: `0 0 40px ${c.hex}66` }}
                />
                <h3 className="text-center font-display text-lg text-mist">{c.name}</h3>
                <span className="mt-1 block text-center text-xs uppercase tracking-widest text-mist-dim">
                  {c.tag}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
