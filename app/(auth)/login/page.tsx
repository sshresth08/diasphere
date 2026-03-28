'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { signIn } from '@/lib/auth/actions'
import type { SignInData } from '@/lib/auth/actions'

/* ─── Types ──────────────────────────────────────────────────────────────── */

interface FormErrors {
  email?: string
  password?: string
}

/* ─── Validation ─────────────────────────────────────────────────────────── */

function validate(fields: SignInData): FormErrors {
  const errors: FormErrors = {}

  if (!fields.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = 'Bitte gib eine gültige E-Mail-Adresse ein.'
  }
  if (!fields.password) {
    errors.password = 'Bitte gib dein Passwort ein.'
  }

  return errors
}

/* ─── Spinner ────────────────────────────────────────────────────────────── */

function Spinner() {
  return (
    <svg
      className="animate-spin h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  )
}

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [serverError, setServerError] = useState<string | undefined>()
  const [isPending, startTransition] = useTransition()

  function handleBlur(field: keyof FormErrors) {
    const fieldErrors = validate({ email, password })
    setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }))
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fieldErrors = validate({ email, password })
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors)
      return
    }
    setErrors({})
    setServerError(undefined)

    startTransition(async () => {
      const result = await signIn({ email, password })
      // signIn redirects to /dashboard on success; result is only returned on failure
      if (!result.success) {
        setServerError(result.error)
      }
    })
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-ds-dark mb-1">
        Willkommen zurück
      </h1>
      <p className="text-ds-mid mb-8">
        Meld dich an und mach weiter, wo du aufgehört hast
      </p>

      <form onSubmit={handleSubmit} noValidate>
        {/* E-Mail */}
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-ds-dark mb-1.5"
          >
            E-Mail-Adresse
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => handleBlur('email')}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            disabled={isPending}
            placeholder="deine@email.de"
            className={`w-full px-4 py-3 rounded-xl border text-ds-dark placeholder:text-ds-light focus:outline-none focus:ring-2 focus:ring-brand transition ${
              errors.email
                ? 'border-red-500 bg-red-50'
                : 'border-ds-border bg-white'
            }`}
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-sm text-red-500">
              {errors.email}
            </p>
          )}
        </div>

        {/* Passwort */}
        <div className="mb-7">
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-ds-dark"
            >
              Passwort
            </label>
            <Link
              href="/forgot-password"
              className="text-sm text-brand hover:underline"
            >
              Passwort vergessen?
            </Link>
          </div>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => handleBlur('password')}
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? 'password-error' : undefined}
            disabled={isPending}
            placeholder="Dein Passwort"
            className={`w-full px-4 py-3 rounded-xl border text-ds-dark placeholder:text-ds-light focus:outline-none focus:ring-2 focus:ring-brand transition ${
              errors.password
                ? 'border-red-500 bg-red-50'
                : 'border-ds-border bg-white'
            }`}
          />
          {errors.password && (
            <p id="password-error" className="mt-1.5 text-sm text-red-500">
              {errors.password}
            </p>
          )}
        </div>

        {/* Server-Fehler */}
        {serverError && (
          <p
            role="alert"
            className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600 text-center"
          >
            {serverError}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-brand hover:bg-brand-dark text-white font-bold py-3.5 rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isPending ? (
            <>
              <Spinner />
              Wird angemeldet…
            </>
          ) : (
            'Anmelden →'
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-ds-mid">
        Noch kein Konto?{' '}
        <Link
          href="/signup"
          className="text-brand font-semibold hover:underline"
        >
          Jetzt registrieren →
        </Link>
      </p>
    </>
  )
}
