const items = ['NOVA', 'CONCEPT 001', 'BUILT IN CODE', 'REAL-TIME 3D', 'INTERACTIVE WEB']

export default function Marquee() {
  const track = [...items, ...items, ...items]
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-void py-5">
      <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
        {track.map((item, i) => (
          <span key={i} className="font-display text-sm tracking-[0.3em] text-mist-dim">
            {item} <span className="text-ember">•</span>
          </span>
        ))}
      </div>
    </div>
  )
}
