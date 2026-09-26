import { useEffect, useRef } from 'react'

type StarfieldExports = {
  memory: WebAssembly.Memory
  init: (count: number, width: number, height: number, seed: number) => number
  tick: (dt: number, elapsed: number) => void
  resize: (width: number, height: number) => void
}

const STAR_COUNT = 220

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let cancelled = false
    let exportsRef: StarfieldExports | null = null
    let ptr = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      const { clientWidth, clientHeight } = canvas
      canvas.width = clientWidth * dpr
      canvas.height = clientHeight * dpr
      exportsRef?.resize(clientWidth, clientHeight)
    }

    WebAssembly.instantiateStreaming(fetch('/wasm/starfield.wasm'), {}).then(({ instance }) => {
      if (cancelled) return
      const wasmExports = instance.exports as unknown as StarfieldExports
      exportsRef = wasmExports
      const { clientWidth, clientHeight } = canvas
      ptr = wasmExports.init(STAR_COUNT, clientWidth, clientHeight, Date.now() >>> 0)
      resize()

      let last = performance.now()
      const loop = (now: number) => {
        const dt = Math.min((now - last) / 1000, 0.05)
        last = now
        wasmExports.tick(dt, now / 1000)

        const data = new Float32Array(wasmExports.memory.buffer, ptr, STAR_COUNT * 4)
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
        for (let i = 0; i < STAR_COUNT; i++) {
          const base = i * 4
          const x = data[base]
          const y = data[base + 1]
          const size = data[base + 2]
          const alpha = data[base + 3]
          ctx.beginPath()
          ctx.fillStyle = `rgba(245, 242, 234, ${alpha * 0.8})`
          ctx.arc(x, y, size, 0, Math.PI * 2)
          ctx.fill()
        }
        raf = requestAnimationFrame(loop)
      }
      raf = requestAnimationFrame(loop)
    })

    const onResize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      resize()
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelled = true
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" />
}
