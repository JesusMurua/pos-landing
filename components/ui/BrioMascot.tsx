"use client";

import { useEffect, useId, useState } from "react";

export type GiroSlug = "restaurant" | "cafe" | "retail" | "general";

interface BrioMascotProps {
  giro: GiroSlug;
  size?: number;
  className?: string;
}

const SKIN_COLORS: Record<GiroSlug, { body: string; brow: string }> = {
  restaurant: { body: "#ef4444", brow: "#e5e7eb" },
  cafe: { body: "#f59e0b", brow: "#92400e" },
  retail: { body: "#3b82f6", brow: "#1e3a8a" },
  general: { body: "#8b5cf6", brow: "#7c3aed" },
};

const BRIO_KEYFRAMES = `
@keyframes brio-bob {
  0%, 100% { transform: translateY(0px); }
  50%      { transform: translateY(-8px); }
}
@keyframes brio-blink {
  0%, 86%, 100% { transform: scaleY(1); }
  91%           { transform: scaleY(0.08); }
}
@keyframes brio-hat-pop {
  0%   { transform: translateY(-14px) scale(0.6) rotate(-10deg); opacity: 0; }
  60%  { transform: translateY(3px) scale(1.08) rotate(3deg);   opacity: 1; }
  80%  { transform: translateY(-2px) scale(0.97) rotate(-1deg); }
  100% { transform: translateY(0px) scale(1) rotate(0deg); }
}
@keyframes brio-react {
  0%   { transform: translateY(0) rotate(0deg) scale(1); }
  20%  { transform: translateY(-5px) rotate(-7deg) scale(1.05); }
  50%  { transform: translateY(-2px) rotate(5deg) scale(1.04); }
  100% { transform: translateY(0) rotate(0deg) scale(1); }
}
@keyframes brio-breathe {
  0%, 100% { transform: scale(1); }
  50%      { transform: scale(1.018); }
}
@keyframes brio-blush {
  0%, 100% { opacity: 0.5; }
  40%      { opacity: 0.85; }
}
`;

function UniformFor({ giro }: { giro: GiroSlug }) {
  if (giro === "restaurant") {
    return (
      <>
        <rect x="8" y="38" width="32" height="10" fill="white" opacity="0.92" />
        <rect x="21" y="38" width="6" height="10" fill="#f0f0f0" />
        <circle cx="20" cy="40" r="1" fill="#d1d5db" />
        <circle cx="20" cy="43" r="1" fill="#d1d5db" />
        <circle cx="28" cy="40" r="1" fill="#d1d5db" />
        <circle cx="28" cy="43" r="1" fill="#d1d5db" />
      </>
    );
  }

  if (giro === "cafe") {
    return (
      <>
        <path d="M14 34 L24 28 L34 34 L34 46 L14 46 Z" fill="#92400e" opacity="0.75" />
        <rect x="21" y="28" width="6" height="18" fill="#78350f" opacity="0.55" />
        <rect
          x="17"
          y="37"
          width="8"
          height="5"
          rx="1"
          fill="#78350f"
          opacity="0.4"
          stroke="#92400e"
          strokeWidth="0.5"
        />
        <rect x="19" y="36.5" width="10" height="1.2" rx="0.5" fill="#fbbf24" opacity="0.6" />
      </>
    );
  }

  if (giro === "retail") {
    return (
      <>
        <path d="M8 31 L16 27 L16 46 L8 46 Z" fill="#1e3a8a" opacity="0.85" />
        <path d="M40 31 L32 27 L32 46 L40 46 Z" fill="#1e3a8a" opacity="0.85" />
        <rect x="16" y="27" width="16" height="19" fill="#1e40af" opacity="0.7" />
        <rect x="18" y="31" width="12" height="6" rx="1" fill="white" opacity="0.95" />
        <rect x="19" y="32.5" width="8" height="1.2" rx="0.3" fill="#3b82f6" />
        <rect x="19" y="34.5" width="5" height="0.8" rx="0.3" fill="#93c5fd" />
      </>
    );
  }

  // general
  return (
    <>
      <rect x="8" y="34" width="32" height="4" rx="1" fill="#6d28d9" />
      <rect
        x="21"
        y="34.5"
        width="6"
        height="3"
        rx="0.5"
        fill="#a78bfa"
        stroke="#7c3aed"
        strokeWidth="0.5"
      />
      <rect x="11" y="35.5" width="4" height="3" rx="0.5" fill="#fbbf24" />
      <rect x="17" y="35.5" width="3" height="3" rx="0.5" fill="#e5e7eb" />
      <rect x="29" y="35.5" width="3" height="3" rx="0.5" fill="#60a5fa" />
      <rect x="34" y="35.5" width="4" height="3" rx="0.5" fill="#f87171" />
      <rect x="8" y="38" width="32" height="10" fill="#4c1d95" opacity="0.7" />
    </>
  );
}

function HatFor({ giro }: { giro: GiroSlug }) {
  if (giro === "restaurant") {
    return (
      <>
        <rect x="16" y="8" width="16" height="10" fill="white" stroke="#c8c8c8" strokeWidth="0.8" />
        <rect
          x="13"
          y="16"
          width="22"
          height="3.5"
          rx="1.5"
          fill="#fafafa"
          stroke="#c8c8c8"
          strokeWidth="0.8"
        />
        <path
          d="M15 8 Q17 4 19 8 Q21 4 23 8 Q25 4 27 8 Q29 4 31 8 Q33 4 33 8 L33 8 L15 8 Z"
          fill="white"
          stroke="#c8c8c8"
          strokeWidth="0.8"
        />
        <line x1="19" y1="8" x2="19" y2="16" stroke="#e5e7eb" strokeWidth="0.5" />
        <line x1="24" y1="8" x2="24" y2="16" stroke="#e5e7eb" strokeWidth="0.5" />
        <line x1="29" y1="8" x2="29" y2="16" stroke="#e5e7eb" strokeWidth="0.5" />
      </>
    );
  }

  if (giro === "cafe") {
    return (
      <>
        <ellipse cx="24" cy="20" rx="11" ry="3.5" fill="#92400e" />
        <rect x="15" y="8" width="18" height="14" rx="9" fill="#6b3a1f" />
        <ellipse cx="24" cy="8" rx="9" ry="3" fill="#d97706" />
        <circle cx="24" cy="6" r="2.2" fill="#fbbf24" />
      </>
    );
  }

  if (giro === "retail") {
    return (
      <>
        <rect x="12" y="18" width="24" height="10" rx="5" fill="#1e3a8a" />
        <rect x="10" y="25" width="28" height="4" rx="1" fill="#1e40af" />
        <rect x="19" y="20" width="10" height="5" rx="1" fill="#60a5fa" opacity="0.75" />
        <rect x="20" y="21.5" width="4" height="1" rx="0.3" fill="white" opacity="0.9" />
        <rect x="20" y="23" width="6" height="0.8" rx="0.3" fill="white" opacity="0.6" />
      </>
    );
  }

  // general
  return (
    <>
      <path d="M14 22 L34 22 L32 14 L16 14 Z" fill="#7c3aed" />
      <rect x="12" y="20" width="24" height="4" rx="1" fill="#6d28d9" />
      <path d="M19 17 L16 14" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="19" cy="17" r="1.8" fill="#c4b5fd" />
      <path d="M24 16 L24 12" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="24" cy="12" r="2" fill="#fbbf24" />
      <path d="M29 17 L32 14" stroke="#f87171" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="29" cy="17" r="1.8" fill="#f87171" />
    </>
  );
}

export default function BrioMascot({ giro, size = 80, className = "" }: BrioMascotProps) {
  const { body: bodyColor, brow: browColor } = SKIN_COLORS[giro];
  const [reacting, setReacting] = useState(false);

  // clipPath necesita un id único por instancia (varias mascotas pueden coexistir
  // en la misma página). useId puede devolver caracteres como ":" o "«» — los
  // limpiamos para que url(#...) funcione sin escape.
  const rawId = useId();
  const clipId = `brio-clip-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`;

  useEffect(() => {
    setReacting(true);
    const t = setTimeout(() => setReacting(false), 500);
    return () => clearTimeout(t);
  }, [giro]);

  const cheekStyle: React.CSSProperties = reacting
    ? { animation: "brio-blush 0.5s ease forwards" }
    : { transition: "opacity 0.5s" };

  return (
    <>
      <style precedence="brio-mascot">{BRIO_KEYFRAMES}</style>
      <div
        className={className}
        style={{
          width: size,
          height: size,
          display: "inline-block",
          animation: reacting
            ? "brio-react 0.5s ease forwards"
            : "brio-bob 2.4s ease-in-out infinite",
        }}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          style={{
            animation: "brio-breathe 3.8s ease-in-out infinite",
            transformOrigin: "center bottom",
          }}
        >
          <defs>
            <clipPath id={clipId}>
              <circle cx="24" cy="30" r="16" />
            </clipPath>
          </defs>

          {/* Cuerpo base */}
          <circle
            cx="24"
            cy="30"
            r="16"
            fill={bodyColor}
            style={{ transition: "fill 0.4s ease" }}
          />

          {/* Uniforme clipeado al cuerpo */}
          <g clipPath={`url(#${clipId})`}>
            <UniformFor giro={giro} />
          </g>

          {/* Mejillas */}
          <ellipse
            cx="13"
            cy="34"
            rx="4"
            ry="2.5"
            fill={bodyColor}
            opacity={0.5}
            style={cheekStyle}
          />
          <ellipse
            cx="35"
            cy="34"
            rx="4"
            ry="2.5"
            fill={bodyColor}
            opacity={0.5}
            style={cheekStyle}
          />

          {/* Ojos blancos */}
          <ellipse cx="18.5" cy="28" rx="4" ry="4.8" fill="white" />
          <ellipse cx="29.5" cy="28" rx="4" ry="4.8" fill="white" />

          {/* Cejas */}
          <path
            d="M15 24 Q18.5 21 22 24"
            fill="none"
            stroke={browColor}
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M26 24 Q29.5 21 33 24"
            fill="none"
            stroke={browColor}
            strokeWidth="1.2"
            strokeLinecap="round"
          />

          {/* Pupilas con blink */}
          <g
            style={{
              animation: "brio-blink 4.2s ease-in-out infinite",
              transformOrigin: "24px 29px",
            }}
          >
            <circle cx="19.5" cy="28.8" r="2.5" fill="#1f2937" />
            <circle cx="30.5" cy="28.8" r="2.5" fill="#1f2937" />
            {/* Puntos de luz principales */}
            <circle cx="20.5" cy="27.8" r="0.9" fill="white" />
            <circle cx="31.5" cy="27.8" r="0.9" fill="white" />
            {/* Reflejos secundarios */}
            <circle cx="18.8" cy="29.5" r="0.5" fill="#374151" opacity="0.5" />
            <circle cx="29.8" cy="29.5" r="0.5" fill="#374151" opacity="0.5" />
          </g>

          {/* Sonrisa */}
          <path
            d="M18 35 Q24 41 30 35"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.9"
          />

          {/* Sombrero — re-montado con key para disparar el hat-pop en cada cambio */}
          <g
            key={giro}
            style={{
              animation: "brio-hat-pop 0.4s cubic-bezier(.17,.89,.32,1.28) forwards",
            }}
          >
            <HatFor giro={giro} />
          </g>
        </svg>
      </div>
    </>
  );
}
