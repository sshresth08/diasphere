import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "DiaSphere — Dein Leben mit Typ-1-Diabetes",
  description:
    "DiaSphere bündelt alles, was du als junger Typ-1-Diabetiker brauchst — verständlich, geprüft, auf einer Plattform.",
};

/* ─── Types ──────────────────────────────────────────────────────────────── */
interface FeatureCard {
  icon: string;
  title: string;
  description: string;
}

interface StepItem {
  number: string;
  title: string;
  description: string;
}

interface StatItem {
  value: string;
  label: string;
}

/* ─── Data ───────────────────────────────────────────────────────────────── */
const FEATURES: FeatureCard[] = [
  {
    icon: "🎓",
    title: "Wissen & Lernen",
    description:
      "Lernvideos, interaktive Quizze und Lesetexte — medizinisch geprüft und verständlich erklärt.",
  },
  {
    icon: "👥",
    title: "Community",
    description:
      "Vernetze dich mit anderen Betroffenen. Austausch auf Augenhöhe, keine Foren-Suche mehr.",
  },
  {
    icon: "🧮",
    title: "Alltagstools",
    description:
      "Diabetikerfreundliche Rezepte, KH-Rechner und ein Notfallscreen — immer griffbereit.",
  },
];

const STEPS: StepItem[] = [
  {
    number: "1",
    title: "Typ wählen",
    description: "Sag uns, ob du Typ-1 oder Typ-2 Diabetiker bist.",
  },
  {
    number: "2",
    title: "In deinem Tempo lernen",
    description:
      "Starte mit Videos, teste dein Wissen im Quiz oder lies die Grundlagen.",
  },
  {
    number: "3",
    title: "Vernetzen & wachsen",
    description:
      "Tausche dich in der Community aus und entdecke neue Rezepte.",
  },
];

const STATS: StatItem[] = [
  { value: "9,7 Mio.", label: "Diabetiker in Deutschland" },
  { value: "12 von 13", label: "Interviewten wollen DiaSphere nutzen" },
  { value: "9,99 €/Monat", label: "Nach kostenlosem Testmonat" },
];

const NAV_LINKS = ["Lernen", "Rezepte", "Community", "Notfall"] as const;

/* ─── Logo (shared) ──────────────────────────────────────────────────────── */
function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2.5"
      aria-label="DiaSphere — Startseite"
    >
      <span
        className="w-9 h-9 rounded-full bg-brand flex items-center justify-center text-base leading-none select-none"
        aria-hidden="true"
      >
        🩺
      </span>
      <span className="font-bold text-xl tracking-tight text-ds-dark">
        DiaSphere
      </span>
    </Link>
  );
}

/* ─── 1. Navbar ──────────────────────────────────────────────────────────── */
function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-ds-border">
      {/*
       * CSS-only hamburger toggle.
       * The <input> must appear before all peer-checked:* targets so the CSS
       * general sibling combinator (~) can reach them.
       */}
      <input
        id="nav-toggle"
        type="checkbox"
        className="peer sr-only"
        aria-hidden="true"
      />

      {/* Top bar */}
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Logo />

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-5">
          <a
            href="/login"
            className="text-ds-mid hover:text-brand font-medium transition-colors"
          >
            Log in
          </a>
          <a
            href="/signup"
            className="bg-brand hover:bg-brand-dark text-white font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            Get Started Free
          </a>
        </div>

        {/* Hamburger label — mobile only */}
        <label
          htmlFor="nav-toggle"
          className="md:hidden cursor-pointer w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Menü öffnen"
        >
          <svg
            width="22"
            height="16"
            viewBox="0 0 22 16"
            fill="none"
            aria-hidden="true"
          >
            <rect y="0" width="22" height="2.5" rx="1.25" fill="#0F1C17" />
            <rect y="6.75" width="22" height="2.5" rx="1.25" fill="#0F1C17" />
            <rect y="13.5" width="22" height="2.5" rx="1.25" fill="#0F1C17" />
          </svg>
        </label>
      </div>

      {/* Mobile dropdown — toggled by peer checkbox */}
      <div className="hidden peer-checked:flex flex-col md:hidden px-6 pb-5 gap-3 border-t border-ds-border bg-white">
        <a
          href="/login"
          className="py-2 text-ds-mid hover:text-brand font-medium transition-colors"
        >
          Log in
        </a>
        <a
          href="/signup"
          className="bg-brand hover:bg-brand-dark text-white font-semibold px-5 py-3 rounded-xl text-center transition-colors"
        >
          Get Started Free
        </a>
      </div>
    </header>
  );
}

/* ─── 2. Hero ────────────────────────────────────────────────────────────── */
function HeroSection() {
  return (
    <section
      className="relative overflow-hidden
        bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,#E8F8F2_0%,#F7FAF9_75%)]"
    >
      <div className="max-w-4xl mx-auto px-6 py-24 md:py-32 text-center animate-fade-in">
        {/* Eyebrow pill */}
        <span className="inline-flex items-center gap-1.5 bg-brand/10 text-brand text-sm font-semibold px-4 py-1.5 rounded-full mb-7">
          Built for Typ-1 Diabetiker
        </span>

        {/* H1 */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-ds-dark leading-tight mb-6">
          Your diabetes.{" "}
          <span className="text-brand">Your knowledge.</span>{" "}
          Your community.
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-ds-mid leading-relaxed max-w-2xl mx-auto mb-10">
          DiaSphere bündelt alles, was du als junger Typ-1-Diabetiker brauchst
          — verständlich, geprüft, auf einer Plattform.
        </p>

        {/* CTA row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <a
            href="/signup"
            className="w-full sm:w-auto bg-brand hover:bg-brand-dark text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors"
          >
            Jetzt kostenlos starten →
          </a>
          <a
            href="/signup"
            className="w-full sm:w-auto border-2 border-brand text-brand hover:bg-brand hover:text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors"
          >
            App ansehen
          </a>
        </div>

        {/* Trust disclaimer */}
        <p className="text-sm text-ds-light">
          ⚠️ DiaSphere ersetzt keinen Arztbesuch · Keine Insulindosierung ·
          Keine Fernbehandlung
        </p>
      </div>
    </section>
  );
}

/* ─── 3. Features ────────────────────────────────────────────────────────── */
function FeaturesSection() {
  return (
    <section className="bg-ds-bg py-24">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-brand font-semibold text-sm uppercase tracking-widest text-center mb-3">
          Was dich erwartet
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-ds-dark text-center mb-14">
          Alles, was du brauchst. An einem Ort.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map((card) => (
            <div
              key={card.title}
              className="bg-white border-[1.5px] border-ds-border rounded-[20px] p-8
                         hover:shadow-xl hover:border-brand transition-all duration-200 group"
            >
              <div
                className="w-12 h-12 rounded-full bg-brand-light flex items-center justify-center
                            text-2xl mb-6 group-hover:bg-brand/20 transition-colors"
                aria-hidden="true"
              >
                {card.icon}
              </div>
              <h3 className="font-bold text-xl text-ds-dark mb-3">
                {card.title}
              </h3>
              <p className="text-ds-mid leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 4. How It Works ────────────────────────────────────────────────────── */
function HowItWorksSection() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-ds-dark text-center mb-16">
          In 3 Schritten loslegen
        </h2>

        {/*
         * .how-it-works-steps adds a ::before dashed connector on desktop
         * via globals.css. `relative` is required for the pseudo-element.
         */}
        <div className="how-it-works-steps relative grid grid-cols-1 md:grid-cols-3 gap-10">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-full bg-brand flex items-center justify-center text-white font-bold text-xl mb-5 relative z-10">
                {step.number}
              </div>
              <h3 className="font-bold text-xl text-ds-dark mb-3">
                {step.title}
              </h3>
              <p className="text-ds-mid leading-relaxed max-w-xs">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 5. Social Proof Strip ──────────────────────────────────────────────── */
function SocialProofStrip() {
  return (
    <section className="bg-brand-light py-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-brand/20">
          {STATS.map((stat) => (
            <div key={stat.label} className="py-8 md:py-0 md:px-10 text-center">
              <p className="text-3xl md:text-4xl font-extrabold text-brand mb-2">
                {stat.value}
              </p>
              <p className="text-ds-mid font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 6. Footer ──────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="bg-ds-dark text-white">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {/* Left: logo + tagline */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span
                className="w-9 h-9 rounded-full bg-brand flex items-center justify-center text-base leading-none select-none"
                aria-hidden="true"
              >
                🩺
              </span>
              <span className="font-bold text-xl">DiaSphere</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Dein Begleiter im Alltag mit Diabetes
            </p>
          </div>

          {/* Center: nav links */}
          <nav
            className="flex flex-col gap-3 md:items-center"
            aria-label="Footer-Navigation"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`/${link.toLowerCase()}`}
                className="text-white/70 hover:text-white transition-colors font-medium"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Right: attribution */}
          <div className="md:text-right">
            <p className="text-white/70 text-sm">Made with ❤️ at TH Köln</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 text-center">
          <p className="text-white/40 text-xs">
            © 2025 DiaSphere · Kein Medizinprodukt im Sinne des MPG · Alle
            Inhalte dienen nur der Information
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <SocialProofStrip />
      </main>
      <Footer />
    </>
  );
}
