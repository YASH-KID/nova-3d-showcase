const features = [
  {
    title: 'Cloudform Sole',
    desc: 'A dual-density foam tuned for rebound on every step, without the dead-leg feeling by mile three.',
  },
  {
    title: 'Adaptive Knit',
    desc: 'A single-piece upper that flexes with your foot instead of fighting it. Zero break-in period.',
  },
  {
    title: 'Zero-Stitch Build',
    desc: 'Bonded construction removes the seams that usually cause hot spots on long wears.',
  },
]

export default function Features() {
  return (
    <section id="features" className="relative bg-cosmic px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-16 text-center font-display text-4xl text-mist sm:text-5xl">
          Built different.
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-colors hover:border-white/20"
            >
              <div className="mb-5 h-1 w-10 rounded-full bg-ember" />
              <h3 className="mb-3 font-display text-lg text-mist">{f.title}</h3>
              <p className="text-sm leading-relaxed text-mist-dim">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
