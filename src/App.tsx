import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  PhoneCall,
  WhatsappLogo,
  MapPin,
  EnvelopeSimple,
  ArrowUpRight,
  CheckCircle,
  ShieldCheck,
  Play,
  MagnifyingGlassPlus,
  X,
  CaretDown,
  List,
  Sparkle,
  CompassTool,
  Truck,
  Certificate,
  Gauge,
  Clock,
  Buildings,
  FileText,
  InstagramLogo,
  FacebookLogo,
  YoutubeLogo,
  ArrowRight,
  SlidersHorizontal,
  BookOpenText,
} from "@phosphor-icons/react";
import { ManometerIcon, InteractiveMiniIcon } from "./components/ManometerIcon";
import { InteractiveFireSimulator } from "./components/InteractiveFireSimulator";
import {
  COMPANY,
  HERO_SLIDES,
  QUICK_TRIAGE_ITEMS,
  SERVICES,
  PRODUCTS,
  REAL_GALLERY,
  TECHNICAL_PILLARS,
  PROCESS_STEPS,
  FAQ_ITEMS,
  SEO_TECHNICAL_INDEX,
  CLIENT_SECTORS,
  buildWhatsAppUrl,
  trackLeadConversion,
  assetUrl,
  type GalleryItem,
} from "./data/extinSevenData";

/**
 * Animated number counter triggered when scrolled into view.
 */
const CountUpMetric: React.FC<{
  end: number;
  suffix?: string;
  prefix?: string;
  label: string;
  sublabel: string;
}> = ({ end, suffix = "", prefix = "", label, sublabel }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1200;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = end / steps;

    const timer = window.setInterval(() => {
      start += increment;
      if (start >= end) {
        setVal(end);
        window.clearInterval(timer);
      } else {
        setVal(Math.floor(start));
      }
    }, stepTime);

    return () => window.clearInterval(timer);
  }, [inView, end]);

  return (
    <div
      ref={ref}
      className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-panel transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-500/40"
    >
      <div className="flex items-baseline gap-1 font-mono text-3xl font-extrabold tracking-tight text-obsidian-950 sm:text-4xl">
        <span className="text-brand-600">{prefix}</span>
        <span>{val}</span>
        <span className="text-brand-600">{suffix}</span>
      </div>
      <div className="mt-1.5 font-display text-sm font-bold text-obsidian-900">{label}</div>
      <div className="mt-0.5 font-mono text-[11px] text-slate-500">{sublabel}</div>
    </div>
  );
};

export function App() {
  // Hero slider state
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);

  // Navigation & mobile drawer
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Services filter state
  const [serviceCategory, setServiceCategory] = useState<"todos" | "manutencao" | "gestao" | "engenharia">("todos");

  // Products filter state
  const [productCategory, setProductCategory] = useState<"todos" | "combate" | "alarme" | "sinalizacao">("todos");

  // Institutional video modal / inline play
  const [videoPlaying, setVideoPlaying] = useState(false);

  // Gallery Lightbox state
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  // FAQ accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number>(0);

  // SEO Technical Index Drawer/Modal state
  const [seoModalOpen, setSeoModalOpen] = useState(false);
  const [seoSearch, setSeoSearch] = useState("");

  // Lead Form state
  const [leadName, setLeadName] = useState("");
  const [leadCompany, setLeadCompany] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadCity, setLeadCity] = useState("Jundiaí / Região");
  const [leadNeed, setLeadNeed] = useState("Manutenção e Recarga de Extintores (INMETRO)");
  const [leadNotes, setLeadNotes] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Scroll listener for sticky header elevation
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-advance hero slides unless hovered
  useEffect(() => {
    if (heroPaused) return;
    const timer = window.setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7500);
    return () => window.clearInterval(timer);
  }, [heroPaused]);

  const currentSlide = HERO_SLIDES[activeSlideIndex];

  const filteredServices =
    serviceCategory === "todos"
      ? SERVICES
      : SERVICES.filter((s) => s.category === serviceCategory);

  const filteredProducts =
    productCategory === "todos"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === productCategory);

  const handleLeadFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      "Olá! Solicito orçamento técnico pelo site da *Extin Seven*:",
      `• *Nome:* ${leadName || "Não informado"}`,
      `• *Empresa/Condomínio:* ${leadCompany || "Não informado"}`,
      `• *Telefone/WhatsApp:* ${leadPhone || "Não informado"}`,
      `• *Cidade/Unidade:* ${leadCity}`,
      `• *Escopo Principal:* ${leadNeed}`,
      leadNotes ? `• *Detalhes Técnicos:* ${leadNotes}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    trackLeadConversion(`Formulário Técnico: ${leadNeed}`, "form");
    setFormSubmitted(true);
    window.open(buildWhatsAppUrl(lines), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] text-obsidian-900 selection:bg-brand-600 selection:text-white">
      {/* =====================================================================
          1. TECHNICAL TELEMETRY TOPBAR
      ====================================================================== */}
      <div className="border-b border-white/10 bg-obsidian-950 text-xs text-slate-300">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-2.5 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold text-gauge-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gauge-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gauge-500" />
              </span>
              SEDE & FROTA PRÓPRIA • INMETRO / ABNT / IT-20
            </span>
            <span className="hidden items-center gap-1.5 text-slate-400 md:inline-flex">
              <InteractiveMiniIcon icon={MapPin} size={14} variant="bounce" className="text-brand-400" />
              <span>{COMPANY.address.full}</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`mailto:${COMPANY.email}`}
              className="hidden items-center gap-1.5 text-slate-300 transition-colors hover:text-white lg:inline-flex"
            >
              <InteractiveMiniIcon icon={EnvelopeSimple} size={14} variant="pulse" className="text-brand-400" />
              <span className="font-mono">{COMPANY.email}</span>
            </a>

            <button
              type="button"
              onClick={() => setSeoModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-2.5 py-1 font-mono text-[11px] font-semibold text-slate-200 transition-colors hover:border-brand-400 hover:text-white"
            >
              <InteractiveMiniIcon icon={BookOpenText} size={14} variant="spark" className="text-brand-400" />
              <span>Índice Técnico (48 Soluções)</span>
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          2. STICKY HEADER NAVIGATION
      ====================================================================== */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "border-b border-white/10 bg-obsidian-950/95 py-3 shadow-2xl backdrop-blur-xl"
            : "border-b border-white/10 bg-obsidian-900/95 py-4 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <a
            href="#topo"
            className="group flex items-center gap-3.5 focus:outline-none"
            aria-label="Extin Seven — Página Inicial"
          >
            <div className="relative flex h-12 items-center rounded-xl bg-white px-3 py-1.5 shadow-md transition-transform duration-300 group-hover:scale-[1.03]">
              <img
                src={assetUrl("/images/logo.png")}
                alt="Logo Extin Seven Soluções em Segurança Contra Incêndio"
                className="h-9 w-auto object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <div className="font-display text-base font-extrabold tracking-tight text-white">
                EXTIN SEVEN
              </div>
              <div className="font-mono text-[10px] font-semibold uppercase tracking-widest text-brand-400">
                Engenharia Contra Incêndio
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-1 xl:flex" aria-label="Navegação Principal">
            {[
              { href: "#servicos", label: "Serviços (10)" },
              { href: "#engenharia-interativa", label: "Simulador CAD & NR-23" },
              { href: "#empresa", label: "Sede & Frota" },
              { href: "#produtos", label: "Catálogo & LITH-EX" },
              { href: "#obras-reais", label: "Obras em Campo" },
              { href: "#faq", label: "Dúvidas" },
              { href: "#orcamento", label: "Contato" },
            ].map((nav) => (
              <a
                key={nav.href}
                href={nav.href}
                className="rounded-xl px-3.5 py-2 text-sm font-semibold text-slate-200 transition-colors hover:bg-white/10 hover:text-white"
              >
                {nav.label}
              </a>
            ))}
          </nav>

          {/* Header Direct Action Buttons */}
          <div className="flex items-center gap-2.5">
            <a
              href={COMPANY.phoneTel}
              onClick={() => trackLeadConversion("Header Telefone Fixo", "phone")}
              className="hidden items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 font-mono text-xs font-bold text-white transition-all hover:border-white/30 hover:bg-white/10 md:inline-flex"
            >
              <InteractiveMiniIcon icon={PhoneCall} size={16} weight="duotone" variant="rotate" className="text-brand-400" />
              <span>{COMPANY.phoneDisplay}</span>
            </a>

            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackLeadConversion("Header Botão WhatsApp", "whatsapp")}
              className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-crimson transition-all hover:bg-brand-500 sm:text-sm"
            >
              <InteractiveMiniIcon icon={WhatsappLogo} size={18} weight="fill" variant="bounce" />
              <span>Orçamento Rápido</span>
            </a>

            {/* Mobile Menu Trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Abrir menu de navegação"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white xl:hidden"
            >
              {mobileMenuOpen ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-t border-white/10 bg-obsidian-950 px-4 pb-5 pt-3 xl:hidden"
            >
              <div className="grid gap-1.5">
                {[
                  { href: "#servicos", label: "10 Serviços Especializados (INMETRO / ABNT)" },
                  { href: "#engenharia-interativa", label: "Simulador de Planta CAD & Sistema On-line" },
                  { href: "#empresa", label: "Sede Própria em Jundiaí & Vídeo Institucional" },
                  { href: "#produtos", label: "Catálogo: Extintores LITH-EX, Alarmes Wireless & IT-20" },
                  { href: "#obras-reais", label: "Galeria de Instalações Reais Executadas" },
                  { href: "#faq", label: "Perguntas Frequentes (Normas & Prazos)" },
                  { href: "#orcamento", label: "Solicitar Orçamento ou Levantamento Técnico" },
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-200 hover:bg-white/10 hover:text-white"
                  >
                    <span>{item.label}</span>
                    <ArrowRight size={15} className="text-brand-400" />
                  </a>
                ))}
              </div>
              <div className="mt-4 flex flex-col gap-2 border-t border-white/10 pt-4 sm:flex-row">
                <a
                  href={COMPANY.phoneTel}
                  onClick={() => trackLeadConversion("Mobile Menu Telefone", "phone")}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 py-3 font-mono text-xs font-bold text-white"
                >
                  <PhoneCall size={17} className="text-brand-400" />
                  <span>Ligar: {COMPANY.phoneDisplay}</span>
                </a>
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackLeadConversion("Mobile Menu WhatsApp", "whatsapp")}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gauge-600 py-3 text-xs font-bold text-white"
                >
                  <WhatsappLogo size={18} weight="fill" />
                  <span>WhatsApp: {COMPANY.whatsappDisplay}</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* =====================================================================
          3. MULTI-SLIDE INTERACTIVE HERO SECTION
      ====================================================================== */}
      <section
        id="topo"
        onMouseEnter={() => setHeroPaused(true)}
        onMouseLeave={() => setHeroPaused(false)}
        className="relative overflow-hidden bg-obsidian-950 pb-20 pt-10 text-white lg:pb-28 lg:pt-16"
      >
        {/* Industrial CAD Grid & Ambient Glow */}
        <div className="pointer-events-none absolute inset-0 bg-blueprint-dark opacity-80" />
        <div className="pointer-events-none absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-brand-600/20 blur-[140px]" />
        <div className="pointer-events-none absolute bottom-0 right-10 h-80 w-80 rounded-full bg-gauge-500/10 blur-[130px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Interactive Hero Slide Selector Tabs */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="flex flex-wrap gap-2">
              {HERO_SLIDES.map((slide, idx) => {
                const isActive = idx === activeSlideIndex;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setActiveSlideIndex(idx)}
                    className={`group relative inline-flex items-center gap-2.5 rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                      isActive
                        ? "bg-white/12 text-white ring-1 ring-brand-500"
                        : "bg-white/[0.03] text-slate-400 hover:bg-white/[0.07] hover:text-slate-200"
                    }`}
                  >
                    <span
                      className={`font-mono text-[11px] ${
                        isActive ? "text-brand-400" : "text-slate-500"
                      }`}
                    >
                      0{idx + 1}
                    </span>
                    <span>{slide.badge.split("•")[0]}</span>
                    {isActive && (
                      <motion.span
                        layoutId="heroSlideIndicator"
                        className="h-1.5 w-1.5 rounded-full bg-gauge-400"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="hidden items-center gap-2 font-mono text-xs text-slate-400 lg:flex">
              <InteractiveMiniIcon icon={Gauge} size={16} variant="rotate" className="text-gauge-400" />
              <span>NORMA EM FOCO:</span>
              <span className="rounded bg-white/10 px-2 py-0.5 font-bold text-white">
                {currentSlide.normCode}
              </span>
            </div>
          </div>

          {/* Main Hero Split Layout */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12"
            >
              {/* Left 7 Columns: Copy, Telemetry & CTAs */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2.5 rounded-full border border-brand-500/35 bg-brand-600/15 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-200">
                  <span className="h-2 w-2 rounded-full bg-brand-500" />
                  <span>{currentSlide.badge}</span>
                </div>

                <h1 className="mt-5 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-[3.55rem] lg:leading-[1.06]">
                  {currentSlide.title}{" "}
                  <span className="text-gradient-crimson">{currentSlide.highlight}</span>
                </h1>

                <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
                  {currentSlide.description}
                </p>

                {/* Primary & Secondary CTAs */}
                <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center">
                  <a
                    href={buildWhatsAppUrl(currentSlide.whatsappPrompt)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackLeadConversion(`Hero CTA: ${currentSlide.ctaPrimary}`, "whatsapp")
                    }
                    className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-brand-600 px-7 py-4 text-sm font-extrabold uppercase tracking-wider text-white shadow-crimson transition-all hover:-translate-y-0.5 hover:bg-brand-500"
                  >
                    <InteractiveMiniIcon icon={WhatsappLogo} size={21} weight="fill" variant="bounce" />
                    <span>{currentSlide.ctaPrimary}</span>
                    <InteractiveMiniIcon icon={ArrowUpRight} size={18} variant="nudge" />
                  </a>

                  <a
                    href="#engenharia-interativa"
                    className="inline-flex items-center justify-center gap-2.5 rounded-2xl border border-white/20 bg-white/5 px-6 py-4 text-sm font-bold text-white backdrop-blur-sm transition-all hover:border-gauge-400/60 hover:bg-white/10"
                  >
                    <InteractiveMiniIcon icon={CompassTool} size={19} variant="rotate" className="text-gauge-400" />
                    <span>Testar Simulador de Planta & NR-23</span>
                  </a>
                </div>

                {/* Live Telemetry Strip with Interactive Manometer Icons */}
                <div className="mt-10 grid grid-cols-1 gap-3.5 sm:grid-cols-3">
                  {currentSlide.telemetry.map((item, i) => (
                    <div
                      key={item.label}
                      className="group flex items-center gap-3.5 rounded-2xl border border-white/10 bg-obsidian-900/90 p-3.5 backdrop-blur-md transition-colors hover:border-brand-500/40"
                    >
                      <ManometerIcon
                        icon={i === 0 ? Gauge : i === 1 ? ShieldCheck : Certificate}
                        variant={i === 0 ? "pressure" : i === 1 ? "radar" : "stamp"}
                        tone={i === 0 ? "emerald" : i === 1 ? "crimson" : "amber"}
                        size="sm"
                        pressureLabel={item.value}
                      />
                      <div>
                        <div className="font-mono text-base font-extrabold text-white">
                          {item.value}
                        </div>
                        <div className="text-xs font-semibold text-slate-300">{item.label}</div>
                        <div className="font-mono text-[10px] text-slate-400">{item.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right 5 Columns: Authentic Extin Seven Photo + Interactive Pressure Overlay */}
              <div className="lg:col-span-5">
                <div className="relative mx-auto max-w-lg lg:max-w-none">
                  {/* Decorative Technical Frame */}
                  <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-obsidian-900 p-2.5 shadow-2xl">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-obsidian-950">
                      <img
                        src={assetUrl(currentSlide.image)}
                        alt={currentSlide.imageAlt}
                        className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/20 to-transparent" />

                      {/* Top-Left Authentic Photo Verification Badge */}
                      <div className="absolute left-3.5 top-3.5 inline-flex items-center gap-2 rounded-xl border border-white/20 bg-obsidian-950/85 px-3 py-1.5 font-mono text-[11px] font-bold text-gauge-300 backdrop-blur-md">
                        <span className="h-2 w-2 rounded-full bg-gauge-400" />
                        <span>ACERVO REAL EXTIN SEVEN • JUNDIAÍ/SP</span>
                      </div>

                      {/* Bottom Caption Overlay */}
                      <div className="absolute inset-x-3.5 bottom-3.5 rounded-xl border border-white/10 bg-obsidian-950/90 p-3.5 backdrop-blur-md">
                        <p className="text-xs leading-relaxed text-slate-200">
                          {currentSlide.imageCaption}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Floating Client Sectors Strip below photo */}
                  <div className="mt-4 grid grid-cols-2 gap-2.5">
                    {CLIENT_SECTORS.slice(0, 2).map((sector) => (
                      <div
                        key={sector.label}
                        className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-obsidian-900/90 px-3.5 py-2.5"
                      >
                        <ManometerIcon
                          icon={sector.icon}
                          variant={sector.variant}
                          tone="light"
                          size="sm"
                          pressureLabel="ATENDIDO"
                        />
                        <span className="text-xs font-semibold text-slate-200">{sector.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* =====================================================================
          4. QUICK TRIAGE BAR ("QUAL É A SUA URGÊNCIA HOJE?")
      ====================================================================== */}
      <section className="relative z-20 -mt-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-panel sm:p-8">
          <div className="flex flex-col justify-between gap-3 border-b border-slate-100 pb-5 md:flex-row md:items-center">
            <div className="flex items-center gap-3">
              <ManometerIcon icon={SlidersHorizontal} variant="pressure" tone="crimson" size="sm" />
              <div>
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-brand-600">
                  TRIAGEM RÁPIDA DE ENGENHARIA & MANUTENÇÃO
                </span>
                <h2 className="font-display text-lg font-extrabold text-obsidian-950 sm:text-xl">
                  Qual é a necessidade prioritária da sua empresa ou condomínio hoje?
                </h2>
              </div>
            </div>
            <span className="font-mono text-xs text-slate-500">
              Clique nos ícones para testar a pressão ou acione o atendimento direto →
            </span>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {QUICK_TRIAGE_ITEMS.map((item) => (
              <div
                key={item.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-[#F8FAFC] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/50 hover:bg-white hover:shadow-xl"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <ManometerIcon
                      icon={item.icon}
                      variant={item.variant}
                      tone={item.tone}
                      size="md"
                      pressureLabel={item.norm}
                    />
                    <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-obsidian-800">
                      {item.urgencyTag}
                    </span>
                  </div>

                  <div className="mt-4 font-mono text-[11px] font-bold text-brand-600">
                    {item.norm}
                  </div>
                  <h3 className="mt-1 font-display text-base font-extrabold text-obsidian-950">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">{item.subtitle}</p>
                </div>

                <a
                  href={buildWhatsAppUrl(item.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackLeadConversion(`Triagem: ${item.title}`, "whatsapp")}
                  className="mt-5 inline-flex items-center justify-between rounded-xl bg-obsidian-950 px-3.5 py-2.5 text-xs font-bold text-white transition-colors group-hover:bg-brand-600"
                >
                  <span>Solicitar Atendimento</span>
                  <InteractiveMiniIcon icon={ArrowUpRight} size={15} variant="nudge" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. COMPLETE SERVICES SECTION (ALL 10 CORE SERVICES)
      ====================================================================== */}
      <section id="servicos" className="relative py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header & Category Filter Tabs */}
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-700">
                <InteractiveMiniIcon icon={Certificate} size={16} variant="rotate" />
                <span>Portfólio Completo • 10 Serviços Certificados</span>
              </div>
              <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-obsidian-950 sm:text-4xl lg:text-[2.65rem] lg:leading-[1.12]">
                Manutenção INMETRO, Gestão NR-23 e Engenharia para{" "}
                <span className="text-brand-600">Aprovação de AVCB.</span>
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600 sm:text-lg">
                Executamos cada etapa com oficina própria em Jundiaí/SP, equipamentos calibrados e rastreabilidade individual por equipamento.
              </p>
            </div>

            {/* Filter Buttons (Never <a> tags, preventing false conversion firing) */}
            <div
              role="tablist"
              aria-label="Filtrar serviços por especialidade"
              className="inline-flex flex-wrap gap-1.5 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm"
            >
              {[
                { id: "todos", label: "Todos (10)" },
                { id: "manutencao", label: "Manutenção & Ensaios" },
                { id: "gestao", label: "Gestão & NR-23 Digital" },
                { id: "engenharia", label: "AVCB, Alarmes & Brigada" },
              ].map((tab) => {
                const active = serviceCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() =>
                      setServiceCategory(tab.id as "todos" | "manutencao" | "gestao" | "engenharia")
                    }
                    className={`rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                      active
                        ? "bg-obsidian-950 text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-100 hover:text-obsidian-950"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Services Grid */}
          <motion.div layout className="mt-12 grid gap-7 md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {filteredServices.map((service) => (
                <motion.article
                  layout
                  key={service.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-panel transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-2xl"
                >
                  <div>
                    {/* Top Image & Technical Header Strip */}
                    <div className="relative h-56 w-full overflow-hidden bg-obsidian-950">
                      <img
                        src={assetUrl(service.image)}
                        alt={service.imageAlt}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/35 to-transparent" />

                      {/* Service Number & Norm Pill */}
                      <div className="absolute left-4 right-4 top-4 flex items-center justify-between gap-2">
                        <span className="rounded-lg bg-obsidian-950/85 px-2.5 py-1 font-mono text-xs font-extrabold text-brand-400 backdrop-blur-md">
                          SERVIÇO #{service.number}
                        </span>
                        <span className="rounded-lg border border-white/15 bg-obsidian-950/85 px-3 py-1 font-mono text-[11px] font-semibold text-white backdrop-blur-md">
                          {service.normCode}
                        </span>
                      </div>

                      {/* Bottom Floating Icon + Frequency */}
                      <div className="absolute bottom-3.5 left-4 right-4 flex items-end justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <ManometerIcon
                            icon={service.icon}
                            variant={service.variant}
                            tone={service.tone}
                            size="md"
                            pressureLabel={service.frequency}
                          />
                          <div>
                            <span className="inline-block rounded bg-gauge-500/20 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-gauge-300">
                              {service.frequency}
                            </span>
                            <h3 className="mt-1 font-display text-xl font-extrabold text-white">
                              {service.title}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Body & Specs */}
                    <div className="p-6">
                      <p className="text-sm leading-relaxed text-slate-600">{service.shortDesc}</p>

                      <div className="mt-5 rounded-2xl border border-slate-100 bg-[#F8FAFC] p-4">
                        <div className="mb-2.5 font-mono text-[11px] font-bold uppercase tracking-wider text-obsidian-700">
                          ESCOPO TÉCNICO & DIFERENCIAIS:
                        </div>
                        <ul className="space-y-2">
                          {service.specs.map((spec) => (
                            <li
                              key={spec}
                              className="flex items-start gap-2 text-xs leading-relaxed text-slate-700"
                            >
                              <InteractiveMiniIcon
                                icon={CheckCircle}
                                size={16}
                                weight="fill"
                                variant="bounce"
                                className="mt-0.5 shrink-0 text-gauge-600"
                              />
                              <span>{spec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Action */}
                  <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/70 px-6 py-4">
                    <span className="font-mono text-[11px] font-semibold text-slate-500">
                      Atendimento em Jundiaí, Campinas e Grande SP
                    </span>
                    <a
                      href={buildWhatsAppUrl(service.whatsappText)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackLeadConversion(`Serviço: ${service.title}`, "whatsapp")
                      }
                      className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-brand-500"
                    >
                      <InteractiveMiniIcon icon={WhatsappLogo} size={16} weight="fill" variant="bounce" />
                      <span>Solicitar Orçamento</span>
                      <InteractiveMiniIcon icon={ArrowUpRight} size={15} variant="nudge" />
                    </a>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* =====================================================================
          6. INTERACTIVE FIRE SIMULATOR (CAD BLUEPRINT + NR-23 SOFTWARE)
      ====================================================================== */}
      <InteractiveFireSimulator />

      {/* =====================================================================
          7. ABOUT EXTIN SEVEN: HEADQUARTERS, FLEET & INSTITUTIONAL VIDEO
      ====================================================================== */}
      <section id="empresa" className="relative overflow-hidden bg-white py-20 lg:py-28">
        <div className="pointer-events-none absolute inset-0 bg-blueprint-light opacity-70" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            {/* Left 6 Columns: Institutional Narrative & Technical Pillars */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-700">
                <InteractiveMiniIcon icon={Buildings} size={16} variant="bounce" />
                <span>Estrutura Física Real • Jundiaí / SP</span>
              </div>

              <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-obsidian-950 sm:text-4xl lg:text-[2.6rem] lg:leading-[1.12]">
                Sede Própria, Oficina Certificada e{" "}
                <span className="text-brand-600">Frota Dedicada.</span>
              </h2>

              <p className="mt-4 text-base leading-relaxed text-slate-600">
                A <strong className="text-obsidian-950">Extin Seven</strong> nasceu para elevar o padrão técnico da segurança contra incêndio no Estado de São Paulo. Instalada em sede própria na{" "}
                <strong className="text-obsidian-900">
                  Avenida Caminho de Goiás, 699 — Bairro dos Fernandes, Jundiaí/SP
                </strong>
                , nossa estrutura reúne bancadas de recarga certificadas pelo INMETRO, laboratório de ensaio hidrostático de mangueiras e engenharia especializada em AVCB.
              </p>

              {/* 3 Technical Pillars with Interactive Manometer Icons */}
              <div className="mt-8 space-y-4">
                {TECHNICAL_PILLARS.map((pillar) => (
                  <div
                    key={pillar.title}
                    className="group flex items-start gap-4 rounded-2xl border border-slate-200/90 bg-[#F8FAFC] p-4 transition-all hover:border-brand-500/40 hover:bg-white hover:shadow-md"
                  >
                    <ManometerIcon
                      icon={pillar.icon}
                      variant={pillar.variant}
                      tone={pillar.tone}
                      size="md"
                      pressureLabel="100% PRÓPRIO"
                    />
                    <div>
                      <h3 className="font-display text-base font-extrabold text-obsidian-950">
                        {pillar.title}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-slate-600 sm:text-sm">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Animated Metrics Grid */}
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
                <CountUpMetric
                  end={100}
                  suffix="%"
                  label="Rastreável INMETRO"
                  sublabel="Selo + Anel Identificador"
                />
                <CountUpMetric
                  end={48}
                  prefix="+"
                  label="Soluções Técnicas"
                  sublabel="Produtos, Ensaios e AVCB"
                />
                <CountUpMetric
                  end={30}
                  suffix="h"
                  label="Autonomia IT-20"
                  sublabel="Fotoluminescência Real"
                />
              </div>
            </div>

            {/* Right 6 Columns: Real Headquarters Photo + Institutional YouTube Video */}
            <div className="space-y-6 lg:col-span-6">
              {/* Real Photo of Headquarters and Fleet */}
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-obsidian-950 p-2.5 shadow-xl">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                  <img
                    src={assetUrl("/images/sede-frota-extin-seven.jpg")}
                    alt="Fachada da sede própria e frota de veículos da Extin Seven em Jundiaí/SP"
                    className="h-full w-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian-950/90 via-transparent to-transparent" />
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/15 bg-obsidian-950/85 px-4 py-2.5 text-xs text-white backdrop-blur-md">
                    <span className="flex items-center gap-2 font-semibold">
                      <InteractiveMiniIcon icon={Truck} size={16} variant="bounce" className="text-brand-400" />
                      <span>Sede Própria e Frota Identificada — Jundiaí/SP</span>
                    </span>
                    <span className="font-mono text-[11px] text-gauge-400">CEP 13.214-870</span>
                  </div>
                </div>
              </div>

              {/* Institutional Video Card (YouTube Embed pnQBh4uc4aY) */}
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-obsidian-950 p-2.5 shadow-xl">
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-obsidian-900">
                  {!videoPlaying ? (
                    <div className="relative h-full w-full">
                      <img
                        src={assetUrl("/images/video-cover-extin-seven.jpg")}
                        alt="Vídeo Institucional Extin Seven"
                        className="h-full w-full object-cover opacity-90"
                      />
                      <div className="absolute inset-0 bg-obsidian-950/50 backdrop-blur-[2px]" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
                        <button
                          type="button"
                          onClick={() => setVideoPlaying(true)}
                          aria-label="Reproduzir vídeo institucional da Extin Seven"
                          className="group flex h-20 w-20 items-center justify-center rounded-full bg-brand-600 text-white shadow-crimson transition-transform duration-300 hover:scale-110"
                        >
                          <Play size={32} weight="fill" className="ml-1" />
                        </button>
                        <span className="mt-4 font-display text-lg font-extrabold">
                          Assista à Apresentação Institucional Extin Seven
                        </span>
                        <span className="mt-1 font-mono text-xs text-slate-300">
                          Conheça nosso processo de manutenção, engenharia e atendimento
                        </span>
                      </div>
                    </div>
                  ) : (
                    <iframe
                      className="h-full w-full"
                      src={`${COMPANY.youtubeEmbedUrl}?autoplay=1&rel=0`}
                      title="Vídeo Institucional Extin Seven"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          8. CERTIFIED PRODUCTS & TECHNOLOGIES CATALOG (10 PRODUCT LINES)
      ====================================================================== */}
      <section
        id="produtos"
        className="relative overflow-hidden bg-obsidian-950 py-20 text-white lg:py-28"
      >
        <div className="pointer-events-none absolute inset-0 bg-blueprint-dark opacity-70" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header & Filter Tabs */}
          <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-8 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/35 bg-brand-600/15 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-300">
                <InteractiveMiniIcon icon={Sparkle} size={15} variant="spark" />
                <span>Equipamentos Homologados • Pronta Entrega & Projetos</span>
              </div>
              <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-[2.65rem] lg:leading-[1.12]">
                Tecnologia Contra Incêndio:{" "}
                <span className="text-gradient-crimson">
                  LITH-EX, Wireless EVO1000, EN-54 & IT-20.
                </span>
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-300 sm:text-lg">
                Fornecemos desde extintores tradicionais e mangueiras ABNT até soluções de última geração para baterias de íons de lítio e centrais de alarme sem fio com planta baixa na tela.
              </p>
            </div>

            {/* Category Filter Buttons */}
            <div
              role="tablist"
              aria-label="Filtrar produtos por categoria"
              className="inline-flex flex-wrap gap-1.5 rounded-2xl border border-white/10 bg-obsidian-900 p-1.5"
            >
              {[
                { id: "todos", label: "Todos (10)" },
                { id: "combate", label: "Extintores, LITH-EX & Hidrantes" },
                { id: "alarme", label: "Alarmes Wireless, EN-54 & UL/FM" },
                { id: "sinalizacao", label: "Placas IT-20 & Braille" },
              ].map((tab) => {
                const active = productCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() =>
                      setProductCategory(tab.id as "todos" | "combate" | "alarme" | "sinalizacao")
                    }
                    className={`rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                      active
                        ? "bg-brand-600 text-white shadow-crimson"
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Product Cards Grid */}
          <motion.div layout className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.article
                  layout
                  key={product.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.28 }}
                  className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-white/12 bg-obsidian-900/95 transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/50 hover:shadow-2xl"
                >
                  <div>
                    {/* Product Authentic Image */}
                    <div className="relative h-56 w-full overflow-hidden bg-white p-2">
                      <img
                        src={assetUrl(product.image)}
                        alt={product.imageAlt}
                        loading="lazy"
                        className="h-full w-full rounded-2xl object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute left-4 top-4 rounded-lg bg-obsidian-950/90 px-2.5 py-1 font-mono text-[11px] font-bold text-gauge-300 shadow-md backdrop-blur-md">
                        {product.norm}
                      </div>
                    </div>

                    {/* Product Body */}
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-3">
                        <ManometerIcon
                          icon={product.icon}
                          variant={product.variant}
                          tone={product.tone}
                          size="md"
                          pressureLabel={product.norm.split("•")[0]}
                        />
                        <span className="rounded-full border border-brand-500/30 bg-brand-600/15 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-brand-300">
                          {product.badge}
                        </span>
                      </div>

                      <h3 className="mt-4 font-display text-lg font-extrabold text-white">
                        {product.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-slate-300">
                        {product.subtitle}
                      </p>

                      <ul className="mt-4 space-y-2 border-t border-white/10 pt-4">
                        {product.highlights.map((hl) => (
                          <li
                            key={hl}
                            className="flex items-start gap-2 text-xs leading-relaxed text-slate-300"
                          >
                            <InteractiveMiniIcon
                              icon={CheckCircle}
                              size={15}
                              weight="fill"
                              variant="bounce"
                              className="mt-0.5 shrink-0 text-gauge-400"
                            />
                            <span>{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="border-t border-white/10 bg-obsidian-950/60 px-6 py-4">
                    <a
                      href={buildWhatsAppUrl(
                        `Olá! Gostaria de cotar o produto *${product.title}* (${product.norm}) no site da Extin Seven.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackLeadConversion(`Produto: ${product.title}`, "whatsapp")
                      }
                      className="flex w-full items-center justify-between rounded-xl bg-white/10 px-4 py-2.5 text-xs font-bold text-white transition-colors group-hover:bg-brand-600"
                    >
                      <span className="flex items-center gap-2">
                        <InteractiveMiniIcon icon={WhatsappLogo} size={16} weight="fill" variant="bounce" />
                        <span>Cotar Este Equipamento</span>
                      </span>
                      <InteractiveMiniIcon icon={ArrowUpRight} size={15} variant="nudge" />
                    </a>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* =====================================================================
          9. REAL FIELD GALLERY ("OBRAS E INSTALAÇÕES REAIS EM CAMPO")
      ====================================================================== */}
      <section id="obras-reais" className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-gauge-500/30 bg-gauge-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-gauge-600">
                <InteractiveMiniIcon icon={ShieldCheck} size={16} variant="bounce" />
                <span>Zero Fotos Genéricas • Engenharia Real no Brasil</span>
              </div>
              <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-obsidian-950 sm:text-4xl lg:text-[2.6rem] lg:leading-[1.12]">
                Instalações, Ensaios e Projetos Executados pela{" "}
                <span className="text-brand-600">Extin Seven.</span>
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                Clique em qualquer fotografia para ampliar e inspecionar o padrão de acabamento das nossas instalações em hospitais, indústrias, escadas de emergência e projetos CAD.
              </p>
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {REAL_GALLERY.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setLightboxItem(item)}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-obsidian-950 text-left shadow-panel transition-all duration-300 hover:-translate-y-1 hover:border-brand-500 hover:shadow-2xl focus:outline-none"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={assetUrl(item.image)}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/25 to-transparent" />

                  <span className="absolute left-3 top-3 rounded-lg bg-obsidian-950/85 px-2.5 py-1 font-mono text-[10px] font-bold text-gauge-300 backdrop-blur-md">
                    {item.normTag}
                  </span>

                  <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white opacity-90 shadow-md transition-transform group-hover:scale-110">
                    <MagnifyingGlassPlus size={18} weight="bold" />
                  </span>
                </div>

                <div className="flex flex-1 flex-col justify-between p-4">
                  <div>
                    <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-brand-400">
                      {item.locationTag}
                    </div>
                    <h3 className="mt-1 font-display text-sm font-bold text-white">
                      {item.title}
                    </h3>
                  </div>
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-300">
                    {item.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          10. HOW IT WORKS (4-STEP WORKFLOW) + TECHNICAL FAQ
      ====================================================================== */}
      <section id="faq" className="border-t border-slate-200/80 bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* 4-Step Process */}
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-brand-700">
              <InteractiveMiniIcon icon={Clock} size={15} variant="rotate" />
              <span>Fluxo Operacional Padronizado</span>
            </span>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-obsidian-950 sm:text-4xl">
              Como funciona o atendimento da Extin Seven
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((proc) => (
              <div
                key={proc.step}
                className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-[#F8FAFC] p-6 transition-all hover:-translate-y-1 hover:border-brand-500/40 hover:bg-white hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <ManometerIcon
                      icon={proc.icon}
                      variant={proc.variant}
                      tone="crimson"
                      size="md"
                      pressureLabel={`ETAPA ${proc.step}`}
                    />
                    <span className="font-mono text-3xl font-extrabold text-slate-200 transition-colors group-hover:text-brand-600/30">
                      {proc.step}
                    </span>
                  </div>
                  <span className="mt-4 inline-block rounded-md bg-brand-50 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-brand-700">
                    {proc.badge}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-extrabold text-obsidian-950">
                    {proc.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
                    {proc.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ Accordion */}
          <div className="mt-20 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand-600">
                PERGUNTAS FREQUENTES • NORMAS ABNT & BOMBEIROS
              </span>
              <h3 className="mt-2 font-display text-2xl font-extrabold text-obsidian-950 sm:text-3xl">
                Dúvidas Técnicas sobre Recarga, Teste Hidrostático e AVCB
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Respondemos às principais dúvidas de engenheiros de segurança, gestores de compras, síndicos e responsáveis por facilities.
              </p>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-[#F8FAFC] p-5">
                <div className="flex items-center gap-3">
                  <ManometerIcon icon={FileText} variant="stamp" tone="emerald" size="sm" />
                  <div>
                    <div className="font-display text-sm font-bold text-obsidian-950">
                      Tem uma planilha de extintores ou notificação do Bombeiro?
                    </div>
                    <div className="text-xs text-slate-600">
                      Envie foto ou arquivo pelo WhatsApp e nossa engenharia analisa sem custo.
                    </div>
                  </div>
                </div>
                <a
                  href={buildWhatsAppUrl(
                    "Olá! Tenho uma relação de equipamentos / exigências do Corpo de Bombeiros e gostaria de enviar para cotação."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackLeadConversion("FAQ Enviar Relação WhatsApp", "whatsapp")}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-obsidian-950 px-4 py-3 text-xs font-bold text-white transition-colors hover:bg-brand-600"
                >
                  <InteractiveMiniIcon icon={WhatsappLogo} size={17} weight="fill" variant="bounce" />
                  <span>Enviar Relação de Equipamentos pelo WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="space-y-3 lg:col-span-7">
              {FAQ_ITEMS.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={faq.q}
                    className={`overflow-hidden rounded-2xl border transition-all ${
                      isOpen
                        ? "border-brand-500/40 bg-white shadow-md"
                        : "border-slate-200 bg-[#F8FAFC] hover:border-slate-300"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    >
                      <span className="font-display text-sm font-extrabold text-obsidian-950 sm:text-base">
                        {faq.q}
                      </span>
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-transform duration-300 ${
                          isOpen
                            ? "rotate-180 bg-brand-600 text-white"
                            : "bg-slate-200/80 text-obsidian-800"
                        }`}
                      >
                        <CaretDown size={16} weight="bold" />
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <div className="border-t border-slate-100 px-5 pb-5 pt-3 text-sm leading-relaxed text-slate-600">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          11. TECHNICAL QUOTE FORM, HEADQUARTERS MAP & COVERAGE AREA
      ====================================================================== */}
      <section
        id="orcamento"
        className="relative overflow-hidden bg-obsidian-950 py-20 text-white lg:py-28"
      >
        <div className="pointer-events-none absolute inset-0 bg-blueprint-dark opacity-75" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12">
            {/* Left 6 Columns: Direct Technical Quote Form */}
            <div className="rounded-3xl border border-white/15 bg-obsidian-900/95 p-6 shadow-2xl sm:p-8 lg:col-span-6">
              <div className="flex items-center gap-3">
                <ManometerIcon
                  icon={WhatsappLogo}
                  variant="pressure"
                  tone="emerald"
                  size="md"
                  pressureLabel="RESPOSTA ÁGIL"
                />
                <div>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-gauge-400">
                    ORÇAMENTO TÉCNICO DIRETO COM A ENGENHARIA
                  </span>
                  <h2 className="font-display text-2xl font-extrabold text-white sm:text-3xl">
                    Solicite sua Proposta ou Visita Técnica
                  </h2>
                </div>
              </div>

              <p className="mt-3 text-sm text-slate-300">
                Preencha os dados abaixo para gerar seu escopo técnico estruturado ou fale imediatamente pelos nossos canais diretos em Jundiaí/SP.
              </p>

              <form onSubmit={handleLeadFormSubmit} className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="lead-name"
                      className="block font-mono text-xs font-semibold uppercase tracking-wider text-slate-300"
                    >
                      Seu Nome *
                    </label>
                    <input
                      id="lead-name"
                      type="text"
                      required
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      placeholder="Ex.: Eng. Carlos Silva"
                      className="mt-1.5 w-full rounded-xl border border-white/15 bg-obsidian-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lead-company"
                      className="block font-mono text-xs font-semibold uppercase tracking-wider text-slate-300"
                    >
                      Empresa ou Condomínio *
                    </label>
                    <input
                      id="lead-company"
                      type="text"
                      required
                      value={leadCompany}
                      onChange={(e) => setLeadCompany(e.target.value)}
                      placeholder="Nome da empresa / condomínio"
                      className="mt-1.5 w-full rounded-xl border border-white/15 bg-obsidian-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="lead-phone"
                      className="block font-mono text-xs font-semibold uppercase tracking-wider text-slate-300"
                    >
                      Telefone / WhatsApp *
                    </label>
                    <input
                      id="lead-phone"
                      type="tel"
                      required
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(e.target.value)}
                      placeholder="(11) 99999-9999"
                      className="mt-1.5 w-full rounded-xl border border-white/15 bg-obsidian-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lead-city"
                      className="block font-mono text-xs font-semibold uppercase tracking-wider text-slate-300"
                    >
                      Cidade da Unidade
                    </label>
                    <input
                      id="lead-city"
                      type="text"
                      value={leadCity}
                      onChange={(e) => setLeadCity(e.target.value)}
                      placeholder="Jundiaí, São Paulo, Campinas..."
                      className="mt-1.5 w-full rounded-xl border border-white/15 bg-obsidian-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="lead-need"
                    className="block font-mono text-xs font-semibold uppercase tracking-wider text-slate-300"
                  >
                    Serviço ou Produto Desejado
                  </label>
                  <select
                    id="lead-need"
                    value={leadNeed}
                    onChange={(e) => setLeadNeed(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-white/15 bg-obsidian-950 px-4 py-3 text-sm text-white focus:border-brand-500 focus:outline-none"
                  >
                    <option>Manutenção e Recarga de Extintores (INMETRO)</option>
                    <option>Teste Hidrostático em Mangueiras de Incêndio (NBR 12779)</option>
                    <option>Adequação à Vistoria do Corpo de Bombeiros (AVCB / CLCB)</option>
                    <option>Inspeção Mensal NR-23 + Sistema On-line de Gerenciamento</option>
                    <option>Compra de Extintores Novos / Linha LITH-EX (Baterias de Lítio)</option>
                    <option>Alarme de Incêndio Sem Fio (Wireless EVO1000) / EN-54 / UL-FM</option>
                    <option>Placas Fotoluminescentes IT-20, Hidrantes e Acessibilidade Braille</option>
                    <option>Recarga de Cilindros de Ar Respirável / Bombeiro Civil Mensal</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="lead-notes"
                    className="block font-mono text-xs font-semibold uppercase tracking-wider text-slate-300"
                  >
                    Quantidade Estimada ou Observações (Opcional)
                  </label>
                  <textarea
                    id="lead-notes"
                    rows={3}
                    value={leadNotes}
                    onChange={(e) => setLeadNotes(e.target.value)}
                    placeholder="Ex.: 25 extintores, 8 mangueiras Tipo 2, ou adequação de galpão para renovação de AVCB..."
                    className="mt-1.5 w-full rounded-xl border border-white/15 bg-obsidian-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-3 rounded-2xl bg-brand-600 px-6 py-4 text-sm font-extrabold uppercase tracking-wider text-white shadow-crimson transition-all hover:bg-brand-500"
                >
                  <InteractiveMiniIcon icon={WhatsappLogo} size={20} weight="fill" variant="bounce" />
                  <span>Enviar Solicitação Técnica via WhatsApp</span>
                  <InteractiveMiniIcon icon={ArrowUpRight} size={18} variant="nudge" />
                </button>

                {formSubmitted && (
                  <p className="rounded-xl border border-gauge-500/30 bg-gauge-500/10 p-3 text-center font-mono text-xs text-gauge-300">
                    ✓ Escopo formatado com sucesso! Caso a janela do WhatsApp não tenha aberto, clique no botão de WhatsApp ao lado.
                  </p>
                )}
              </form>
            </div>

            {/* Right 6 Columns: Direct Channels, Address, Map & Cities Served */}
            <div className="flex flex-col justify-between space-y-6 lg:col-span-6">
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand-400">
                  CANAIS DIRETOS & LOCALIZAÇÃO DA SEDE PRÓPRIA
                </span>
                <h3 className="mt-2 font-display text-2xl font-extrabold text-white sm:text-3xl">
                  Fale Direto com Nossa Equipe em Jundiaí/SP
                </h3>

                {/* Direct Contact Cards */}
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <a
                    href={COMPANY.phoneTel}
                    onClick={() => trackLeadConversion("Contato Card Telefone Fixo", "phone")}
                    className="group flex items-center gap-3.5 rounded-2xl border border-white/12 bg-obsidian-900/90 p-4 transition-all hover:border-brand-500"
                  >
                    <ManometerIcon
                      icon={PhoneCall}
                      variant="siren"
                      tone="crimson"
                      size="md"
                      pressureLabel="PABX FIXO"
                    />
                    <div>
                      <div className="font-mono text-[11px] uppercase text-slate-400">
                        Telefone Fixo (Sede)
                      </div>
                      <div className="font-mono text-lg font-extrabold text-white">
                        {COMPANY.phoneDisplay}
                      </div>
                    </div>
                  </a>

                  <a
                    href={buildWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackLeadConversion("Contato Card WhatsApp", "whatsapp")}
                    className="group flex items-center gap-3.5 rounded-2xl border border-white/12 bg-obsidian-900/90 p-4 transition-all hover:border-gauge-400"
                  >
                    <ManometerIcon
                      icon={WhatsappLogo}
                      variant="pressure"
                      tone="emerald"
                      size="md"
                      pressureLabel="ONLINE"
                    />
                    <div>
                      <div className="font-mono text-[11px] uppercase text-slate-400">
                        WhatsApp Comercial
                      </div>
                      <div className="font-mono text-lg font-extrabold text-gauge-300">
                        {COMPANY.whatsappDisplay}
                      </div>
                    </div>
                  </a>
                </div>

                {/* Address & Email Card */}
                <div className="mt-4 rounded-2xl border border-white/12 bg-obsidian-900/90 p-4">
                  <div className="flex items-start gap-3.5">
                    <ManometerIcon
                      icon={MapPin}
                      variant="radar"
                      tone="amber"
                      size="sm"
                      pressureLabel="JUNDIAÍ-SP"
                    />
                    <div className="text-xs leading-relaxed text-slate-300 sm:text-sm">
                      <strong className="text-white">Sede Própria Extin Seven:</strong>{" "}
                      {COMPANY.address.full}
                      <div className="mt-1 font-mono text-xs text-brand-300">
                        E-mail: {COMPANY.email}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Embedded Map */}
                <div className="mt-4 overflow-hidden rounded-2xl border border-white/15 bg-obsidian-900">
                  <iframe
                    title="Mapa de Localização da Sede Extin Seven em Jundiaí/SP"
                    src="https://www.google.com/maps?q=Avenida+Caminho+de+Goi%C3%A1s,+699,+Jundia%C3%AD,+SP&output=embed"
                    className="h-56 w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>

              {/* Regional Coverage Pills */}
              <div className="rounded-2xl border border-white/12 bg-obsidian-900/80 p-5">
                <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                  <InteractiveMiniIcon icon={Truck} size={16} variant="bounce" className="text-brand-400" />
                  <span>ROTAS DIÁRIAS COM FROTA PRÓPRIA NA REGIÃO:</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {COMPANY.citiesServed.map((city) => (
                    <span
                      key={city}
                      className="rounded-lg border border-white/10 bg-obsidian-950 px-2.5 py-1 font-mono text-[11px] text-slate-300"
                    >
                      {city.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          12. FOOTER & TECHNICAL SEO INDEX TRIGGER
      ====================================================================== */}
      <footer className="border-t border-white/10 bg-[#05070A] py-14 text-slate-400">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
            {/* Col 1: Brand & Address */}
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-white px-3 py-1.5">
                  <img src="/images/logo.png" alt="Extin Seven" className="h-8 w-auto" />
                </div>
                <div>
                  <div className="font-display text-base font-extrabold text-white">
                    EXTIN SEVEN
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-brand-400">
                    Soluções Completas Contra Incêndio
                  </div>
                </div>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-slate-400">
                Manutenção de extintores certificada pelo INMETRO, ensaio hidrostático de mangueiras (NBR 12779), inspeção mensal NR-23, sistema on-line de gestão e engenharia completa para aprovação de AVCB.
              </p>
              <div className="mt-4 flex items-center gap-2.5">
                <a
                  href={COMPANY.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Extin Seven"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-colors hover:border-brand-500 hover:bg-brand-600"
                >
                  <InstagramLogo size={18} />
                </a>
                <a
                  href={COMPANY.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook Extin Seven"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-colors hover:border-brand-500 hover:bg-brand-600"
                >
                  <FacebookLogo size={18} />
                </a>
                <a
                  href={COMPANY.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube Extin Seven"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-colors hover:border-brand-500 hover:bg-brand-600"
                >
                  <YoutubeLogo size={18} />
                </a>
              </div>
            </div>

            {/* Col 2: Main Services */}
            <div className="lg:col-span-4">
              <div className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                Serviços Principais
              </div>
              <ul className="mt-3 space-y-2 text-xs">
                {SERVICES.slice(0, 6).map((s) => (
                  <li key={s.id}>
                    <a href="#servicos" className="transition-colors hover:text-white">
                      • {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Featured Products & SEO Index */}
            <div className="lg:col-span-4">
              <div className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                Tecnologias & Normas
              </div>
              <ul className="mt-3 space-y-2 text-xs">
                <li>
                  <a href="#produtos" className="transition-colors hover:text-white">
                    • Extintores Especiais LITH-EX (Baterias de Lítio)
                  </a>
                </li>
                <li>
                  <a href="#produtos" className="transition-colors hover:text-white">
                    • Central de Alarme Sem Fio Wireless EVO1000
                  </a>
                </li>
                <li>
                  <a href="#produtos" className="transition-colors hover:text-white">
                    • Alarmes Endereçáveis Tanda UK (EN-54) & UL/FM
                  </a>
                </li>
                <li>
                  <a href="#produtos" className="transition-colors hover:text-white">
                    • Placas Fotoluminescentes IT-20 & Braille NBR 9050
                  </a>
                </li>
              </ul>

              <button
                type="button"
                onClick={() => setSeoModalOpen(true)}
                className="mt-5 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 font-mono text-xs font-bold text-white transition-colors hover:border-brand-400 hover:bg-white/10"
              >
                <InteractiveMiniIcon icon={BookOpenText} size={16} variant="spark" className="text-brand-400" />
                <span>Abrir Índice Técnico Completo (48 Especialidades)</span>
              </button>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs sm:flex-row">
            <p>
              © {new Date().getFullYear()} {COMPANY.name} — {COMPANY.legalTagline}. Todos os direitos reservados.
            </p>
            <p className="font-mono text-[11px] text-slate-500">
              {COMPANY.address.full} • Tel: {COMPANY.phoneDisplay}
            </p>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          13. FLOATING WHATSAPP QUICK-LEAD BUTTON
      ====================================================================== */}
      <a
        href={buildWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackLeadConversion("Botão Flutuante WhatsApp", "whatsapp")}
        aria-label="Falar com a Extin Seven no WhatsApp"
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5 rounded-full bg-gauge-600 px-4 py-3.5 text-xs font-extrabold uppercase tracking-wider text-white shadow-[0_12px_30px_-6px_rgba(16,185,129,0.65)] transition-transform duration-300 hover:scale-105 hover:bg-gauge-500"
      >
        <WhatsappLogo size={22} weight="fill" />
        <span className="hidden sm:inline">Orçamento WhatsApp</span>
      </a>

      {/* =====================================================================
          14. GALLERY LIGHTBOX MODAL
      ====================================================================== */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxItem(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian-950/90 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-3xl border border-white/15 bg-obsidian-900 text-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                <div>
                  <span className="font-mono text-xs font-bold text-gauge-400">
                    {lightboxItem.normTag} • {lightboxItem.locationTag}
                  </span>
                  <h3 className="font-display text-lg font-extrabold text-white">
                    {lightboxItem.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setLightboxItem(null)}
                  aria-label="Fechar ampliação"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-brand-600"
                >
                  <X size={20} weight="bold" />
                </button>
              </div>

              <div className="max-h-[62vh] overflow-hidden bg-obsidian-950">
                <img
                  src={assetUrl(lightboxItem.image)}
                  alt={lightboxItem.title}
                  className="mx-auto max-h-[62vh] w-auto object-contain"
                />
              </div>

              <div className="flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
                <p className="max-w-2xl text-sm text-slate-300">{lightboxItem.description}</p>
                <a
                  href={buildWhatsAppUrl(
                    `Olá! Vi a foto "${lightboxItem.title}" no site da Extin Seven e gostaria de um orçamento semelhante.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackLeadConversion(`Lightbox: ${lightboxItem.title}`, "whatsapp")
                  }
                  className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-xs font-bold text-white shadow-crimson hover:bg-brand-500"
                >
                  <WhatsappLogo size={18} weight="fill" />
                  <span>Orçar Escopo Semelhante</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================================
          15. SEO TECHNICAL INDEX MODAL (ALL 48 SPECIALTIES FROM /MAPA-SITE)
      ====================================================================== */}
      <AnimatePresence>
        {seoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSeoModalOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian-950/85 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="flex max-h-[88vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-white/15 bg-obsidian-900 text-white shadow-2xl"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 p-6">
                <div>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand-400">
                    CATÁLOGO NORMATIVO COMPLETO • 48 ESPECIALIDADES EXTIN SEVEN
                  </span>
                  <h3 className="mt-1 font-display text-xl font-extrabold text-white">
                    Índice Técnico de Soluções, Ensaios e Equipamentos Contra Incêndio
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSeoModalOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-brand-600"
                >
                  <X size={20} weight="bold" />
                </button>
              </div>

              <div className="border-b border-white/10 bg-obsidian-950/60 px-6 py-3.5">
                <input
                  type="search"
                  value={seoSearch}
                  onChange={(e) => setSeoSearch(e.target.value)}
                  placeholder="Filtrar por norma ou solução (ex.: NBR 12779, NR 23, sem fio, EN-54, ar respirável, IT-20)..."
                  className="w-full rounded-xl border border-white/15 bg-obsidian-900 px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div className="grid flex-1 gap-6 overflow-y-auto p-6 md:grid-cols-2">
                {SEO_TECHNICAL_INDEX.map((group) => {
                  const items = group.items.filter(
                    (it) =>
                      !seoSearch.trim() ||
                      it.label.toLowerCase().includes(seoSearch.toLowerCase()) ||
                      it.slug.toLowerCase().includes(seoSearch.toLowerCase())
                  );
                  if (items.length === 0) return null;
                  return (
                    <div
                      key={group.category}
                      className="rounded-2xl border border-white/10 bg-obsidian-950/70 p-5"
                    >
                      <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-gauge-400">
                        {group.category}
                      </h4>
                      <ul className="mt-3 space-y-2">
                        {items.map((it) => (
                          <li key={it.slug}>
                            <a
                              href={buildWhatsAppUrl(
                                `Olá! Consultei a especialidade *${it.label}* no Índice Técnico da Extin Seven e gostaria de um orçamento.`
                              )}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() =>
                                trackLeadConversion(`Índice Técnico: ${it.label}`, "whatsapp")
                              }
                              className="group flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
                            >
                              <span>{it.label}</span>
                              <span className="font-mono text-[10px] text-brand-400 opacity-0 transition-opacity group-hover:opacity-100">
                                Cotar →
                              </span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
