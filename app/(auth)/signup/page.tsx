'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { signUp } from '@/lib/auth/actions'
import type { SignUpData } from '@/lib/auth/actions'

/* ─── Types ──────────────────────────────────────────────────────────────── */

type DiabetesType = 'typ1' | 'typ2'

interface FormFields {
  email: string
  password: string
  confirmPassword: string
  diabetesType: DiabetesType | ''
}

interface FormErrors {
  email?: string
  password?: string
  confirmPassword?: string
  diabetesType?: string
}

/* ─── Validation ─────────────────────────────────────────────────────────── */

function validate(fields: FormFields): FormErrors {
  const errors: FormErrors = {}

  if (!fields.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = 'Bitte gib eine gültige E-Mail-Adresse ein.'
  }
  if (!fields.password || fields.password.length < 8) {
    errors.password = 'Das Passwort muss mindestens 8 Zeichen lang sein.'
  }
  if (!fields.confirmPassword || fields.confirmPassword !== fields.password) {
    errors.confirmPassword = 'Die Passwörter stimmen nicht überein.'
  }
  if (!fields.diabetesType) {
    errors.diabetesType = 'Bitte wähle deinen Diabetes-Typ.'
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

export default function SignUpPage() {
  const [fields, setFields] = useState<FormFields>({
    email: '',
    password: '',
    confirmPassword: '',
    diabetesType: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [serverError, setServerError] = useState<string | undefined>()
  const [success, setSuccess] = useState(false)
  const [isPending, startTransition] = useTransition()

  function setField<K extends keyof FormFields>(key: K, value: FormFields[K]) {
    setFields((prev) => ({ ...prev, [key]: value }))
  }

  function handleBlur(field: keyof FormErrors) {
    const fieldErrors = validate(fields)
    setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }))
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fieldErrors = validate(fields)
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors)
      return
    }
    setErrors({})
    setServerError(undefined)

    startTransition(async () => {
      const result = await signUp(fields as SignUpData)
      if (result.success) {
        setSuccess(true)
      } else {
        setServerError(result.error)
      }
    })
  }

  /* ── Success state ─────────────────────────────────────────────────────── */
  if (success) {
    return (
      <div className="text-center py-4">
        <div
          className="w-12 h-12 rounded-full bg-brand-light flex items-center justify-center text-2xl mx-auto mb-4"
          aria-hidden="true"
        >
          ✅
        </div>
        <h1 className="text-2xl font-bold text-ds-dark mb-2">
          Fast geschafft!
        </h1>
        <p className="text-ds-mid leading-relaxed">
          Wir haben dir eine Bestätigungs-E-Mail geschickt. Klick auf den Link,
          um dein Konto zu aktivieren.
        </p>
      </div>
    )
  }

  /* ── Form ──────────────────────────────────────────────────────────────── */
  return (
    <>
      <h1 className="text-2xl font-bold text-ds-dark mb-1">Konto erstellen</h1>
      <p className="text-ds-mid mb-8">Starte deinen kostenlosen Testmonat</p>

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
            value={fields.email}
            onChange={(e) => setField('email', e.target.value)}
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
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-ds-dark mb-1.5"
          >
            Passwort
          </label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            value={fields.password}
            onChange={(e) => setField('password', e.target.value)}
            onBlur={() => handleBlur('password')}
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? 'password-error' : undefined}
            disabled={isPending}
            placeholder="Mindestens 8 Zeichen"
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

        {/* Passwort bestätigen */}
        <div className="mb-5">
          <label
            htmlFor="confirm-password"
            className="block text-sm font-semibold text-ds-dark mb-1.5"
          >
            Passwort bestätigen
          </label>
          <input
            id="confirm-password"
            type="password"
            autoComplete="new-password"
            value={fields.confirmPassword}
            onChange={(e) => setField('confirmPassword', e.target.value)}
            onBlur={() => handleBlur('confirmPassword')}
            aria-invalid={!!errors.confirmPassword}
            aria-describedby={
              errors.confirmPassword ? 'confirm-password-error' : undefined
            }
            disabled={isPending}
            placeholder="Passwort wiederholen"
            className={`w-full px-4 py-3 rounded-xl border text-ds-dark placeholder:text-ds-light focus:outline-none focus:ring-2 focus:ring-brand transition ${
              errors.confirmPassword
                ? 'border-red-500 bg-red-50'
                : 'border-ds-border bg-white'
            }`}
          />
          {errors.confirmPassword && (
            <p
              id="confirm-password-error"
              className="mt-1.5 text-sm text-red-500"
            >
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Diabetes-Typ */}
        <div className="mb-7">
          <p
            id="diabetes-type-label"
            className="text-sm font-semibold text-ds-dark mb-1.5"
          >
            Diabetes-Typ
          </p>
          <div
            role="group"
            aria-labelledby="diabetes-type-label"
            aria-describedby={
              errors.diabetesType ? 'diabetes-type-error' : undefined
            }
            className="grid grid-cols-2 gap-3"
          >
            {(['typ1', 'typ2'] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setField('diabetesType', type)}
                disabled={isPending}
                aria-pressed={fields.diabetesType === type}
                className={`py-3 rounded-xl border-2 font-semibold transition ${
                  fields.diabetesType === type
                    ? 'bg-brand border-brand text-white'
                    : 'bg-white border-ds-border text-ds-dark hover:border-brand'
                }`}
              >
                {type === 'typ1' ? 'Typ 1' : 'Typ 2'}
              </button>
            ))}
          </div>
          {errors.diabetesType && (
            <p
              id="diabetes-type-error"
              className="mt-1.5 text-sm text-red-500"
            >
              {errors.diabetesType}
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
              Wird registriert…
            </>
          ) : (
            'Kostenlos registrieren →'
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-ds-mid">
        Bereits registriert?{' '}
        <Link
          href="/login"
          className="text-brand font-semibold hover:underline"
        >
          Anmelden →
        </Link>
      </p>
    </>
  )
}
