import { useEffect, useRef } from 'react'
import type { Variant } from './SneakerModel'
import { VARIANT_GLOW } from '../lib/variantColors'

type Props = {
  variant: Variant
}

export default function CursorGlow({ variant }: Props) {
  const dotRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: -200, y: -200 })
  const target = useRef({ x: -200, y: -200 })

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (isTouch) return

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX
      target.current.y = e.clientY
    }
    window.addEventListener('mousemove', onMove)

    let raf: number
    const loop = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15
      pos.current.y += (target.current.y - pos.current.y) * 0.15
      const el = dotRef.current
      if (el) {
        el.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-24 w-24 rounded-full blur-2xl transition-[background-color] duration-500 sm:block"
      style={{ backgroundColor: VARIANT_GLOW[variant], opacity: 0.5, mixBlendMode: 'screen' }}
    />
  )
}
