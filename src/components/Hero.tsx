import { Suspense, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SneakerModel, { type Variant } from './SneakerModel'
import Starfield from './Starfield'

gsap.registerPlugin(ScrollTrigger)

type Props = {
  variant: Variant
}

export default function Hero({ variant }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const scrollProgress = useRef(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6,
        onUpdate: (self) => {
          scrollProgress.current = self.progress
        },
      })

      gsap.to(headlineRef.current, {
        opacity: 0,
        y: -60,
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          end: '30% top',
          scrub: 0.6,
        },
      })
    }, wrapperRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapperRef} className="relative h-[220vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-cosmic">
        <Starfield />
        <Canvas
          shadows
          dpr={[1, 1.5]}
          camera={{ position: [0, 0.55, 4.2], fov: 32 }}
          className="!absolute inset-0"
        >
          <ambientLight intensity={0.7} />
          <directionalLight position={[3, 4, 2]} intensity={1.5} castShadow />
          <directionalLight position={[-3, 2, -2]} intensity={0.4} color="#a855f7" />
          <Suspense fallback={null}>
            <SneakerModel scrollProgress={scrollProgress} variant={variant} />
            <Environment preset="city" environmentIntensity={0.6} />
            <ContactShadows position={[0, -0.95, 0]} opacity={0.5} blur={2.4} far={2.5} />
          </Suspense>
        </Canvas>

        <div
          ref={headlineRef}
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        >
          <span className="mb-4 font-body text-xs uppercase tracking-[0.4em] text-ember-soft">
            Concept Drop 001
          </span>
          <h1 className="font-display text-[16vw] leading-[0.85] text-gradient sm:text-[11vw] md:text-[8vw]">
            NOVA
          </h1>
          <p className="mt-6 max-w-md text-sm text-mist-dim sm:text-base">
            Move your cursor. Scroll to explore. A real-time 3D product page, built entirely in code.
          </p>
        </div>

        <div className="animate-float absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-widest text-mist-dim">
          Scroll ↓
        </div>
      </div>
    </div>
  )
}
