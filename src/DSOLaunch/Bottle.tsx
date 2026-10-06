import React from "react";
import { useCurrentFrame } from "remotion";
import { colors, fonts } from "./theme";

// A transparent green supplement bottle drawn in SVG, with capsules visible
// through the glass. Sized by `height`; width follows the 300x520 viewBox.
export const Bottle: React.FC<{ height: number }> = ({ height }) => {
  const frame = useCurrentFrame();
  // A slow sweep of light across the glass.
  const shine = ((frame % 120) / 120) * 420 - 120;

  const capsules = [
    [92, 400, -20],
    [140, 410, 15],
    [190, 398, -35],
    [118, 440, 40],
    [170, 445, -10],
    [210, 438, 25],
    [100, 470, 5],
    [150, 478, -30],
    [200, 472, 10],
  ];

  return (
    <svg
      viewBox="0 0 300 520"
      style={{ height, width: (height * 300) / 520, overflow: "visible" }}
    >
      <defs>
        <linearGradient id="glass" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#0f6b3a" stopOpacity="0.9" />
          <stop offset="0.35" stopColor="#2fbf6c" stopOpacity="0.6" />
          <stop offset="0.7" stopColor="#1f9a55" stopOpacity="0.55" />
          <stop offset="1" stopColor="#0b4f2b" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="cap" x1="0" x2="1">
          <stop offset="0" stopColor="#0a2a1a" />
          <stop offset="0.5" stopColor="#1d4d33" />
          <stop offset="1" stopColor="#081f13" />
        </linearGradient>
        <linearGradient id="shine" x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <clipPath id="body">
          <path d="M60 130 Q60 105 85 100 L215 100 Q240 105 240 130 L250 470 Q250 510 210 510 L90 510 Q50 510 50 470 Z" />
        </clipPath>
      </defs>

      {/* glow on the floor */}
      <ellipse cx="150" cy="515" rx="130" ry="14" fill={colors.leaf} opacity="0.35" />

      {/* neck */}
      <rect x="95" y="62" width="110" height="46" rx="10" fill="url(#glass)" />

      {/* glass body */}
      <path
        d="M60 130 Q60 105 85 100 L215 100 Q240 105 240 130 L250 470 Q250 510 210 510 L90 510 Q50 510 50 470 Z"
        fill="url(#glass)"
        stroke="#7ff0a8"
        strokeOpacity="0.5"
        strokeWidth="3"
      />

      <g clipPath="url(#body)">
        {/* capsules seen through the glass */}
        {capsules.map(([x, y, r], i) => (
          <g key={i} transform={`translate(${x} ${y}) rotate(${r})`} opacity="0.85">
            <rect x="-26" y="-11" width="52" height="22" rx="11" fill="#e9f7d0" />
            <rect x="-26" y="-11" width="26" height="22" rx="11" fill={colors.lime} />
          </g>
        ))}
        {/* moving shine */}
        <rect x={shine} y="90" width="70" height="440" fill="url(#shine)" transform="skewX(-12)" />
        {/* fixed highlight */}
        <rect x="72" y="125" width="14" height="340" rx="7" fill="#fff" opacity="0.22" />
      </g>

      {/* label */}
      <rect x="62" y="200" width="176" height="150" rx="8" fill={colors.cream} />
      <rect x="62" y="200" width="176" height="10" fill={colors.emerald} />
      <text
        x="150"
        y="285"
        textAnchor="middle"
        fontFamily={fonts.display}
        fontWeight={900}
        fontSize="64"
        fill={colors.forest}
        letterSpacing="4"
      >
        DSO
      </text>
      <text
        x="150"
        y="322"
        textAnchor="middle"
        fontFamily={fonts.body}
        fontWeight={600}
        fontSize="15"
        fill={colors.emerald}
        letterSpacing="3"
      >
        SUPPLEMENTS
      </text>

      {/* cap */}
      <rect x="85" y="10" width="130" height="60" rx="10" fill="url(#cap)" />
      {Array.from({ length: 11 }).map((_, i) => (
        <rect key={i} x={93 + i * 11} y="16" width="4" height="48" rx="2" fill="#000" opacity="0.25" />
      ))}
    </svg>
  );
};
