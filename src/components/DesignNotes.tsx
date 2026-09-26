const notes = [
  {
    role: 'Design Direction',
    quote:
      'The brief was simple: a shoe you’d actually want to rotate on screen. Everything else, the color-blocking, the stack height, got tuned around that.',
  },
  {
    role: 'Engineering Notes',
    quote:
      'The hero shoe is one glTF file with three baked-in material variants — swapping colorways swaps materials on the GPU, no reload, no re-fetch.',
  },
  {
    role: 'Performance',
    quote:
      'Scroll-linked rotation is driven off a single ref, not React state, so the 3D scene never re-renders on scroll — just repaints.',
  },
]

export default function DesignNotes() {
  return (
    <section className="relative bg-void px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-12 font-display text-4xl text-mist sm:text-5xl">Notes from the build.</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {notes.map((n) => (
            <figure key={n.role} className="rounded-2xl border border-white/10 p-8">
              <blockquote className="text-sm leading-relaxed text-mist-dim">&ldquo;{n.quote}&rdquo;</blockquote>
              <figcaption className="mt-5 text-xs uppercase tracking-widest text-ember-soft">{n.role}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
