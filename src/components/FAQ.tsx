import { useState } from 'react'

const faqs = [
  {
    q: 'Is NOVA a real product I can buy?',
    a: 'No. NOVA is a concept project built to demonstrate interactive 3D web development — real-time rendering, scroll-driven animation, and a live material configurator. There is no shoe.',
  },
  {
    q: 'What is this site actually built with?',
    a: 'React, TypeScript, Three.js via React Three Fiber, and GSAP for scroll choreography, deployed on Vercel. The shoe itself is a glTF model with three baked-in color variants swapped live on the GPU.',
  },
  {
    q: 'Can I hire whoever built this?',
    a: 'Yes — that’s the point of this page. Check the footer for a link to get in touch about interactive sites, 3D product configurators, or landing pages like this one.',
  },
  {
    q: 'Can I reuse this code?',
    a: 'The site code is available on GitHub. The 3D shoe model is a Khronos glTF sample asset (© Shopify, CC BY 4.0) — credit it if you reuse it elsewhere.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="relative bg-cosmic px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-12 font-display text-4xl text-mist sm:text-5xl">Questions.</h2>
        <div className="divide-y divide-white/10 border-y border-white/10">
          {faqs.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-6 text-left"
                >
                  <span className="font-display text-base text-mist sm:text-lg">{item.q}</span>
                  <span
                    className={`shrink-0 text-2xl text-ember transition-transform ${isOpen ? 'rotate-45' : ''}`}
                  >
                    +
                  </span>
                </button>
                {isOpen && <p className="pb-6 text-sm leading-relaxed text-mist-dim">{item.a}</p>}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
