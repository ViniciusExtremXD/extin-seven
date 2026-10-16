import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import type { Icon } from "@phosphor-icons/react";

export type IconVariant =
  | "spray"
  | "flame"
  | "pressure"
  | "siren"
  | "valve"
  | "shield"
  | "stamp"
  | "radar"
  | "wrench"
  | "truck"
  | "flow";

export type ManometerTone = "crimson" | "emerald" | "amber" | "obsidian" | "light";
export type ManometerSize = "sm" | "md" | "lg";

interface ManometerIconProps {
  icon: Icon;
  variant?: IconVariant;
  tone?: ManometerTone;
  size?: ManometerSize;
  pressureLabel?: string;
  className?: string;
}

const SIZE_MAP: Record<
  ManometerSize,
  { box: string; icon: number; radius: number; stroke: number; svgSize: number }
> = {
  sm: { box: "h-10 w-10 rounded-xl", icon: 18, radius: 17, stroke: 2, svgSize: 40 },
  md: { box: "h-12 w-12 rounded-xl", icon: 22, radius: 21, stroke: 2.2, svgSize: 48 },
  lg: { box: "h-14 w-14 rounded-2xl", icon: 26, radius: 24, stroke: 2.5, svgSize: 56 },
};

const TONE_MAP: Record<
  ManometerTone,
  {
    bg: string;
    fg: string;
    track: string;
    arcIdle: string;
    arcActive: string;
    dot: string;
    ringHover: string;
  }
> = {
  crimson: {
    bg: "bg-brand-50/90 group-hover:bg-brand-600/15",
    fg: "text-brand-600 group-hover:text-brand-600",
    track: "stroke-brand-200/70",
    arcIdle: "stroke-brand-600",
    arcActive: "stroke-gauge-500",
    dot: "bg-gauge-500",
    ringHover: "group-hover:shadow-[0_0_20px_-4px_rgba(200,0,0,0.4)]",
  },
  emerald: {
    bg: "bg-gauge-50/90 group-hover:bg-gauge-500/15",
    fg: "text-gauge-600",
    track: "stroke-gauge-400/30",
    arcIdle: "stroke-gauge-500",
    arcActive: "stroke-gauge-400",
    dot: "bg-gauge-500",
    ringHover: "group-hover:shadow-[0_0_20px_-4px_rgba(16,185,129,0.45)]",
  },
  amber: {
    bg: "bg-signal-50/95 group-hover:bg-signal-500/15",
    fg: "text-signal-600",
    track: "stroke-signal-400/30",
    arcIdle: "stroke-signal-500",
    arcActive: "stroke-gauge-500",
    dot: "bg-signal-500",
    ringHover: "group-hover:shadow-[0_0_20px_-4px_rgba(245,158,11,0.45)]",
  },
  obsidian: {
    bg: "bg-obsidian-800/90 group-hover:bg-brand-600/20",
    fg: "text-brand-400 group-hover:text-white",
    track: "stroke-white/10",
    arcIdle: "stroke-brand-500",
    arcActive: "stroke-gauge-400",
    dot: "bg-gauge-400",
    ringHover: "group-hover:shadow-[0_0_24px_-4px_rgba(225,29,46,0.5)]",
  },
  light: {
    bg: "bg-white/10 group-hover:bg-brand-600/25",
    fg: "text-white group-hover:text-brand-200",
    track: "stroke-white/15",
    arcIdle: "stroke-brand-400",
    arcActive: "stroke-gauge-400",
    dot: "bg-gauge-400",
    ringHover: "group-hover:shadow-[0_0_22px_-4px_rgba(52,211,153,0.45)]",
  },
};

const ANIM_CLASS: Record<IconVariant, string> = {
  spray: "icon-anim-spray",
  flame: "icon-anim-flame",
  pressure: "icon-anim-pressure",
  siren: "icon-anim-siren",
  valve: "icon-anim-valve",
  shield: "icon-anim-shield",
  stamp: "icon-anim-stamp",
  radar: "icon-anim-radar",
  wrench: "icon-anim-wrench",
  truck: "icon-anim-truck",
  flow: "icon-anim-flow",
};

/**
 * Interactive Fire-Engineering Manometer Icon Badge.
 * - Sweeps its SVG manometer pressure arc into the green zone on scroll-into-view.
 * - Plays a bespoke keyframe animation on scroll, hover, focus, or click.
 * - Displays a live micro-needle and operational pressure indicator on interaction.
 */
export const ManometerIcon: React.FC<ManometerIconProps> = ({
  icon: IconComponent,
  variant = "pressure",
  tone = "crimson",
  size = "md",
  pressureLabel = "1.4 MPa",
  className = "",
}) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });
  const [animKey, setAnimKey] = useState(0);
  const [active, setActive] = useState(false);
  const [pulsed, setPulsed] = useState(false);

  const s = SIZE_MAP[size];
  const t = TONE_MAP[tone];
  const circumference = 2 * Math.PI * s.radius;
  // Gauge sweep: 72% on view, 92% on hover/click
  const targetRatio = !inView ? 0 : active ? 0.92 : 0.72;
  const dashOffset = circumference * (1 - targetRatio);

  useEffect(() => {
    if (inView) {
      setAnimKey((k) => k + 1);
    }
  }, [inView]);

  const triggerInteraction = () => {
    setActive(true);
    setAnimKey((k) => k + 1);
  };

  const handleClick = (e: React.MouseEvent) => {
    // Allow parent links/buttons to work normally while still triggering micro-feedback
    setAnimKey((k) => k + 1);
    setPulsed(true);
    window.setTimeout(() => setPulsed(false), 900);
    void e;
  };

  const center = s.svgSize / 2;

  return (
    <motion.span
      ref={ref}
      onMouseEnter={triggerInteraction}
      onMouseLeave={() => setActive(false)}
      onFocus={triggerInteraction}
      onBlur={() => setActive(false)}
      onClick={handleClick}
      whileHover={{ scale: 1.08, rotate: active ? 2 : 0 }}
      whileTap={{ scale: 0.93 }}
      transition={{ type: "spring", stiffness: 380, damping: 18 }}
      title={`Status Operacional: ${pressureLabel} OK — Clique ou passe o mouse para testar`}
      className={`relative inline-flex shrink-0 cursor-pointer select-none items-center justify-center transition-shadow duration-300 ${s.box} ${t.bg} ${t.fg} ${t.ringHover} ${className}`}
    >
      {/* Precision Manometer Gauge Ring */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full -rotate-[135deg]"
        viewBox={`0 0 ${s.svgSize} ${s.svgSize}`}
        fill="none"
        aria-hidden="true"
      >
        {/* Background Dial Track */}
        <circle
          cx={center}
          cy={center}
          r={s.radius}
          strokeWidth={s.stroke}
          strokeDasharray={`${circumference * 0.75} ${circumference}`}
          strokeLinecap="round"
          className={t.track}
        />
        {/* Pressurized Operational Arc */}
        <circle
          cx={center}
          cy={center}
          r={s.radius}
          strokeWidth={s.stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          className={`transition-all duration-700 ease-out ${
            active || pulsed ? t.arcActive : t.arcIdle
          }`}
        />
      </svg>

      {/* Operational Green Zone Status LED Dot */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5 items-center justify-center rounded-full ring-2 ring-white/80 transition-transform duration-300 ${
          active || pulsed ? "scale-125" : "scale-100"
        } ${t.dot}`}
      >
        {(active || pulsed) && (
          <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${t.dot}`} />
        )}
      </span>

      {/* Animated Glyph */}
      <span
        key={animKey}
        className={`inline-flex items-center justify-center ${
          animKey > 0 ? ANIM_CLASS[variant] : ""
        }`}
      >
        <IconComponent size={s.icon} weight="duotone" />
      </span>

      {/* Micro Pressure Readout Tag on Click / Hover */}
      {pulsed && (
        <span className="pointer-events-none absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-obsidian-950 px-1.5 py-0.5 font-mono text-[9px] font-semibold tracking-wider text-gauge-400 shadow-md">
          {pressureLabel}
        </span>
      )}
    </motion.span>
  );
};

interface InteractiveMiniIconProps {
  icon: Icon;
  size?: number;
  weight?: "regular" | "bold" | "fill" | "duotone";
  variant?: "rotate" | "pulse" | "nudge" | "bounce" | "spark";
  className?: string;
}

/**
 * Interactive wrapper for inline/micro icons (buttons, pills, nav links, checklists)
 * so every single icon on the screen has physics, hover response, and tap feedback.
 */
export const InteractiveMiniIcon: React.FC<InteractiveMiniIconProps> = ({
  icon: IconComponent,
  size = 18,
  weight = "duotone",
  variant = "bounce",
  className = "",
}) => {
  const hoverEffect =
    variant === "rotate"
      ? { rotate: 18, scale: 1.18 }
      : variant === "nudge"
      ? { x: 3, scale: 1.14 }
      : variant === "spark"
      ? { scale: 1.22, rotate: -10 }
      : variant === "pulse"
      ? { scale: 1.2 }
      : { y: -2, scale: 1.15 };

  return (
    <motion.span
      whileHover={hoverEffect}
      whileTap={{ scale: 0.88, rotate: -8 }}
      transition={{ type: "spring", stiffness: 420, damping: 15 }}
      className={`inline-flex shrink-0 items-center justify-center ${className}`}
    >
      <IconComponent size={size} weight={weight} />
    </motion.span>
  );
};
