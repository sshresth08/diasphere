'use client'

import { useState } from 'react'
import BackButton from '@/src/components/ui/BackButton'
import { LEBENSMITTEL, type Lebensmittel } from '@/src/lib/data/lebensmittel'

export default function RechnerPage() {
  const [selectedProduct, setSelectedProduct] = useState<Lebensmittel | null>(
    null,
  )
  const [zustand, setZustand] = useState<'roh' | 'gekocht'>('roh')
  const [gramm, setGramm] = useState<number>(100)
  const [customKH, setCustomKH] = useState<number>(0)

  const showZustandToggle =
    selectedProduct !== null &&
    selectedProduct.custom !== true &&
    selectedProduct.roh !== null &&
    selectedProduct.gekocht !== null

  const khPro100: number = (() => {
    if (!selectedProduct) return 0
    if (selectedProduct.custom === true) return customKH
    if (zustand === 'roh') return selectedProduct.roh ?? 0
    return selectedProduct.gekocht ?? selectedProduct.roh ?? 0
  })()

  const grammValue = isNaN(gramm) ? 0 : gramm
  const gesamtKH = (grammValue * khPro100) / 100

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <BackButton href="/dashboard" />
      <h1 className="text-[22px] font-bold text-ds-dark leading-snug mb-1">
        KH-Rechner
      </h1>
      <p className="text-sm text-ds-mid mb-6">
        Kohlenhydrate einfach berechnen
      </p>

      {/* Step 1: Produkt wählen */}
      <section className="mb-5">
        <p className="text-[11px] font-semibold text-ds-light uppercase tracking-widest mb-3">
          1. Produkt wählen
        </p>
        <div className="grid grid-cols-2 gap-2">
          {LEBENSMITTEL.map((item: Lebensmittel) => {
            const isActive = selectedProduct?.name === item.name
            return (
              <button
                key={item.name}
                type="button"
                onClick={() => {
                  setSelectedProduct(item)
                  setZustand('roh')
                  setCustomKH(0)
                }}
                className="py-3 px-3 rounded-xl border text-[14px] font-medium text-center transition-colors"
                style={
                  isActive
                    ? {
                        backgroundColor: '#EDE9FE',
                        borderColor: '#7C3AED',
                        color: '#7C3AED',
                      }
                    : {
                        backgroundColor: '#FFFFFF',
                        borderColor: '#E2E8F0',
                        color: '#4A5568',
                      }
                }
                aria-pressed={isActive}
              >
                {item.name}
              </button>
            )
          })}
        </div>
      </section>

      {/* Step 2: Zustand toggle (only if product has both roh + gekocht) */}
      {showZustandToggle && (
        <section className="mb-5">
          <p className="text-[11px] font-semibold text-ds-light uppercase tracking-widest mb-3">
            2. Zustand
          </p>
          <div
            className="flex rounded-[14px] p-1"
            style={{ backgroundColor: '#F7FAF9' }}
          >
            {(['roh', 'gekocht'] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setZustand(option)}
                className="flex-1 py-2 text-[14px] rounded-xl transition-all"
                style={
                  zustand === option
                    ? {
                        backgroundColor: '#FFFFFF',
                        color: '#7C3AED',
                        fontWeight: 700,
                        boxShadow: '0 1px 3px 0 rgba(0,0,0,0.10)',
                      }
                    : {
                        backgroundColor: 'transparent',
                        color: '#718096',
                        fontWeight: 500,
                      }
                }
              >
                {option === 'roh' ? 'Roh (Trocken)' : 'Gekocht'}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Custom KH input (only if product.custom is true) */}
      {selectedProduct?.custom === true && (
        <section className="mb-5">
          <label
            htmlFor="custom-kh"
            className="block text-[11px] font-semibold text-ds-light uppercase tracking-widest mb-3"
          >
            KH-Wert (pro 100g)
          </label>
          <input
            id="custom-kh"
            type="number"
            min={0}
            value={customKH}
            onChange={(e) =>
              setCustomKH(parseFloat(e.target.value) || 0)
            }
            className="w-full border rounded-xl px-4 py-3 text-[14px] text-ds-dark outline-none transition-colors"
            style={{ borderColor: '#E2E8F0' }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#7C3AED'
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#E2E8F0'
            }}
          />
        </section>
      )}

      {/* Step 3: Menge eingeben */}
      <section className="mb-6">
        <label
          htmlFor="gramm-input"
          className="block text-[11px] font-semibold text-ds-light uppercase tracking-widest mb-3"
        >
          3. Menge eingeben
        </label>
        <div className="relative">
          <input
            id="gramm-input"
            type="number"
            min={0}
            value={gramm}
            onChange={(e) => setGramm(parseFloat(e.target.value) || 0)}
            className="w-full border rounded-xl px-4 py-3 pr-20 text-[14px] text-ds-dark outline-none transition-colors"
            style={{ borderColor: '#E2E8F0' }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#7C3AED'
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#E2E8F0'
            }}
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[13px] text-ds-mid font-medium pointer-events-none select-none">
            Gramm
          </span>
        </div>
      </section>

      {/* Result */}
      <div
        className="rounded-[18px] p-6 text-center"
        style={{ backgroundColor: '#EDE9FE' }}
      >
        <p
          className="text-[11px] font-semibold uppercase tracking-widest mb-2"
          style={{ color: '#7C3AED' }}
        >
          Kohlenhydrate gesamt
        </p>
        <div className="flex items-baseline justify-center gap-1 mb-1">
          <span
            className="font-bold leading-none"
            style={{ fontSize: '48px', color: '#7C3AED' }}
          >
            {gesamtKH.toFixed(1)}
          </span>
          <span
            className="font-bold"
            style={{ fontSize: '22px', color: '#7C3AED' }}
          >
            g
          </span>
        </div>
        <p className="text-[12px] text-ds-mid">
          Basis: {khPro100}g KH / 100g
        </p>
      </div>
    </div>
  )
}
