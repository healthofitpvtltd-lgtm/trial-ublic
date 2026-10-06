import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Bottle } from "./Bottle";
import { brand, colors, fonts, products } from "./theme";

// Scene timings in frames (30 fps).
const HOOK = { from: 0, duration: 90 };
const REVEAL = { from: 90, duration: 120 };
const PRODUCTS = { from: 210, duration: 240 };
const STATS = { from: 450, duration: 105 };
const OUTRO = { from: 555, duration: 105 };
export const DSO_LAUNCH_DURATION = OUTRO.from + OUTRO.duration;

// Fades a scene in and out at its edges.
const Scene: React.FC<{ duration: number; children: React.ReactNode }> = ({
  duration,
  children,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [0, 10, duration - 10, duration],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};

const useRise = (delay = 0) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 14 } });
  return {
    opacity: interpolate(s, [0, 1], [0, 1]),
    transform: `translateY(${interpolate(s, [0, 1], [60, 0])}px)`,
  };
};

const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame / 60) * 80;
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% ${40 + drift / 20}%, ${colors.forest} 0%, ${colors.night} 70%)`,
      }}
    >
      {Array.from({ length: 18 }).map((_, i) => {
        const x = (i * 197) % 1080;
        const y = (1920 + ((i * 331) % 1920) - frame * (1 + (i % 3))) % 1920;
        const size = 6 + (i % 4) * 4;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: size,
              height: size,
              borderRadius: size,
              background: colors.leaf,
              opacity: 0.18,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

const Hook: React.FC = () => {
  const line1 = useRise(0);
  const line2 = useRise(30);
  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: 80,
      }}
    >
      <div
        style={{
          ...line1,
          fontFamily: fonts.body,
          fontSize: 54,
          color: colors.muted,
          fontWeight: 500,
        }}
      >
        To my 2.4 million family on Instagram
      </div>
      <div
        style={{
          ...line2,
          fontFamily: fonts.display,
          fontSize: 110,
          lineHeight: 1.05,
          color: colors.cream,
          fontWeight: 900,
          marginTop: 40,
        }}
      >
        Something <span style={{ color: colors.lime }}>new</span> is coming.
      </div>
    </AbsoluteFill>
  );
};

const Reveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame: frame - 15, fps, config: { damping: 12 } });
  const bottle = spring({ frame: frame - 30, fps, config: { damping: 15 } });
  const intro = useRise(0);
  const byline = useRise(55);

  return (
    <AbsoluteFill style={{ alignItems: "center", paddingTop: 200 }}>
      {/* rotating light rays behind the bottle */}
      <AbsoluteFill
        style={{
          background: `repeating-conic-gradient(from ${frame}deg at 50% 62%, ${colors.leaf}22 0deg 8deg, transparent 8deg 24deg)`,
          opacity: bottle * 0.8,
        }}
      />
      <div
        style={{
          ...intro,
          fontFamily: fonts.body,
          fontSize: 44,
          letterSpacing: 14,
          color: colors.muted,
        }}
      >
        INTRODUCING
      </div>
      <div
        style={{
          fontFamily: fonts.display,
          fontWeight: 900,
          fontSize: 260,
          letterSpacing: 24,
          color: colors.cream,
          transform: `scale(${pop})`,
          textShadow: `0 0 60px ${colors.emerald}`,
          lineHeight: 1.1,
        }}
      >
        DSO
      </div>
      <div
        style={{
          ...byline,
          fontFamily: fonts.body,
          fontSize: 40,
          color: colors.lime,
        }}
      >
        by {brand.founder}
      </div>
      <div
        style={{
          marginTop: 70,
          transform: `translateY(${interpolate(bottle, [0, 1], [700, 0])}px) rotate(${interpolate(bottle, [0, 1], [-12, 0])}deg)`,
        }}
      >
        <Bottle height={900} />
      </div>
    </AbsoluteFill>
  );
};

const ProductCard: React.FC<{
  index: number;
  name: string;
  detail: string;
  color: string;
}> = ({ index, name, detail, color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - 35 - index * 22, fps, config: { damping: 14 } });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 36,
        width: 900,
        padding: "34px 44px",
        borderRadius: 36,
        background: "rgba(255,255,255,0.06)",
        border: `2px solid ${color}55`,
        opacity: s,
        transform: `translateX(${interpolate(s, [0, 1], [index % 2 ? 500 : -500, 0])}px)`,
      }}
    >
      <div
        style={{
          width: 96,
          height: 96,
          borderRadius: 48,
          background: color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: fonts.display,
          fontWeight: 900,
          fontSize: 44,
          color: colors.night,
          flexShrink: 0,
        }}
      >
        {index + 1}
      </div>
      <div>
        <div
          style={{
            fontFamily: fonts.display,
            fontWeight: 800,
            fontSize: 60,
            color: colors.cream,
            lineHeight: 1.1,
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: 36,
            color,
            marginTop: 6,
          }}
        >
          {detail}
        </div>
      </div>
    </div>
  );
};

const Products: React.FC = () => {
  const title = useRise(0);
  return (
    <AbsoluteFill style={{ alignItems: "center", paddingTop: 210 }}>
      <div
        style={{
          ...title,
          fontFamily: fonts.display,
          fontWeight: 900,
          fontSize: 92,
          color: colors.cream,
          textAlign: "center",
          lineHeight: 1.05,
        }}
      >
        What&apos;s inside
        <br />
        <span style={{ color: colors.lime }}>the DSO range</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 30,
          marginTop: 80,
        }}
      >
        {products.map((p, i) => (
          <ProductCard key={p.name} index={i} {...p} />
        ))}
      </div>
    </AbsoluteFill>
  );
};

const Counter: React.FC<{ to: number; delay: number; suffix: string }> = ({
  to,
  delay,
  suffix,
}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame - delay, [0, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const value = to * progress;
  const text =
    to >= 1_000_000
      ? `${(value / 1_000_000).toFixed(1)}M`
      : `${Math.round(value / 1000)}K`;
  return (
    <span>
      {text}
      {suffix}
    </span>
  );
};

const Stats: React.FC = () => {
  const a = useRise(0);
  const b = useRise(30);
  const statStyle: React.CSSProperties = {
    fontFamily: fonts.display,
    fontWeight: 900,
    fontSize: 200,
    lineHeight: 1,
    color: colors.lime,
  };
  const labelStyle: React.CSSProperties = {
    fontFamily: fonts.body,
    fontSize: 46,
    color: colors.cream,
    marginTop: 16,
  };
  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        gap: 130,
        padding: 60,
      }}
    >
      <div style={a}>
        <div style={statStyle}>
          <Counter to={brand.founderFollowers} delay={5} suffix="" />
        </div>
        <div style={labelStyle}>
          family on <b>{brand.founderHandle}</b>
        </div>
      </div>
      <div style={b}>
        <div style={statStyle}>
          <Counter to={brand.brandFollowers} delay={35} suffix="+" />
        </div>
        <div style={labelStyle}>
          already following <b>DSO</b>
          <br />
          <span style={{ color: colors.muted }}>and we haven&apos;t even launched</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const bottle = spring({ frame, fps, config: { damping: 14 } });
  const soon = useRise(15);
  const follow = useRise(35);
  const pulse = 1 + Math.sin(frame / 6) * 0.03;

  return (
    <AbsoluteFill style={{ alignItems: "center", paddingTop: 170 }}>
      <div
        style={{
          transform: `scale(${bottle}) translateY(${Math.sin(frame / 15) * 12}px)`,
        }}
      >
        <Bottle height={760} />
      </div>
      <div
        style={{
          ...soon,
          fontFamily: fonts.display,
          fontWeight: 900,
          fontSize: 120,
          color: colors.cream,
          marginTop: 60,
          textAlign: "center",
          lineHeight: 1,
        }}
      >
        LAUNCHING
        <br />
        <span style={{ color: colors.lime }}>SOON</span>
      </div>
      <div style={{ ...follow, marginTop: 60, textAlign: "center" }}>
        <div
          style={{
            display: "inline-block",
            transform: `scale(${pulse})`,
            padding: "24px 48px",
            borderRadius: 80,
            background: colors.emerald,
            fontFamily: fonts.display,
            fontWeight: 800,
            fontSize: 44,
            color: colors.cream,
          }}
        >
          Follow DSO &amp; {brand.founderHandle}
        </div>
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: 38,
            color: colors.muted,
            marginTop: 30,
          }}
        >
          Turn on notifications so you don&apos;t miss the drop
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SCENES = [
  { timing: HOOK, Component: Hook },
  { timing: REVEAL, Component: Reveal },
  { timing: PRODUCTS, Component: Products },
  { timing: STATS, Component: Stats },
  { timing: OUTRO, Component: Outro },
];

export const DSOLaunch: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.night }}>
      <Background />
      {SCENES.map(({ timing, Component }) => (
        <Sequence
          key={timing.from}
          from={timing.from}
          durationInFrames={timing.duration}
        >
          <Scene duration={timing.duration}>
            <Component />
          </Scene>
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
