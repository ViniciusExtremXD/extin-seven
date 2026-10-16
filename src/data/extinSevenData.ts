import {
  FireExtinguisher,
  Drop,
  ClipboardText,
  DesktopTower,
  QrCode,
  UsersThree,
  Cylinder,
  BellRinging,
  Handshake,
  ShieldCheck,
  Siren,
  Broadcast,
  Wall,
  Wrench,
  Signpost,
  Wheelchair,
  BatteryWarning,
  Factory,
  Buildings,
  Truck,
  Certificate,
  Gauge,
  CompassTool,
  CheckCircle,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import type { IconVariant, ManometerTone } from "../components/ManometerIcon";

export const COMPANY = {
  name: "Extin Seven",
  legalTagline: "Soluções Completas em Segurança Contra Incêndio",
  phoneDisplay: "(11) 4533-2226",
  phoneTel: "tel:1145332226",
  whatsappDisplay: "(11) 94017-9373",
  whatsappNumber: "5511940179373",
  email: "extinseven@extinseven.com.br",
  address: {
    street: "Avenida Caminho de Goiás, 699",
    district: "Bairro dos Fernandes",
    city: "Jundiaí",
    state: "SP",
    cep: "13.214-870",
    full: "Av. Caminho de Goiás, 699 — Bairro dos Fernandes, Jundiaí/SP — CEP 13.214-870",
  },
  youtubeEmbedUrl: "https://www.youtube.com/embed/pnQBh4uc4aY",
  youtubeWatchUrl: "https://www.youtube.com/watch?v=pnQBh4uc4aY",
  socials: {
    facebook: "https://www.facebook.com/extinsevenextintores",
    instagram: "https://www.instagram.com/extin_seven/",
    youtube: "https://www.youtube.com/@ExtinSeven",
  },
  citiesServed: [
    "Jundiaí",
    "São Paulo (Capital)",
    "Campinas",
    "Itupeva",
    "Várzea Paulista",
    "Campo Limpo Paulista",
    "Louveira",
    "Vinhedo",
    "Valinhos",
    "Indaiatuba",
    "Cajamar",
    "Barueri & Alphaville",
    " Atibaia",
    "Sorocaba",
  ],
};

export function assetUrl(path: string): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
    return path;
  }
  const base = import.meta.env.BASE_URL || "/";
  const cleanBase = base.endsWith("/") ? base : `${base}/`;
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
}

export function buildWhatsAppUrl(customMessage?: string): string {
  const msg =
    customMessage ??
    "Olá! Vim pelo site da Extin Seven e gostaria de solicitar um orçamento técnico de segurança contra incêndio.";
  return `https://wa.me/${COMPANY.whatsappNumber}?text=${encodeURIComponent(msg)}`;
}

export function trackLeadConversion(actionLabel: string, channel: "whatsapp" | "phone" | "form") {
  if (typeof window !== "undefined") {
    const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({
      event: "extinseven_lead_action",
      lead_channel: channel,
      lead_label: actionLabel,
    });
  }
}

export interface HeroSlide {
  id: string;
  badge: string;
  normCode: string;
  title: string;
  highlight: string;
  description: string;
  image: string;
  imageAlt: string;
  imageCaption: string;
  ctaPrimary: string;
  whatsappPrompt: string;
  telemetry: {
    label: string;
    value: string;
    sub: string;
  }[];
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "sede-frota",
    badge: "Sede Própria em Jundiaí • Frota Própria",
    normCode: "INMETRO / ABNT NBR 12962",
    title: "Engenharia, Manutenção e Gestão Completa Contra",
    highlight: "Incêndio.",
    description:
      "Estrutura física própria, oficina certificada, frota dedicada e plataforma on-line para manter indústrias, hospitais, centros logísticos e condomínios 100% aprovados pelo Corpo de Bombeiros.",
    image: "/images/sede-frota-extin-seven.jpg",
    imageAlt: "Sede própria e frota oficial da Extin Seven em Jundiaí - SP",
    imageCaption: "Sede própria (Av. Caminho de Goiás, 699 — Jundiaí/SP) e frota dedicada para coleta e entrega programada.",
    ctaPrimary: "Solicitar Orçamento Técnico",
    whatsappPrompt:
      "Olá! Vi a estrutura da Extin Seven no site e gostaria de um orçamento técnico para minha empresa/condomínio.",
    telemetry: [
      { label: "Pressão de Trabalho", value: "1.4 MPa", sub: "Zona Verde Nominal" },
      { label: "Rastreabilidade", value: "100% QR", sub: "Sistema On-line" },
      { label: "Conformidade", value: "NR-23 / IT-20", sub: "Corpo de Bombeiros" },
    ],
  },
  {
    id: "instalacoes-reais",
    badge: "Adequação AVCB / CLCB • Projetos em Campo",
    normCode: "DECRETO ESTADUAL 63.911/18",
    title: "Adequação à Vistoria do Corpo de Bombeiros sem",
    highlight: "Retrabalho.",
    description:
      "Da planta baixa em CAD à execução em campo: hidrantes, portas corta-fogo, sinalização fotoluminescente IT-20, centrais de alarme wireless/EN-54 e laudos técnicos para aprovação de vistoria.",
    image: "/images/instalacao-hidrante-hospital-br.jpg",
    imageAlt: "Instalação real de hidrante, extintor e sinalização IT-20 executada pela Extin Seven",
    imageCaption: "Execução real Extin Seven: abrigo de hidrante lacrado, extintor em tripé, acionador de alarme e sinalização IT-20.",
    ctaPrimary: "Agendar Levantamento para AVCB",
    whatsappPrompt:
      "Olá! Preciso de levantamento técnico ou adequação para aprovação de vistoria do Corpo de Bombeiros (AVCB/CLCB).",
    telemetry: [
      { label: "Ensaio Hidrostático", value: "NBR 12779", sub: "Mangueiras Tipo 1 a 5" },
      { label: "Sinalização", value: "IT-20 SP", sub: "Fotoluminescente" },
      { label: "Detecção", value: "EN-54 / UL-FM", sub: "Com e Sem Fio" },
    ],
  },
  {
    id: "gestao-online",
    badge: "Software On-line • Inspeção Mensal NR-23",
    normCode: "NR-23 MTE / GESTÃO DIGITAL",
    title: "Controle Total de Vencimentos e Inspeções em",
    highlight: "Tempo Real.",
    description:
      "Elimine planilhas manuais e multas por extintores ou mangueiras vencidas. Nosso Sistema On-line de Gerenciamento organiza todo o parque de equipamentos com histórico auditável.",
    image: "/images/inspecao-campo-hidrante-br.jpg",
    imageAlt: "Técnico realizando inspeção NR-23 em hidrante com tablet no Brasil",
    imageCaption: "Inspeção mensal NR-23 em campo com registro digital de conformidade, lacres e validade de carga.",
    ctaPrimary: "Conhecer Gestão On-line + NR-23",
    whatsappPrompt:
      "Olá! Quero conhecer o Sistema On-line de Gerenciamento de Equipamentos e a Inspeção Mensal NR-23 da Extin Seven.",
    telemetry: [
      { label: "Inspeção de Campo", value: "Mensal", sub: "Checklist NR-23" },
      { label: "Alertas de Carga", value: "Automático", sub: "Zero Vencimentos" },
      { label: "Relatório Técnico", value: "Auditável", sub: "Pronto para Vistoria" },
    ],
  },
];

export interface QuickTriageItem {
  id: string;
  title: string;
  subtitle: string;
  norm: string;
  urgencyTag: string;
  icon: Icon;
  variant: IconVariant;
  tone: ManometerTone;
  whatsappMessage: string;
}

export const QUICK_TRIAGE_ITEMS: QuickTriageItem[] = [
  {
    id: "recarga-manutencao",
    title: "Extintores Vencendo ou Despressurizados",
    subtitle: "Coleta com frota própria, recarga Nível 2 e 3, ensaio hidrostático e selo INMETRO.",
    norm: "ABNT NBR 12962",
    urgencyTag: "Coleta Programada",
    icon: FireExtinguisher,
    variant: "spray",
    tone: "crimson",
    whatsappMessage:
      "Olá! Preciso de orçamento para manutenção/recarga de extintores de incêndio com selo INMETRO.",
  },
  {
    id: "teste-mangueira",
    title: "Teste Hidrostático em Mangueiras",
    subtitle: "Ensaio obrigatório a cada 12 meses conforme NBR 12779 com secagem, empatamento e laudo.",
    norm: "ABNT NBR 12779",
    urgencyTag: "Laudo Anual",
    icon: Drop,
    variant: "flow",
    tone: "emerald",
    whatsappMessage:
      "Olá! Preciso realizar o Teste Hidrostático anual em mangueiras de incêndio (NBR 12779).",
  },
  {
    id: "adequacao-avcb",
    title: "Vistoria do Bombeiro / AVCB",
    subtitle: "Levantamento em planta, adequação física de sinalização, alarmes, portas corta-fogo e hidrantes.",
    norm: "IT-20 / AVCB-SP",
    urgencyTag: "Regularização Completa",
    icon: ShieldCheck,
    variant: "shield",
    tone: "amber",
    whatsappMessage:
      "Olá! Minha empresa/condomínio precisa de adequação para vistoria do Corpo de Bombeiros (AVCB/CLCB).",
  },
  {
    id: "inspecao-nr23",
    title: "Inspeção Mensal NR-23 + Software",
    subtitle: "Terceirização da ronda técnica mensal com registro no Sistema On-line de Gerenciamento.",
    norm: "NR-23 / Digital",
    urgencyTag: "Gestão Contínua",
    icon: QrCode,
    variant: "radar",
    tone: "obsidian",
    whatsappMessage:
      "Olá! Gostaria de proposta para Inspeção Mensal NR-23 e acesso ao Sistema On-line de Gerenciamento.",
  },
];

export interface ServiceItem {
  id: string;
  number: string;
  category: "manutencao" | "gestao" | "engenharia";
  title: string;
  normCode: string;
  frequency: string;
  shortDesc: string;
  specs: string[];
  image: string;
  imageAlt: string;
  icon: Icon;
  variant: IconVariant;
  tone: ManometerTone;
  whatsappText: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: "manutencao-em-extintores-de-incendio",
    number: "01",
    category: "manutencao",
    title: "Manutenção e Recarga em Extintores de Incêndio",
    normCode: "ABNT NBR 12962 • Portarias INMETRO",
    frequency: "Recarga Anual / Ensaio 5 Anos",
    shortDesc:
      "Manutenção preventiva e corretiva de Níveis 1, 2 e 3, recarga certificada (Água, PQS BC/ABC, CO₂, Espuma Mecânica e Lítio) com anel de identificação e selo de conformidade INMETRO.",
    specs: [
      "Desmontagem completa, limpeza e avaliação interna do cilindro",
      "Calibração ou substituição de manômetro e válvula de descarga",
      "Ensaio hidrostático de baixa e alta pressão a cada 5 anos",
      "Frota própria para retirada e entrega com extintores reserva quando contratado",
    ],
    image: "/images/extintor-sinalizacao-abnt.jpg",
    imageAlt: "Extintor de incêndio certificado com placa ABNT e selo Extin Seven",
    icon: FireExtinguisher,
    variant: "spray",
    tone: "crimson",
    whatsappText:
      "Olá! Gostaria de solicitar orçamento para Manutenção e Recarga em Extintores de Incêndio.",
  },
  {
    id: "teste-hidrostatico-em-mangueira-de-incendio",
    number: "02",
    category: "manutencao",
    title: "Teste Hidrostático em Mangueira de Incêndio",
    normCode: "ABNT NBR 12779 • NBR 11861",
    frequency: "Obrigatório a cada 12 meses",
    shortDesc:
      "Ensaio hidrostático rigoroso em bancada para avaliar resistência à pressão, vedação das uniões Storz, ausência de vazamentos e integridade têxtil das mangueiras Tipo 1 a Tipo 5.",
    specs: [
      "Inspeção dimensional, verificação de comprimento e desgaste por abrasão",
      "Reempatamento de uniões Storz e substituição de anéis de borracha",
      "Secagem técnica controlada e vincagem correta para armazenamento no abrigo",
      "Emissão de certificado/laudo técnico rastreável para fiscalização e AVCB",
    ],
    image: "/images/teste-hidrostatico-jato-br.jpg",
    imageAlt: "Teste prático de pressão em mangueira e hidrante de incêndio no Brasil",
    icon: Drop,
    variant: "flow",
    tone: "emerald",
    whatsappText:
      "Olá! Gostaria de solicitar orçamento para Teste Hidrostático em Mangueiras de Incêndio (NBR 12779).",
  },
  {
    id: "inspecao-mensal-nr-23",
    number: "03",
    category: "gestao",
    title: "Inspeção Mensal NR-23 em Campo",
    normCode: "NR-23 MTE • IT-21 Bombeiros",
    frequency: "Ciclo Mensal Preventivo",
    shortDesc:
      "Verificação técnica presencial de todos os extintores, hidrantes, mangueiras, portas corta-fogo e sinalizações para garantir prontidão operacional imediata e conformidade trabalhista.",
    specs: [
      "Checagem de pressão no manômetro, lacre, pino de segurança e mangote",
      "Verificação de desobstrução de piso, suporte e placa fotoluminescente IT-20",
      "Inspeção de caixas de hidrante, chaves Storz, esguichos e registros globo",
      "Preenchimento de ficha de controle e atualização imediata no sistema digital",
    ],
    image: "/images/inspecao-campo-hidrante-br.jpg",
    imageAlt: "Técnico realizando inspeção mensal NR-23 em abrigo de hidrante no Brasil",
    icon: ClipboardText,
    variant: "stamp",
    tone: "amber",
    whatsappText:
      "Olá! Gostaria de orçamento para o serviço de Inspeção Mensal NR-23 na minha empresa.",
  },
  {
    id: "gestao-de-equipamentos-de-incendio",
    number: "04",
    category: "gestao",
    title: "Gestão Completa de Equipamentos de Incêndio",
    normCode: "CONTROLE PATRIMONIAL & TÉCNICO",
    frequency: "Gestão Contínua 365 Dias",
    shortDesc:
      "Controle integral do inventário de prevenção e combate a incêndio da sua planta: mapeamento por setor, histórico de manutenções, cronograma de recargas e organização documental.",
    specs: [
      "Mapeamento completo por prédio, pavimento, setor e classe de risco",
      "Previsibilidade orçamentária de recargas e testes hidrostáticos anuais",
      "Eliminação de multas por equipamentos vencidos ou fora da posição",
      "Dossiê técnico sempre pronto para auditorias ISO, seguradoras e Bombeiros",
    ],
    image: "/images/inspecao-carreta-tablet-br.jpg",
    imageAlt: "Gestão técnica de extintor carreta com tablet em planta industrial brasileira",
    icon: QrCode,
    variant: "radar",
    tone: "obsidian",
    whatsappText:
      "Olá! Quero saber mais sobre o serviço de Gestão Completa de Equipamentos de Incêndio.",
  },
  {
    id: "sistema-online-de-gerenciamento-de-equipamentos-de-incendio",
    number: "05",
    category: "gestao",
    title: "Sistema On-line de Gerenciamento",
    normCode: "PLATAFORMA WEB EXTIN SEVEN",
    frequency: "Acesso 24/7 em Nuvem",
    shortDesc:
      "Software exclusivo para acompanhar em tempo real o status de cada extintor, mangueira e hidrante: vencimentos, histórico de inspeções, relatórios fotográficos e conformidade por unidade.",
    specs: [
      "Painel gerencial com indicadores de equipamentos conformes, a vencer e em manutenção",
      "Consulta rápida de certificados, relatórios de inspeção NR-23 e histórico por item",
      "Visão multi-unidades para indústrias, redes varejistas e condomínios logísticos",
      "Alertas antecipados de vencimento de carga (1 ano) e teste hidrostático (5 anos)",
    ],
    image: "/images/inspecao-nr23-tablet-br.jpg",
    imageAlt: "Técnico operando sistema de gestão de equipamentos de incêndio via tablet",
    icon: DesktopTower,
    variant: "pressure",
    tone: "emerald",
    whatsappText:
      "Olá! Gostaria de uma demonstração do Sistema On-line de Gerenciamento de Equipamentos da Extin Seven.",
  },
  {
    id: "bombeiro-civil-mensal",
    number: "06",
    category: "engenharia",
    title: "Bombeiro Civil Mensal",
    normCode: "ABNT NBR 14608 • LEI 11.901/09",
    frequency: "Alocação Mensal / Turnos",
    shortDesc:
      "Alocação de profissionais bombeiros civis qualificados para prevenção permanente, rondas técnicas, liberação de trabalho a quente, primeiros socorros e resposta imediata a emergências.",
    specs: [
      "Profissionais habilitados e reciclados conforme NBR 14608 e IT-17",
      "Rondas preventivas diárias em sistemas de hidrantes, bombas e centrais de alarme",
      "Apoio a treinamentos de brigada de incêndio, planos de abandono e primeiros socorros",
      "Cobertura para indústrias, shoppings, hospitais, centros logísticos e condomínios",
    ],
    image: "/images/teste-hidrostatico-neblina-br.jpg",
    imageAlt: "Operação prática de linha de mangueira com jato neblina por profissional em campo",
    icon: UsersThree,
    variant: "shield",
    tone: "crimson",
    whatsappText:
      "Olá! Gostaria de cotação para alocação de Bombeiro Civil Mensal na minha empresa.",
  },
  {
    id: "recarga-em-cilindros-de-ar-respiravel",
    number: "07",
    category: "manutencao",
    title: "Recarga em Cilindros de Ar Respirável (EPR)",
    normCode: "ABNT NBR 12543 • NBR 13716",
    frequency: "Recarga & Teste de Qualidade do Ar",
    shortDesc:
      "Recarga de alta pureza e manutenção técnica em cilindros de ar comprimido respirável (EPR / máscara autônoma) utilizados em combate a incêndio, espaço confinado (NR-33) e resgate.",
    specs: [
      "Ar respirável filtrado e monitorado livre de óleo, CO e contaminantes",
      "Atendimento a cilindros de aço e fibra de carbono (200 bar / 300 bar)",
      "Inspeção de válvulas, manômetros de cilindro e teste hidrostático periódico",
      "Essencial para equipes de resgate, espaço confinado NR-33 e brigadas industriais",
    ],
    image: "/images/manometro-calibracao-inmetro.jpg",
    imageAlt: "Manômetro de precisão em bancada de calibração e pressurização",
    icon: Cylinder,
    variant: "valve",
    tone: "amber",
    whatsappText:
      "Olá! Preciso de orçamento para Recarga em Cilindros de Ar Respirável (EPR).",
  },
  {
    id: "instalacao-programacao-e-manutencao-em-alarme-de-incendio",
    number: "08",
    category: "engenharia",
    title: "Instalação, Programação e Manutenção em Alarme de Incêndio",
    normCode: "ABNT NBR 17240 • EN-54 • UL/FM",
    frequency: "Instalação & Manutenção Preventiva",
    shortDesc:
      "Engenharia completa para sistemas de detecção e alarme de incêndio endereçáveis, convencionais e sem fio (Wireless EVO1000, Tanda UK EN-54 e Bosch UL/FM).",
    specs: [
      "Instalação sem quebra-quebra com tecnologia Wireless Zigbee 3.0 (EVO1000)",
      "Programação de laços endereçáveis, matriz de causa e efeito e planta baixa na central",
      "Testes funcionais com spray de fumaça padrão em detectores ópticos e termovelocimétricos",
      "Manutenção corretiva de falhas de laço, baterias, acionadores manuais e sirenes",
    ],
    image: "/images/acionador-alarme-abnt.jpg",
    imageAlt: "Acionador manual de alarme de incêndio instalado com placa fotoluminescente IT-20",
    icon: BellRinging,
    variant: "siren",
    tone: "crimson",
    whatsappText:
      "Olá! Preciso de instalação, programação ou manutenção em Sistema de Alarme de Incêndio.",
  },
  {
    id: "contratos-de-fornecimento",
    number: "09",
    category: "gestao",
    title: "Contratos de Fornecimento e Manutenção Contínua",
    normCode: "SLA CORPORATIVO & INDUSTRIAL",
    frequency: "Contrato Anual / Plurianual",
    shortDesc:
      "Fornecimento programado de equipamentos, recargas, testes hidrostáticos e suporte técnico prioritário com tabela de preços fixada e atendimento dedicado para sua planta.",
    specs: [
      "Tabela corporativa fixada para extintores, mangueiras, sinalização e peças de reposição",
      "Atendimento prioritário em caso de uso emergencial ou exigência de fiscalização",
      "Inclusão de inspeção mensal NR-23 e acesso ao Sistema On-line de Gerenciamento",
      "Redução de custos operacionais e eliminação de cotações avulsas de última hora",
    ],
    image: "/images/sede-frota-extin-seven.jpg",
    imageAlt: "Frota própria da Extin Seven em frente à sede em Jundiaí para atendimento de contratos",
    icon: Handshake,
    variant: "truck",
    tone: "obsidian",
    whatsappText:
      "Olá! Tenho interesse em firmar um Contrato de Fornecimento e Manutenção Contínua com a Extin Seven.",
  },
  {
    id: "adequacao-a-vistoria-do-corpo-de-bombeiros",
    number: "10",
    category: "engenharia",
    title: "Adequação à Vistoria do Corpo de Bombeiros (AVCB / CLCB)",
    normCode: "ITs CORPO DE BOMBEIROS SP",
    frequency: "Emissão e Renovação AVCB / CLCB",
    shortDesc:
      "Levantamento técnico minucioso em campo, projeto em planta baixa CAD e execução de todas as adequações físicas exigidas para aprovação na vistoria do Corpo de Bombeiros.",
    specs: [
      "Auditoria pré-vistoria comparando a planta aprovada com a realidade física do imóvel",
      "Instalação de sinalização fotoluminescente IT-20, faixas de escada e placas em Braille",
      "Adequação de portas corta-fogo, barras antipânico, iluminação de emergência e hidrantes",
      "Entrega de todos os equipamentos instalados e certificados dentro das normas vigentes",
    ],
    image: "/images/porta-corta-fogo-rota-fuga.jpg",
    imageAlt: "Porta corta-fogo com barra antipânico, placa fotoluminescente e extintor inox instalados pela Extin Seven",
    icon: ShieldCheck,
    variant: "shield",
    tone: "emerald",
    whatsappText:
      "Olá! Preciso de levantamento técnico e Adequação à Vistoria do Corpo de Bombeiros (AVCB/CLCB).",
  },
];

export interface ProductItem {
  id: string;
  category: "combate" | "alarme" | "sinalizacao";
  badge: string;
  norm: string;
  title: string;
  subtitle: string;
  highlights: string[];
  image: string;
  imageAlt: string;
  icon: Icon;
  variant: IconVariant;
  tone: ManometerTone;
}

export const PRODUCTS: ProductItem[] = [
  {
    id: "extintores-novos-e-lithex",
    category: "combate",
    badge: "Incluindo Linha Especial LITH-EX",
    norm: "ABNT NBR 15808 / INMETRO",
    title: "Extintores de Incêndio Novos (PQS, CO₂, Água e LITH-EX Bateria de Lítio)",
    subtitle:
      "Portáteis e sobre rodas (carretas) certificados pelo INMETRO, além do exclusivo extintor especial LITH-EX para incêndios em baterias de íons de lítio.",
    highlights: [
      "Linha tradicional completa: Água Pressurizada (AP 10L), PQS BC/ABC (4kg a 12kg), CO₂ (4kg e 6kg) e Espuma Mecânica",
      "Linha Especial LITH-EX (1L a 9L e 50L): agente encapsulador para baterias de lítio (empilhadeiras, data centers, veículos elétricos)",
      "Acabamento em aço carbono com pintura eletrostática ou aço inox polido para ambientes corporativos",
    ],
    image: "/images/extintor-lithex-bateria-litio.jpg",
    imageAlt: "Extintor de incêndio LITH-EX especial para baterias de lítio fornecido pela Extin Seven",
    icon: BatteryWarning,
    variant: "flame",
    tone: "crimson",
  },
  {
    id: "alarme-sem-fio-evo1000",
    category: "alarme",
    badge: "Wireless Zigbee 3.0 • Planta na Tela",
    norm: "NBR 17240 • Global Sonic EVO1000",
    title: "Central de Alarme de Incêndio Sem Fio (Wireless EVO1000)",
    subtitle:
      "Instalação limpa, rápida e sem tubulação aparente. A Central EVO1000 exibe a planta baixa do local na tela LCD indicando exatamente o ponto em alarme.",
    highlights: [
      "Comunicação criptografada protocolo Zigbee 3.0 com supervisão contínua de bateria e sinal",
      "Visualização gráfica da planta baixa na tela da central para localização imediata da ocorrência",
      "Detectores de fumaça, temperatura, acionadores manuais, sirenes e repetidores 100% sem fio",
    ],
    image: "/images/central-alarme-wireless-evo1000.jpg",
    imageAlt: "Central de Alarme de Incêndio Wireless EVO1000 Global Sonic com planta baixa na tela",
    icon: Broadcast,
    variant: "radar",
    tone: "emerald",
  },
  {
    id: "alarme-tanda-uk-en54",
    category: "alarme",
    badge: "Certificação Europeia EN-54 / LPCB",
    norm: "EN-54 • LPCB • TNA Technology",
    title: "Alarme de Incêndio Endereçável Tanda UK (EN-54)",
    subtitle:
      "Painéis inteligentes de detecção e alarme com certificação internacional LPCB e EN-54 para indústrias, hospitais e empreendimentos de alto padrão.",
    highlights: [
      "Centrais endereçáveis de 1 a 8 laços com display touch/LCD de alta precisão",
      "Detectores ópticos, térmicos e multicritério com compensação automática de sujeira",
      "Módulos de entrada/saída, isoladores de curto-circuito, sirenes audiovisuais e fontes auxiliares",
    ],
    image: "/images/alarme-tanda-uk-en54.jpg",
    imageAlt: "Linha completa de alarme de incêndio Tanda UK TNA Technology com certificação EN-54 e LPCB",
    icon: Siren,
    variant: "siren",
    tone: "crimson",
  },
  {
    id: "alarme-certificacao-ul-fm-en54",
    category: "alarme",
    badge: "Projetos Segurados • UL / FM & EN-54",
    norm: "UL / FM Global • EN-54 • Bosch",
    title: "Sistemas de Detecção e Alarme com Certificação UL/FM e EN-54",
    subtitle:
      "Equipamentos homologados pelas maiores seguradoras globais (FM Global / UL) para centros de distribuição, farmacêuticas, químicas e multinacionais.",
    highlights: [
      "Atendimento integral a exigências de seguradoras internacionais (FM Global / UL Listed)",
      "Alta imunidade a alarmes falsos em ambientes industriais severos",
      "Integração com sistemas de sprinklers, bombas de incêndio, dampers e controle de acesso",
    ],
    image: "/images/alarme-bosch-ulfm-en54.jpg",
    imageAlt: "Detector de incêndio Bosch com certificação UL/FM e EN-54",
    icon: ShieldCheck,
    variant: "shield",
    tone: "obsidian",
  },
  {
    id: "mangueiras-e-equipamentos-hidrante",
    category: "combate",
    badge: "Tipos 1, 2, 3, 4 e 5 • Certificadas",
    norm: "ABNT NBR 11861",
    title: "Mangueiras de Incêndio e Equipamentos de Hidrante",
    subtitle:
      "Mangueiras certificadas ABNT para condomínios (Tipo 1), comércio/indústria (Tipo 2), área naval/industrial (Tipo 3) e petroquímica/alta abrasão (Tipos 4 e 5).",
    highlights: [
      "Lances de 15m, 20m, 25m e 30m nos diâmetros 1.1/2\" e 2.1/2\" com uniões Storz em latão",
      "Acompanham certificado de conformidade ABNT NBR 11861",
      "Disponíveis para pronta entrega ou reposição imediata durante o teste hidrostático",
    ],
    image: "/images/mangueiras-hidrante-nbr11861.jpg",
    imageAlt: "Mangueiras de incêndio certificadas NBR 11861 e válvulas de hidrante",
    icon: Drop,
    variant: "flow",
    tone: "emerald",
  },
  {
    id: "acessorios-para-hidrante",
    category: "combate",
    badge: "Latão Fundido & Usinado",
    norm: "NBR 14349 • NBR 14870",
    title: "Acessórios Hidráulicos para Hidrante (Storz, Esguichos e Registros)",
    subtitle:
      "Linha completa de metais hidráulicos de combate a incêndio para montagem e manutenção de redes de hidrantes e recalque.",
    highlights: [
      "Esguichos reguláveis (jato sólido e neblina) e esguichos jato sólido em latão ou alumínio",
      "Válvulas globo angulares 45° e 90° (2.1/2\"), adaptadores Storz, tampões com corrente e chaves",
      "Derivantes em Y, reduções giratórias e grelhas de recalque de passeio",
    ],
    image: "/images/acessorios-hidrante-storz.jpg",
    imageAlt: "Registros globo e conexões de hidrante em latão e ferro fundido",
    icon: Wrench,
    variant: "valve",
    tone: "amber",
  },
  {
    id: "abrigos-de-hidrante-e-extintores",
    category: "combate",
    badge: "Sobrepor ou Embutir • Aço / Fibra",
    norm: "Padrão Corpo de Bombeiros",
    title: "Caixas de Abrigo para Hidrantes e Extintores",
    subtitle:
      "Abrigos em chapa de aço carbono com pintura eletrostática epóxi vermelha, aço inox ou fibra de vidro (PRFV) para ambientes corrosivos.",
    highlights: [
      "Modelos de embutir ou sobrepor com cesto meia-lua ou pino para mangueira",
      "Visor em vidro/acrílico com inscrição 'INCÊNDIO', ventilação frontal e fecho engate rápido",
      "Tamanhos padrão (75x45x17cm, 90x60x17cm, 90x120x30cm) e medidas especiais",
    ],
    image: "/images/abrigo-hidrante-extintor.jpg",
    imageAlt: "Caixa de abrigo vermelha instalada com mangueira de incêndio e extintor",
    icon: Wall,
    variant: "shield",
    tone: "crimson",
  },
  {
    id: "sinalizacao-de-emergencia-it20",
    category: "sinalizacao",
    badge: "Fotoluminescente Homologada",
    norm: "IT-20 SP • ABNT NBR 16820",
    title: "Placas de Sinalização de Emergência Fotoluminescentes (IT-20)",
    subtitle:
      "Placas em PVC rígido anti-chama com fotoluminescência certificada (CNPJ e fabricante impressos na placa conforme exigência do Corpo de Bombeiros).",
    highlights: [
      "Sinalização de rotas de fuga (S1 a S17), equipamentos de combate (E1 a E9) e alerta/proibição",
      "Fitas fotoluminescentes e faixas antiderrapantes para degraus de escadas de emergência",
      "Autonomia luminosa de até 30 horas após corte de energia elétrica",
    ],
    image: "/images/sinalizacao-fotoluminescente-escada.jpg",
    imageAlt: "Sinalização fotoluminescente de emergência brilhando no escuro em escada de rota de fuga",
    icon: Signpost,
    variant: "stamp",
    tone: "emerald",
  },
  {
    id: "suportes-para-extintores",
    category: "combate",
    badge: "Parede, Solo, Tripé e Veicular",
    norm: "NR-23 • IT-21",
    title: "Suportes para Extintores (Tripé, Bicromatizado, Inox e Parede)",
    subtitle:
      "Soluções de fixação e apoio para posicionamento regulamentar de extintores sem necessidade de furação ou em paredes estruturais.",
    highlights: [
      "Suportes de solo tipo tripé cromado, inox, pintado vermelho ou modelo torre com haste e placa",
      "Suportes de parede tipo L reforçado para PQS, Água e cilindros pesados de CO₂",
      "Suportes veiculares com fecho rápido para caminhões, frotas e máquinas pesadas",
    ],
    image: "/images/suportes-extintores-tripe.jpg",
    imageAlt: "Extintor de incêndio instalado em suporte regulamentar com sinalização",
    icon: FireExtinguisher,
    variant: "wrench",
    tone: "obsidian",
  },
  {
    id: "acessibilidade-placas-braille",
    category: "sinalizacao",
    badge: "Sinalização Tátil + Braille",
    norm: "ABNT NBR 9050",
    title: "Acessibilidade: Placas em Braille, Relevo Tátil e Piso Tátil",
    subtitle:
      "Adequação completa de acessibilidade conforme NBR 9050 para aprovação de AVCB, habite-se e inclusão em edifícios comerciais, hospitais e condomínios.",
    highlights: [
      "Placas de identificação de ambientes e pavimentos em alto-relevo e escrita Braille",
      "Anéis e placas táteis para corrimão indicando início e fim de escadas e pavimentos",
      "Mapa tátil em Braille e sinalização de sanitários PNE e vagas acessíveis",
    ],
    image: "/images/placa-acessibilidade-braille.jpg",
    imageAlt: "Placa de acessibilidade em alto-relevo e Braille padrão ABNT NBR 9050",
    icon: Wheelchair,
    variant: "stamp",
    tone: "amber",
  },
];

export interface GalleryItem {
  id: string;
  title: string;
  locationTag: string;
  normTag: string;
  description: string;
  image: string;
}

export const REAL_GALLERY: GalleryItem[] = [
  {
    id: "gal-sede",
    title: "Sede Própria e Frota Dedicada Extin Seven",
    locationTag: "Jundiaí / SP — Bairro dos Fernandes",
    normTag: "Oficina & Logística Própria",
    description:
      "Estrutura própria na Av. Caminho de Goiás, 699 em Jundiaí/SP com frota identificada para coleta, entrega e atendimento técnico ágil em toda a região e Grande São Paulo.",
    image: "/images/sede-frota-extin-seven.jpg",
  },
  {
    id: "gal-hospital",
    title: "Adequação Completa em Ambiente Hospitalar",
    locationTag: "Instalação Executada em Campo",
    normTag: "IT-20 • NBR 12962 • NBR 17240",
    description:
      "Abrigo de hidrante sinalizado e lacrado, extintor em suporte tripé, acionador manual endereçável, avisador audiovisual e placas fotoluminescentes IT-20.",
    image: "/images/instalacao-hidrante-hospital-br.jpg",
  },
  {
    id: "gal-rota-fuga",
    title: "Porta Corta-Fogo, Barra Antipânico e Extintor Inox",
    locationTag: "Saída de Emergência Corporativa",
    normTag: "NBR 11742 • IT-11 • IT-20",
    description:
      "Adequação de saída de emergência com porta corta-fogo, barra antipânico dupla, sinalização fotoluminescente de rota de fuga e extintor em acabamento inox.",
    image: "/images/porta-corta-fogo-rota-fuga.jpg",
  },
  {
    id: "gal-escada",
    title: "Balizamento Fotoluminescente em Escada de Emergência",
    locationTag: "Ensaio no Escuro (Corte de Energia)",
    normTag: "IT-20 Corpo de Bombeiros",
    description:
      "Faixas fotoluminescentes de alto desempenho aplicadas nos degraus da rota de fuga vertical, garantindo evacuação segura mesmo em blackout total.",
    image: "/images/sinalizacao-fotoluminescente-escada.jpg",
  },
  {
    id: "gal-planta-cad",
    title: "Projeto Técnico e Mapeamento em Planta Baixa (CAD)",
    locationTag: "Engenharia de Segurança Contra Incêndio",
    normTag: "Levantamento Técnico AVCB",
    description:
      "Detalhamento em planta baixa (Escada, Elevador, Hall, Bomba de Incêndio e Alarme) definindo a posição exata de cada placa IT-20 e equipamento de combate.",
    image: "/images/projeto-planta-baixa-cad.jpg",
  },
  {
    id: "gal-lithex",
    title: "Extintor Especial LITH-EX para Baterias de Lítio",
    locationTag: "Proteção de Novas Tecnologias",
    normTag: "Agente Encapsulador Especial",
    description:
      "Fornecimento de extintores especiais à base de agente encapsulador para combate a incêndios em baterias de íons de lítio e equipamentos energizados.",
    image: "/images/extintor-lithex-bateria-litio.jpg",
  },
  {
    id: "gal-inspecao-nr23",
    title: "Inspeção Mensal NR-23 com Coletor Digital",
    locationTag: "Planta Industrial",
    normTag: "NR-23 MTE • Sistema On-line",
    description:
      "Verificação mensal em campo de abrigos de hidrante e extintores com registro imediato no Sistema On-line de Gerenciamento da Extin Seven.",
    image: "/images/inspecao-campo-hidrante-br.jpg",
  },
  {
    id: "gal-teste-hidrante",
    title: "Teste de Pressão, Vazão e Mangueiras de Hidrante",
    locationTag: "Comissionamento Hidráulico",
    normTag: "NBR 12779 • NBR 13714",
    description:
      "Ensaio prático de linha de hidrante industrial verificando pressão dinâmica, acoplamento Storz e alcance de jato sólido e neblina.",
    image: "/images/teste-hidrostatico-jato-br.jpg",
  },
];

export const TECHNICAL_PILLARS = [
  {
    title: "Sede e Oficina Própria em Jundiaí",
    desc: "Nada de intermediários sem estrutura: contamos com sede própria na Av. Caminho de Goiás, 699, bancadas de ensaio e frota dedicada.",
    icon: Factory,
    variant: "shield" as IconVariant,
    tone: "crimson" as ManometerTone,
  },
  {
    title: "Rastreabilidade INMETRO & Sistema On-line",
    desc: "Cada equipamento recebe controle individualizado e sua empresa acompanha vencimentos, laudos e inspeções NR-23 pela internet.",
    icon: Gauge,
    variant: "pressure" as IconVariant,
    tone: "emerald" as ManometerTone,
  },
  {
    title: "Engenharia Ponta a Ponta para o AVCB",
    desc: "Do projeto em planta CAD até a recarga de extintores, alarme wireless/EN-54 e placas IT-20: você resolve tudo em um único fornecedor.",
    icon: CompassTool,
    variant: "stamp" as IconVariant,
    tone: "amber" as ManometerTone,
  },
];

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Diagnóstico Técnico ou Levantamento em Campo",
    desc: "Analisamos sua relação de extintores/mangueiras ou realizamos visita técnica na sua planta em Jundiaí, região ou Grande SP para mapear pendências do AVCB e NR-23.",
    badge: "Sem Compromisso",
    icon: CompassTool,
    variant: "radar" as IconVariant,
  },
  {
    step: "02",
    title: "Coleta Programada com Frota Própria",
    desc: "Nossa equipe uniformizada realiza a retirada programada dos cilindros e mangueiras, mantendo sua operação protegida durante o processo.",
    badge: "Logística Própria",
    icon: Truck,
    variant: "truck" as IconVariant,
  },
  {
    step: "03",
    title: "Manutenção Certificada e Ensaio Hidrostático",
    desc: "Execução de recarga Nível 2/3 (NBR 12962) e teste hidrostático de mangueiras (NBR 12779) em nossa sede, com aplicação do selo INMETRO e anel do ano.",
    badge: "Rigor Normativo",
    icon: Certificate,
    variant: "pressure" as IconVariant,
  },
  {
    step: "04",
    title: "Entrega, Laudo Técnico e Ativação no Sistema On-line",
    desc: "Reinstalamos os equipamentos nos pontos corretos, emitimos os laudos para o Corpo de Bombeiros e liberamos seu painel no Sistema On-line de Gerenciamento.",
    badge: "100% Auditável",
    icon: CheckCircle,
    variant: "shield" as IconVariant,
  },
];

export const FAQ_ITEMS = [
  {
    q: "Qual é a periodicidade obrigatória para recarga de extintores e teste hidrostático de mangueiras?",
    a: "Conforme a ABNT NBR 12962 e portarias do INMETRO, a manutenção de 2º nível (recarga) dos extintores deve ser realizada a cada 12 meses (ou imediatamente após o uso/despressurização), e o ensaio hidrostático do cilindro a cada 5 anos. Já as mangueiras de incêndio devem passar por inspeção a cada 6 meses e Teste Hidrostático obrigatório a cada 12 meses conforme a ABNT NBR 12779.",
  },
  {
    q: "Como funciona o Sistema On-line de Gerenciamento de Equipamentos da Extin Seven?",
    a: "Nosso software web cataloga todos os extintores, mangueiras e hidrantes da sua empresa por setor e pavimento. Pelo portal, gestores de SST, facilities e síndicos visualizam em tempo real quais equipamentos estão conformes, próximos do vencimento ou em manutenção, além de baixar certificados e relatórios da Inspeção Mensal NR-23 para auditorias e vistorias.",
  },
  {
    q: "A Central de Alarme de Incêndio Sem Fio (Wireless EVO1000) é aceita pelo Corpo de Bombeiros?",
    a: "Sim! A central Wireless EVO1000 atende aos requisitos normativos (NBR 17240), opera em protocolo industrial Zigbee 3.0 com supervisão contínua de sinal e bateria, e ainda exibe a planta baixa do empreendimento na tela LCD. É a solução ideal para prédios em operação, hospitais, escolas, galpões e condomínios onde quebrar paredes ou passar eletrodutos aparentes seria inviável.",
  },
  {
    q: "O que são os extintores LITH-EX para baterias de íons de lítio?",
    a: "Incêndios em baterias de íons de lítio (presentes em empilhadeiras elétricas, nobreaks, data centers, veículos elétricos e ferramentas industriais) sofrem o fenômeno de 'thermal runaway' (fuga térmica), que extintores comuns de PQS ou CO₂ não conseguem resfriar. O extintor LITH-EX utiliza agente encapsulador especial que resfria drasticamente a célula e bloqueia a reignição.",
  },
  {
    q: "Quais regiões a Extin Seven atende com frota própria?",
    a: "Nossa sede própria fica estrategicamente localizada em Jundiaí/SP (Av. Caminho de Goiás, 699 — próximo às rodovias Anhanguera e Bandeirantes), atendendo com agilidade Jundiaí, São Paulo (Capital e Grande SP), Campinas, Itupeva, Louveira, Vinhedo, Várzea Paulista, Campo Limpo Paulista, Cajamar, Barueri/Alphaville, Indaiatuba, Atibaia e Sorocaba.",
  },
  {
    q: "Vocês fazem tanto o projeto quanto a adequação física para tirar ou renovar o AVCB/CLCB?",
    a: "Sim. Realizamos o levantamento técnico em campo, apontamos todas as não-conformidades em planta baixa e executamos o fornecimento e instalação completa: sinalização fotoluminescente IT-20 (com CNPJ impresso), iluminação e alarme de incêndio, adequação de portas corta-fogo, abrigos de hidrante, acessibilidade em Braille e emissão dos laudos de equipamentos.",
  },
];

// All 48 SEO Technical Solutions from /mapa-site and /informacoes preserved for search engines & technical lookup
export const SEO_TECHNICAL_INDEX: { category: string; items: { slug: string; label: string }[] }[] = [
  {
    category: "Manutenção, Recarga e Ensaios (INMETRO / ABNT)",
    items: [
      { slug: "manutencao-em-extintores-de-incendio", label: "Manutenção em Extintores de Incêndio" },
      { slug: "empresa-de-manutencao-de-extintores", label: "Empresa de Manutenção de Extintores" },
      { slug: "manutencao-de-extintores-certificada-pelo-inmetro", label: "Manutenção de Extintores Certificada pelo INMETRO" },
      { slug: "recarga-de-extintores-de-incendio", label: "Recarga de Extintores de Incêndio" },
      { slug: "inspecao-tecnica-em-extintores", label: "Inspeção Técnica em Extintores" },
      { slug: "teste-hidrostatico-em-mangueira-de-incendio", label: "Teste Hidrostático em Mangueira de Incêndio" },
      { slug: "teste-hidrostatico-nbr-12779", label: "Teste Hidrostático NBR 12779" },
      { slug: "empresa-de-teste-em-mangueira-de-incendio", label: "Empresa de Teste em Mangueira de Incêndio" },
      { slug: "manutencao-em-mangueira-de-incendio", label: "Manutenção em Mangueira de Incêndio" },
      { slug: "recarga-em-cilindros-de-ar-respiravel", label: "Recarga em Cilindros de Ar Respirável" },
      { slug: "recarga-de-cilindros-de-ar-respiravel", label: "Recarga de Cilindros de Ar Respirável" },
      { slug: "manutencao-em-cilindros-de-ar-comprimido", label: "Manutenção em Cilindros de Ar Comprimido" },
    ],
  },
  {
    category: "Inspeção NR-23, Gestão e Software On-line",
    items: [
      { slug: "inspecao-mensal-nr-23", label: "Inspeção Mensal NR 23" },
      { slug: "inspecao-nr-23-em-equipamentos-de-incendio", label: "Inspeção NR 23 em Equipamentos de Incêndio" },
      { slug: "adequacao-a-nr-23-em-empresa", label: "Adequação à NR 23 em Empresa" },
      { slug: "gestao-de-equipamentos-de-incendio", label: "Gestão de Equipamentos de Incêndio" },
      { slug: "controle-de-equipamentos-de-combate-a-incendio", label: "Controle de Equipamentos de Combate a Incêndio" },
      { slug: "gestao-de-manutencao-de-extintores-e-mangueiras", label: "Gestão de Manutenção de Extintores e Mangueiras" },
      { slug: "sistema-online-de-gerenciamento-de-equipamentos-de-incendio", label: "Sistema On-line de Gerenciamento de Equipamentos" },
      { slug: "software-para-gestao-de-extintores", label: "Software para Gestão de Extintores" },
      { slug: "controle-online-de-inspecoes-de-incendio", label: "Controle On-line de Inspeções de Incêndio" },
      { slug: "contratos-de-fornecimento", label: "Contratos de Fornecimento" },
      { slug: "contrato-de-manutencao-de-equipamentos-de-incendio", label: "Contrato de Manutenção de Equipamentos de Incêndio" },
      { slug: "fornecimento-continuo-de-equipamentos-de-incendio", label: "Fornecimento Contínuo de Equipamentos de Incêndio" },
    ],
  },
  {
    category: "Adequação AVCB, Alarmes e Bombeiro Civil",
    items: [
      { slug: "adequacao-a-vistoria-do-corpo-de-bombeiros", label: "Adequação à Vistoria do Corpo de Bombeiros" },
      { slug: "regularizacao-para-vistoria-do-corpo-de-bombeiros", label: "Regularização para Vistoria do Corpo de Bombeiros" },
      { slug: "levantamento-tecnico-para-avcb", label: "Levantamento Técnico para AVCB" },
      { slug: "instalacao-programacao-e-manutencao-em-alarme-de-incendio", label: "Instalação, Programação e Manutenção em Alarme de Incêndio" },
      { slug: "instalacao-de-alarme-de-incendio", label: "Instalação de Alarme de Incêndio" },
      { slug: "manutencao-em-sistema-de-alarme-de-incendio", label: "Manutenção em Sistema de Alarme de Incêndio" },
      { slug: "alarme-de-incendio-sem-fio", label: "Alarme de Incêndio Sem Fio (Wireless)" },
      { slug: "alarme-de-incendio-certificacao-ul-fm-e-en-54", label: "Alarme de Incêndio Certificação UL/FM e EN-54" },
      { slug: "alarme-de-incendio-tanda-uk-en-54", label: "Alarme de Incêndio Tanda UK — EN-54" },
      { slug: "bombeiro-civil-mensal", label: "Bombeiro Civil Mensal" },
      { slug: "terceirizacao-de-bombeiro-civil", label: "Terceirização de Bombeiro Civil" },
      { slug: "empresa-de-bombeiro-civil-para-empresas", label: "Empresa de Bombeiro Civil para Empresas" },
    ],
  },
  {
    category: "Equipamentos, Hidrantes, Sinalização IT-20 e Acessibilidade",
    items: [
      { slug: "mangueiras-e-equipamentos-de-hidrante", label: "Mangueiras e Equipamentos de Hidrante" },
      { slug: "mangueira-de-incendio-certificada-abnt", label: "Mangueira de Incêndio Certificada ABNT" },
      { slug: "equipamentos-para-sistema-de-hidrante", label: "Equipamentos para Sistema de Hidrante" },
      { slug: "extintores-de-incendio-novos", label: "Extintores de Incêndio Novos (PQS, CO₂, Água, LITH-EX)" },
      { slug: "venda-de-extintores-de-incendio-certificados", label: "Venda de Extintores de Incêndio Certificados" },
      { slug: "suporte-para-extintores", label: "Suporte para Extintores (Tripé, Solo e Parede)" },
      { slug: "sinalizacao-de-emergencia", label: "Sinalização de Emergência Fotoluminescente" },
      { slug: "placas-aprovadas-pelo-corpo-de-bombeiros-it20", label: "Placas Aprovadas pelo Corpo de Bombeiros IT-20" },
      { slug: "abrigos-de-hidrante-e-extintores", label: "Abrigos de Hidrante e Extintores" },
      { slug: "caixa-de-abrigo-para-hidrante", label: "Caixa de Abrigo para Hidrante" },
      { slug: "acessorios-para-hidrante", label: "Acessórios para Hidrante (Storz, Esguichos, Registros)" },
      { slug: "acessibilidade", label: "Acessibilidade (Placas em Braille e Sinalização Tátil)" },
    ],
  },
];

export const CLIENT_SECTORS = [
  { label: "Indústrias & Centros Logísticos", icon: Factory, variant: "shield" as IconVariant },
  { label: "Hospitais, Clínicas & Laboratórios", icon: Buildings, variant: "pressure" as IconVariant },
  { label: "Condomínios Residenciais & Corporativos", icon: Wall, variant: "stamp" as IconVariant },
  { label: "Redes Varejistas, Shoppings & Escolas", icon: UsersThree, variant: "radar" as IconVariant },
];
