import { useState, type FormEvent } from 'react'

type Status = 'idle' | 'loading' | 'ok' | 'error'

export default function CTAFooter() {
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = new FormData(e.currentTarget).get('email')
    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      setStatus(data.ok ? 'ok' : 'error')
      setMessage(data.message)
    } catch {
      setStatus('error')
      setMessage('Could not reach the server — try again in a moment.')
    }
  }

  return (
    <footer id="footer" className="relative bg-cosmic px-6 py-28 text-center sm:py-36">
      <h2 className="mb-6 font-display text-4xl text-gradient sm:text-6xl">Get notified.</h2>
      <p className="mx-auto mb-10 max-w-md text-mist-dim">
        NOVA is a concept project — this drop isn't for sale. Leave an email and a real Go serverless function will
        validate it (nothing is stored).
      </p>
      <form onSubmit={handleSubmit} className="mx-auto flex max-w-sm flex-col gap-3 sm:flex-row">
        <input
          name="email"
          type="email"
          required
          placeholder="you@email.com"
          className="flex-1 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm text-mist outline-none placeholder:text-mist-dim focus:border-ember"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="rounded-full bg-ember px-6 py-3 text-sm font-semibold text-void transition-colors hover:bg-ember-soft disabled:opacity-60"
        >
          {status === 'loading' ? 'Sending…' : 'Notify Me'}
        </button>
      </form>
      {message && (
        <p className={`mt-4 text-sm ${status === 'ok' ? 'text-ember-soft' : 'text-red-400'}`}>{message}</p>
      )}

      <div className="mt-24 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-mist-dim sm:flex-row">
        <span>© {new Date().getFullYear()} NOVA — a concept project.</span>
        <span>
          Designed &amp; built by{' '}
          <a
            href="https://github.com/YASH-KID"
            target="_blank"
            rel="noreferrer"
            className="text-mist transition-colors hover:text-ember"
          >
            Yash Malhotra
          </a>
        </span>
      </div>
      <p className="mx-auto mt-6 max-w-lg text-[11px] leading-relaxed text-mist-dim/70">
        3D shoe model: &ldquo;Materials Variants Shoe&rdquo;, © 2020 Shopify, Inc., licensed under{' '}
        <a
          href="https://creativecommons.org/licenses/by/4.0/"
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-mist"
        >
          CC BY 4.0
        </a>
        , via the Khronos glTF Sample Assets.
      </p>
    </footer>
  )
}
