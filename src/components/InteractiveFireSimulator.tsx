import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FireExtinguisher,
  Drop,
  Signpost,
  Wall,
  Broadcast,
  Lightning,
  CheckCircle,
  QrCode,
  Gauge,
  WhatsappLogo,
  ArrowUpRight,
  Sparkle,
  ShieldCheck,
  ArrowsClockwise,
  Eye,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { ManometerIcon, InteractiveMiniIcon, type IconVariant, type ManometerTone } from "./ManometerIcon";
import { buildWhatsAppUrl, trackLeadConversion, assetUrl } from "../data/extinSevenData";

interface BlueprintHotspot {
  id: string;
  code: string;
  title: string;
  norm: string;
  x: string;
  y: string;
  pressure: string;
  status: string;
  summary: string;
  specs: string[];
  image: string;
  imageCaption: string;
  icon: Icon;
  variant: IconVariant;
  tone: ManometerTone;
  whatsappMsg: string;
}

const HOTSPOTS: BlueprintHotspot[] = [
  {
    id: "hs-hidrante",
    code: "HID-01 • S9",
    title: "Abrigo de Hidrante, Mangueira Tipo 2 & Acionador",
    norm: "ABNT NBR 12779 • NBR 11861 • IT-22",
    x: "26%",
    y: "34%",
    pressure: "1.4 MPa",
    status: "Pressurizado • Lacrado",
    summary:
      "Ponto de hidrante completo com mangueira certificada ABNT e ensaio hidrostático anual em dia, esguicho regulável Storz, acionador manual endereçável e sinalização fotoluminescente IT-20.",
    specs: [
      "Teste hidrostático anual obrigatório (NBR 12779) executado na sede Extin Seven",
      "Chave Storz, registro globo 45° e esguicho regulável jato sólido/neblina",
      "Sinalização fotoluminescente superior com CNPJ do fabricante impresso",
    ],
    image: "/images/instalacao-hidrante-hospital-br.jpg",
    imageCaption: "Instalação real executada em ambiente hospitalar (Hidrante + Extintor + Alarme + Placa IT-20).",
    icon: Drop,
    variant: "flow",
    tone: "crimson",
    whatsappMsg:
      "Olá! Vi o simulador de planta no site da Extin Seven e gostaria de orçar manutenção/adequação de hidrantes e mangueiras.",
  },
  {
    id: "hs-escada-it20",
    code: "ROTA • IT-20",
    title: "Escada de Emergência & Balizamento Fotoluminescente",
    norm: "IT-20 Corpo de Bombeiros SP • NBR 16820",
    x: "48%",
    y: "52%",
    pressure: "30h Glow",
    status: "Alta Luminância Ativa",
    summary:
      "Sinalização de orientação e salvamento (S1, S2, S3, S12) e faixas fotoluminescentes de degrau que garantem evacuação imediata mesmo em corte total de energia elétrica e fumaça densa.",
    specs: [
      "Fotoluminescência de alta intensidade (até 30h de autonomia após corte de luz)",
      "Identificação de pavimento e rota de fuga contínua na escada",
      "100% aprovada em vistoria do Corpo de Bombeiros para emissão de AVCB",
    ],
    image: "/images/sinalizacao-fotoluminescente-escada.jpg",
    imageCaption: "Fotografia real no escuro: balizamento fotoluminescente nos degraus da escada de emergência.",
    icon: Signpost,
    variant: "radar",
    tone: "emerald",
    whatsappMsg:
      "Olá! Gostaria de um orçamento para placas de sinalização fotoluminescente IT-20 e balizamento de rota de fuga.",
  },
  {
    id: "hs-porta-corta-fogo",
    code: "PCF • P-90",
    title: "Porta Corta-Fogo, Barra Antipânico & Extintor Inox",
    norm: "ABNT NBR 11742 • IT-11 • NBR 12962",
    x: "72%",
    y: "38%",
    pressure: "90 min RF",
    status: "Estanqueidade OK",
    summary:
      "Conjunto de saída de emergência com porta corta-fogo, barra antipânico de acionamento rápido, mola aérea calibrada e extintor pressurizado em acabamento nobre com suporte de solo.",
    specs: [
      "Revisão de fechamento automático, trinco, dobradiças e barra antipânico",
      "Sinalização fotoluminescente 'Porta Corta-Fogo — Mantenha Fechada'",
      "Extintor posicionado na altura regulamentar com selo INMETRO vigente",
    ],
    image: "/images/porta-corta-fogo-rota-fuga.jpg",
    imageCaption: "Instalação real Extin Seven: saída de emergência com porta corta-fogo, barra antipânico e extintor.",
    icon: Wall,
    variant: "shield",
    tone: "amber",
    whatsappMsg:
      "Olá! Preciso de adequação para vistoria dos Bombeiros (Porta Corta-Fogo, Sinalização e Extintores).",
  },
  {
    id: "hs-alarme-wireless",
    code: "ALM • EVO1000",
    title: "Central de Alarme Sem Fio EVO1000 (Zigbee 3.0)",
    norm: "ABNT NBR 17240 • EN-54 / UL-FM",
    x: "34%",
    y: "72%",
    pressure: "Zigbee 3.0",
    status: "Malha 100% Online",
    summary:
      "Monitoramento inteligente sem quebrar paredes: a central EVO1000 exibe a planta baixa do prédio no painel LCD e supervisiona até 1.000 detectores, acionadores e sirenes sem fio.",
    specs: [
      "Instalação limpa e rápida em prédios já ocupados, hospitais e indústrias",
      "Também fornecemos linhas endereçáveis Tanda UK (EN-54 LPCB) e Bosch (UL/FM)",
      "Supervisão contínua de bateria, nível de sinal RF e falha de laço",
    ],
    image: "/images/central-alarme-wireless-evo1000.jpg",
    imageCaption: "Central de Alarme Sem Fio EVO1000 com visualização de planta baixa e repetidor Zigbee 3.0.",
    icon: Broadcast,
    variant: "siren",
    tone: "crimson",
    whatsappMsg:
      "Olá! Tenho interesse na Central de Alarme de Incêndio Sem Fio (Wireless EVO1000) ou sistemas EN-54/UL-FM.",
  },
  {
    id: "hs-lithex-extintor",
    code: "EXT • LITH-EX",
    title: "Extintores Certificados INMETRO & Linha LITH-EX (Lítio)",
    norm: "ABNT NBR 12962 • Portarias INMETRO",
    x: "64%",
    y: "68%",
    pressure: "1.4 MPa",
    status: "Selo INMETRO Ativo",
    summary:
      "Dimensionamento correto de unidades extintoras (PQS ABC, CO₂, Água, Espuma Mecânica) e proteção especial LITH-EX contra fuga térmica em baterias de íons de lítio.",
    specs: [
      "Manutenção Nível 1, 2 e 3 com rastreabilidade individual e anel do ano",
      "Agente encapsulador LITH-EX para empilhadeiras elétricas, nobreaks e salas técnicas",
      "Etiqueta com QR Code / código integrado ao Sistema On-line NR-23",
    ],
    image: "/images/extintor-lithex-bateria-litio.jpg",
    imageCaption: "Linha de extintores especiais LITH-EX para combate a incêndio em baterias de íons de lítio.",
    icon: FireExtinguisher,
    variant: "spray",
    tone: "emerald",
    whatsappMsg:
      "Olá! Gostaria de cotar recarga/compra de extintores certificados INMETRO e conhecer o extintor LITH-EX para baterias de lítio.",
  },
];

interface OnlineEquipmentRow {
  tag: string;
  type: string;
  sector: string;
  norm: string;
  pressure: string;
  nextDue: string;
  inmetroSeal: string;
  status: "conforme" | "programado";
  lastCheck: string;
}

const ONLINE_SYSTEM_SAMPLE: OnlineEquipmentRow[] = [
  {
    tag: "EXT-014",
    type: "Extintor PQS ABC 6kg (2A:20BC)",
    sector: "Galpão Logístico — Doca 02",
    norm: "NBR 12962 • NR-23",
    pressure: "1.42 MPa (Verde)",
    nextDue: "Válido por 12 meses",
    inmetroSeal: "INMETRO #849.210-BR",
    status: "conforme",
    lastCheck: "Inspeção NR-23 validada via coletor digital",
  },
  {
    tag: "MANG-08",
    type: "Mangueira Industrial Tipo 2 — 15m (1.1/2\")",
    sector: "Hidrante H-04 — Produção",
    norm: "NBR 12779 • NBR 11861",
    pressure: "Ensaio 14 kgf/cm² OK",
    nextDue: "Próx. Hidrostático: 11 meses",
    inmetroSeal: "Laudo Hidrostático #TH-2094",
    status: "conforme",
    lastCheck: "Acoplamento Storz, vedação e vinco aprovados",
  },
  {
    tag: "EXT-022",
    type: "Extintor Especial LITH-EX 9L (Baterias Lítio)",
    sector: "Sala de Nobreaks & Recarga de Empilhadeiras",
    norm: "NTA Lítio • NR-23",
    pressure: "1.38 MPa (Verde)",
    nextDue: "Válido por 12 meses",
    inmetroSeal: "Certificado LITH-EX #LX-108",
    status: "conforme",
    lastCheck: "Lacre intacto, manômetro calibrado e placa IT-20 OK",
  },
  {
    tag: "ALM-01",
    type: "Central de Alarme Wireless EVO1000 (48 pontos)",
    sector: "Portaria Técnica / Brigada",
    norm: "NBR 17240 • EN-54",
    pressure: "Sinal RF 99.4%",
    nextDue: "Preventiva Trimestral OK",
    inmetroSeal: "ART / Laudo #AL-7741",
    status: "conforme",
    lastCheck: "Todos os 48 sensores e sirenes sem fio comunicando",
  },
  {
    tag: "CIL-04",
    type: "Cilindro de Ar Respirável EPR (6L • 300 bar)",
    sector: "Cabine de Brigada / Espaço Confinado NR-33",
    norm: "NBR 12543 • Grau D",
    pressure: "300 bar (Carregado)",
    nextDue: "Análise de Pureza Vigente",
    inmetroSeal: "Laudo Ar Respirável #AR-512",
    status: "programado",
    lastCheck: "Recarga de ar respirável filtrada pronta para uso",
  },
];

export const InteractiveFireSimulator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"blueprint" | "software">("blueprint");
  const [selectedHotspotId, setSelectedHotspotId] = useState<string>(HOTSPOTS[0].id);
  const [blackoutMode, setBlackoutMode] = useState<boolean>(false);
  const [selectedAssetTag, setSelectedAssetTag] = useState<string>(ONLINE_SYSTEM_SAMPLE[0].tag);
  const [diagnosticPulse, setDiagnosticPulse] = useState<boolean>(false);

  const activeHotspot = HOTSPOTS.find((h) => h.id === selectedHotspotId) ?? HOTSPOTS[0];
  const activeAsset =
    ONLINE_SYSTEM_SAMPLE.find((item) => item.tag === selectedAssetTag) ?? ONLINE_SYSTEM_SAMPLE[0];

  const handleRunDiagnostic = () => {
    setDiagnosticPulse(true);
    window.setTimeout(() => setDiagnosticPulse(false), 1100);
  };

  return (
    <section
      id="engenharia-interativa"
      className="relative overflow-hidden bg-obsidian-950 py-20 text-white lg:py-28"
    >
      {/* Blueprint CAD Grid Background */}
      <div className="pointer-events-none absolute inset-0 bg-blueprint-dark opacity-70" />
      <div className="pointer-events-none absolute -left-32 top-16 h-96 w-96 rounded-full bg-brand-600/15 blur-[130px]" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-gauge-500/10 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-8 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-brand-500/30 bg-brand-600/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-300">
              <InteractiveMiniIcon icon={Gauge} size={15} variant="rotate" className="text-brand-400" />
              <span>Engenharia Interativa • Diagnóstico AVCB & NR-23 Digital</span>
            </div>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-[2.65rem] lg:leading-[1.12]">
              Inspecione uma planta real e teste nosso{" "}
              <span className="text-gradient-crimson">Sistema On-line.</span>
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-300 sm:text-lg">
              Clique nos pontos técnicos da planta baixa da <strong className="text-white">Extin Seven</strong>, simule um corte de energia para ver a sinalização fotoluminescente <span className="font-mono text-gauge-400">IT-20</span> em ação ou explore o portal web de rastreabilidade.
            </p>
          </div>

          {/* Interactive Mode Switcher (Buttons, never fake lead links) */}
          <div className="inline-flex self-start rounded-2xl border border-white/10 bg-obsidian-900/90 p-1.5 backdrop-blur-md">
            <button
              type="button"
              onClick={() => setActiveTab("blueprint")}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all sm:text-sm ${
                activeTab === "blueprint"
                  ? "bg-brand-600 text-white shadow-crimson"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <InteractiveMiniIcon icon={Signpost} size={17} variant="spark" />
              <span>1. Planta CAD & Teste IT-20</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("software")}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all sm:text-sm ${
                activeTab === "software"
                  ? "bg-gauge-600 text-white shadow-gauge"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <InteractiveMiniIcon icon={QrCode} size={17} variant="pulse" />
              <span>2. Sistema On-line NR-23</span>
            </button>
          </div>
        </div>

        {/* Mode Content */}
        <div className="mt-10">
          <AnimatePresence mode="wait">
            {activeTab === "blueprint" ? (
              <motion.div
                key="tab-blueprint"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="grid gap-8 lg:grid-cols-12"
              >
                {/* Left Column: Interactive CAD Blueprint Canvas */}
                <div className="flex flex-col justify-between rounded-3xl border border-white/15 bg-obsidian-900/90 p-4 shadow-2xl sm:p-6 lg:col-span-7">
                  {/* Top Telemetry Bar */}
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3.5">
                    <div className="flex items-center gap-2.5">
                      <span className="inline-flex h-2.5 w-2.5 rounded-full bg-gauge-400 shadow-[0_0_10px_#34D399]" />
                      <span className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-300">
                        PLANTA BAIXA CAD REAL • LEVANTAMENTO AVCB / IT-20
                      </span>
                    </div>

                    {/* Blackout / Photoluminescent Test Button */}
                    <button
                      type="button"
                      onClick={() => {
                        setBlackoutMode((prev) => !prev);
                        if (!blackoutMode) {
                          setSelectedHotspotId("hs-escada-it20");
                        }
                      }}
                      className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-1.5 font-mono text-xs font-bold uppercase tracking-wider transition-all ${
                        blackoutMode
                          ? "border-gauge-400 bg-gauge-500/20 text-gauge-300 shadow-[0_0_24px_rgba(52,211,153,0.35)]"
                          : "border-white/15 bg-white/5 text-slate-200 hover:border-gauge-400/60 hover:text-gauge-300"
                      }`}
                    >
                      <InteractiveMiniIcon
                        icon={Lightning}
                        size={15}
                        variant="spark"
                        className={blackoutMode ? "text-gauge-300" : "text-signal-400"}
                      />
                      <span>
                        {blackoutMode
                          ? "Modo Blackout IT-20: ATIVO (30h Glow)"
                          : "Simular Corte de Energia (IT-20)"}
                      </span>
                    </button>
                  </div>

                  {/* Interactive Blueprint Container */}
                  <div className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl border border-white/10 bg-obsidian-950">
                    <img
                      src={assetUrl("/images/projeto-planta-baixa-cad.jpg")}
                      alt="Projeto técnico em planta baixa CAD da Extin Seven com sinalização IT-20 e equipamentos de combate a incêndio"
                      className={`h-full w-full object-cover transition-all duration-700 ${
                        blackoutMode
                          ? "brightness-[0.28] contrast-125 hue-rotate-15 saturate-150"
                          : "brightness-95 contrast-105"
                      }`}
                    />

                    {/* Subtle Technical Overlay */}
                    <div
                      className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
                        blackoutMode
                          ? "bg-gradient-to-tr from-obsidian-950/80 via-emerald-950/35 to-obsidian-950/75 opacity-100"
                          : "bg-gradient-to-t from-obsidian-950/55 via-transparent to-obsidian-950/25 opacity-100"
                      }`}
                    />

                    {/* Photoluminescent Evacuation Path SVG when Blackout Mode is ON */}
                    <AnimatePresence>
                      {blackoutMode && (
                        <motion.svg
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          viewBox="0 0 600 412"
                          className="pointer-events-none absolute inset-0 h-full w-full"
                        >
                          <defs>
                            <filter id="it20Glow" x="-20%" y="-20%" width="140%" height="140%">
                              <feGaussianBlur stdDeviation="5" result="blur" />
                              <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                              </feMerge>
                            </filter>
                          </defs>
                          <motion.path
                            d="M 155 140 L 288 214 L 432 156"
                            fill="none"
                            stroke="#34D399"
                            strokeWidth="4.5"
                            strokeDasharray="10 8"
                            filter="url(#it20Glow)"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.1, ease: "easeInOut" }}
                          />
                          <motion.path
                            d="M 204 296 L 288 214 L 384 280"
                            fill="none"
                            stroke="#A3E635"
                            strokeWidth="3.5"
                            strokeDasharray="6 6"
                            filter="url(#it20Glow)"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.2, ease: "easeInOut", delay: 0.15 }}
                          />
                          <rect
                            x="16"
                            y="16"
                            width="270"
                            height="34"
                            rx="8"
                            fill="rgba(5, 46, 22, 0.88)"
                            stroke="#34D399"
                            strokeWidth="1.2"
                          />
                          <text
                            x="28"
                            y="38"
                            fill="#A7F3D0"
                            fontSize="11"
                            fontFamily="JetBrains Mono, monospace"
                            fontWeight="700"
                          >
                            ROTA FOTOLUMINESCENTE IT-20 ATIVA
                          </text>
                        </motion.svg>
                      )}
                    </AnimatePresence>

                    {/* Hotspot Pins */}
                    {HOTSPOTS.map((spot) => {
                      const isSelected = spot.id === activeHotspot.id;
                      const SpotIcon = spot.icon;
                      return (
                        <button
                          key={spot.id}
                          type="button"
                          onClick={() => setSelectedHotspotId(spot.id)}
                          style={{ left: spot.x, top: spot.y }}
                          aria-label={`Inspecionar ponto ${spot.title}`}
                          className="group absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none"
                        >
                          {/* Pulsing Radar Ring */}
                          <span
                            className={`absolute -inset-2 rounded-full transition-all duration-300 ${
                              isSelected
                                ? blackoutMode
                                  ? "animate-ping bg-gauge-400/50"
                                  : "animate-ping bg-brand-500/55"
                                : "bg-obsidian-950/40 group-hover:bg-brand-500/30"
                            }`}
                          />
                          <span
                            className={`relative flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 font-mono text-[11px] font-bold shadow-lg transition-all duration-300 ${
                              isSelected
                                ? blackoutMode
                                  ? "scale-110 border-gauge-300 bg-gauge-500 text-obsidian-950 shadow-[0_0_25px_#34D399]"
                                  : "scale-110 border-white bg-brand-600 text-white shadow-crimson"
                                : blackoutMode
                                ? "border-gauge-400/70 bg-obsidian-950/90 text-gauge-300 hover:scale-105"
                                : "border-white/30 bg-obsidian-950/90 text-white hover:scale-105 hover:border-brand-400"
                            }`}
                          >
                            <SpotIcon size={15} weight="duotone" />
                            <span className="hidden sm:inline">{spot.code}</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Quick Hotspot Selector Strip */}
                  <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
                    {HOTSPOTS.map((spot) => {
                      const isSelected = spot.id === activeHotspot.id;
                      return (
                        <button
                          key={spot.id}
                          type="button"
                          onClick={() => setSelectedHotspotId(spot.id)}
                          className={`flex flex-col items-start rounded-xl border p-2.5 text-left transition-all ${
                            isSelected
                              ? "border-brand-500 bg-brand-600/15 text-white shadow-sm"
                              : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/25 hover:bg-white/[0.06]"
                          }`}
                        >
                          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-brand-400">
                            {spot.code}
                          </span>
                          <span className="mt-0.5 line-clamp-1 text-xs font-semibold">
                            {spot.title.split("&")[0]}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Right Column: Active Hotspot Field Proof & Engineering Specs */}
                <div className="flex flex-col justify-between rounded-3xl border border-white/15 bg-obsidian-900/95 p-6 shadow-2xl lg:col-span-5">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeHotspot.id + (blackoutMode ? "-dark" : "-light")}
                      initial={{ opacity: 0, x: 14 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -14 }}
                      transition={{ duration: 0.28 }}
                      className="flex h-full flex-col justify-between"
                    >
                      <div>
                        {/* Header with Interactive ManometerIcon */}
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-3.5">
                            <ManometerIcon
                              icon={activeHotspot.icon}
                              variant={activeHotspot.variant}
                              tone={blackoutMode ? "emerald" : activeHotspot.tone}
                              size="lg"
                              pressureLabel={activeHotspot.pressure}
                            />
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="rounded-md bg-brand-600/20 px-2 py-0.5 font-mono text-[11px] font-bold text-brand-300">
                                  {activeHotspot.code}
                                </span>
                                <span className="rounded-md border border-gauge-500/30 bg-gauge-500/10 px-2 py-0.5 font-mono text-[11px] font-semibold text-gauge-300">
                                  {activeHotspot.status}
                                </span>
                              </div>
                              <h3 className="mt-1.5 font-display text-xl font-bold text-white">
                                {activeHotspot.title}
                              </h3>
                            </div>
                          </div>
                        </div>

                        {/* Normative Tag */}
                        <div className="mt-4 flex items-center justify-between rounded-xl border border-white/10 bg-obsidian-950/80 px-3.5 py-2 font-mono text-xs text-slate-300">
                          <span>NORMA TÉCNICA:</span>
                          <span className="font-bold text-white">{activeHotspot.norm}</span>
                        </div>

                        {/* Real Field Photo Corresponding to the Blueprint Point */}
                        <div className="group relative mt-4 overflow-hidden rounded-2xl border border-white/10 bg-obsidian-950">
                          <img
                            src={assetUrl(
                              blackoutMode && activeHotspot.id !== "hs-escada-it20"
                                ? "/images/sinalizacao-fotoluminescente-escada.jpg"
                                : activeHotspot.image
                            )}
                            alt={activeHotspot.title}
                            className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className=" inset-x-0 bottom-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/85 to-transparent p-3">
                            <p className="flex items-center gap-1.5 text-xs text-slate-300">
                              <InteractiveMiniIcon
                                icon={Eye}
                                size={14}
                                variant="pulse"
                                className="shrink-0 text-gauge-400"
                              />
                              <span>
                                {blackoutMode && activeHotspot.id !== "hs-escada-it20"
                                  ? "Modo Blackout ativo: Exemplo real de degraus fotoluminescentes IT-20 no escuro."
                                  : activeHotspot.imageCaption}
                              </span>
                            </p>
                          </div>
                        </div>

                        {/* Engineering Description */}
                        <p className="mt-4 text-sm leading-relaxed text-slate-300">
                          {activeHotspot.summary}
                        </p>

                        {/* Checklist */}
                        <ul className="mt-4 space-y-2">
                          {activeHotspot.specs.map((spec) => (
                            <li
                              key={spec}
                              className="flex items-start gap-2.5 text-xs leading-relaxed text-slate-200 sm:text-sm"
                            >
                              <InteractiveMiniIcon
                                icon={CheckCircle}
                                size={17}
                                weight="fill"
                                variant="bounce"
                                className="mt-0.5 shrink-0 text-gauge-400"
                              />
                              <span>{spec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Contextual Lead Action */}
                      <div className="mt-6 border-t border-white/10 pt-4">
                        <a
                          href={buildWhatsAppUrl(activeHotspot.whatsappMsg)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() =>
                            trackLeadConversion(`Simulador Planta: ${activeHotspot.code}`, "whatsapp")
                          }
                          className="group flex w-full items-center justify-between rounded-2xl bg-brand-600 px-5 py-3.5 text-sm font-bold text-white shadow-crimson transition-all hover:bg-brand-500"
                        >
                          <span className="flex items-center gap-2.5">
                            <InteractiveMiniIcon icon={WhatsappLogo} size={20} weight="fill" variant="bounce" />
                            <span>Orçar Adequação deste Item no WhatsApp</span>
                          </span>
                          <InteractiveMiniIcon icon={ArrowUpRight} size={18} variant="nudge" />
                        </a>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            ) : (
              /* Mode 2: Sistema On-line de Gerenciamento (NR-23 Digital) */
              <motion.div
                key="tab-software"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="grid gap-8 lg:grid-cols-12"
              >
                {/* Left Column: Interactive Equipment Inventory Table */}
                <div className="rounded-3xl border border-white/15 bg-obsidian-900/90 p-5 shadow-2xl sm:p-6 lg:col-span-7">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                    <div>
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-gauge-400">
                        PORTAL WEB EXTIN SEVEN • GESTÃO DE ATIVOS EM TEMPO REAL
                      </span>
                      <h3 className="mt-1 font-display text-xl font-bold text-white">
                        Inventário Digital de Extintores, Mangueiras e Hidrantes
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={handleRunDiagnostic}
                      className="inline-flex items-center gap-2 rounded-xl border border-gauge-500/40 bg-gauge-500/15 px-3.5 py-2 font-mono text-xs font-bold text-gauge-300 transition-all hover:bg-gauge-500/25"
                    >
                      <InteractiveMiniIcon
                        icon={ArrowsClockwise}
                        size={15}
                        variant="rotate"
                        className={diagnosticPulse ? "animate-spin" : ""}
                      />
                      <span>Testar Leitura NR-23</span>
                    </button>
                  </div>

                  {/* Equipment Selector Rows */}
                  <div className="mt-4 space-y-2.5">
                    {ONLINE_SYSTEM_SAMPLE.map((row) => {
                      const isSelected = row.tag === activeAsset.tag;
                      return (
                        <button
                          key={row.tag}
                          type="button"
                          onClick={() => setSelectedAssetTag(row.tag)}
                          className={`group flex w-full flex-col justify-between gap-2 rounded-2xl border p-3.5 text-left transition-all sm:flex-row sm:items-center ${
                            isSelected
                              ? "border-gauge-400 bg-gauge-500/15 shadow-[0_0_25px_-6px_rgba(16,185,129,0.4)]"
                              : "border-white/10 bg-obsidian-950/60 hover:border-white/25 hover:bg-obsidian-950"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`flex h-10 w-16 shrink-0 items-center justify-center rounded-xl font-mono text-xs font-extrabold ${
                                isSelected
                                  ? "bg-gauge-500 text-obsidian-950"
                                  : "bg-white/10 text-white group-hover:bg-brand-600"
                              }`}
                            >
                              {row.tag}
                            </span>
                            <div>
                              <div className="text-sm font-bold text-white">{row.type}</div>
                              <div className="text-xs text-slate-400">{row.sector}</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 self-end sm:self-center">
                            <span className="rounded-lg border border-white/10 bg-obsidian-900 px-2.5 py-1 font-mono text-[11px] font-semibold text-gauge-300">
                              {row.pressure}
                            </span>
                            <span className="inline-flex items-center gap-1 rounded-full bg-gauge-500/20 px-2.5 py-0.5 font-mono text-[11px] font-bold text-gauge-300">
                              <span className="h-1.5 w-1.5 rounded-full bg-gauge-400" />
                              OK
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Bottom Info Banner */}
                  <div className="mt-5 flex flex-col justify-between gap-3 rounded-2xl border border-white/10 bg-obsidian-950/90 p-4 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-3">
                      <ManometerIcon
                        icon={ShieldCheck}
                        variant="shield"
                        tone="emerald"
                        size="sm"
                        pressureLabel="NR-23 OK"
                      />
                      <p className="text-xs leading-relaxed text-slate-300">
                        <strong className="text-white">Zero planilhas manuais:</strong> o sistema envia alertas automáticos de vencimento de recarga, teste hidrostático e gera relatórios para auditorias ISO/AVCB.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Column: Live Asset Telemetry Card + Real Field Tablet Photo */}
                <div className="flex flex-col justify-between rounded-3xl border border-white/15 bg-obsidian-900/95 p-6 shadow-2xl lg:col-span-5">
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <ManometerIcon
                          icon={QrCode}
                          variant="radar"
                          tone="emerald"
                          size="lg"
                          pressureLabel={activeAsset.pressure}
                        />
                        <div>
                          <span className="font-mono text-xs font-bold uppercase tracking-wider text-gauge-400">
                            FICHA DE RASTREABILIDADE #{activeAsset.tag}
                          </span>
                          <h4 className="font-display text-lg font-bold text-white">
                            {activeAsset.type}
                          </h4>
                        </div>
                      </div>
                    </div>

                    {/* Telemetry Grid */}
                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <div className="rounded-xl border border-white/10 bg-obsidian-950/90 p-3">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
                          LOCALIZAÇÃO / SETOR
                        </span>
                        <p className="mt-1 text-xs font-bold text-white">{activeAsset.sector}</p>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-obsidian-950/90 p-3">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
                          SELO / CERTIFICADO
                        </span>
                        <p className="mt-1 font-mono text-xs font-bold text-gauge-300">
                          {activeAsset.inmetroSeal}
                        </p>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-obsidian-950/90 p-3">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
                          PRESSÃO / ENSAIO
                        </span>
                        <p className="mt-1 font-mono text-xs font-bold text-white">
                          {activeAsset.pressure}
                        </p>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-obsidian-950/90 p-3">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
                          VIGÊNCIA / PRÓX. AÇÃO
                        </span>
                        <p className="mt-1 text-xs font-bold text-brand-300">{activeAsset.nextDue}</p>
                      </div>
                    </div>

                    {/* Field Inspection Photo */}
                    <div className="relative mt-4 overflow-hidden rounded-2xl border border-white/10">
                      <img
                        src={assetUrl("/images/inspecao-nr23-tablet-br.jpg")}
                        alt="Técnico realizando inspeção NR-23 com tablet conectado ao Sistema On-line da Extin Seven"
                        className="h-44 w-full object-cover"
                      />
                      <div className="inset-x-0 bottom-0 bg-obsidian-950/90 p-3">
                        <p className="font-mono text-[11px] text-gauge-300">
                          ✓ {activeAsset.lastCheck}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-white/10 pt-4">
                    <a
                      href={buildWhatsAppUrl(
                        "Olá! Testei a prévia do Sistema On-line de Gerenciamento NR-23 no site da Extin Seven e gostaria de conhecer como implantar na minha empresa."
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackLeadConversion("Simulador Sistema Online NR-23", "whatsapp")
                      }
                      className="flex w-full items-center justify-between rounded-2xl bg-gauge-600 px-5 py-3.5 text-sm font-bold text-white shadow-gauge transition-all hover:bg-gauge-500"
                    >
                      <span className="flex items-center gap-2.5">
                        <InteractiveMiniIcon icon={Sparkle} size={19} weight="fill" variant="spark" />
                        <span>Solicitar Demonstração do Sistema On-line</span>
                      </span>
                      <InteractiveMiniIcon icon={ArrowUpRight} size={18} variant="nudge" />
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
