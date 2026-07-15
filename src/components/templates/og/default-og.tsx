export type DefaultOGProps = {
  title: string;
  description: string;
  version: string;
};

const zenColors = {
  background: "#e3e1d9",
  foreground: "#2b2924",
  muted: "#7f7d75",
  border: "#cfcdc4",
  primary: "rgba(43, 41, 36, 0.35)",
  accent: "rgba(43, 41, 36, 0.05)",
};

function CornerFrame({ position, version }: { position: "tl" | "tr" | "bl" | "br"; version: string }) {
  const size = 64;
  const strokeWidth = 2;

  const paths: Record<string, string> = {
    tl: `M0 ${size} L0 0 L${size} 0`,
    tr: `M${size - size} 0 L${size} 0 L${size} ${size}`,
    bl: `M0 0 L0 ${size} L${size} ${size}`,
    br: `M0 ${size} L${size} ${size} L${size} 0`,
  };

  const labels: Record<string, string> = {
    tl: "HUMAN.CREATIVITY",
    tr: "ART_RULES",
    bl: "HOPE.RE",
    br: `V${version}`,
  };

  const labelStyles: Record<string, any> = {
    tl: { top: 4, left: 12 },
    tr: { top: 4, right: 12 },
    bl: { bottom: 4, left: 12 },
    br: { bottom: 4, right: 12 },
  };

  return (
    <div tw="flex relative" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
      >
        <path
          d={paths[position]}
          stroke={zenColors.muted}
          strokeWidth={strokeWidth}
          strokeLinecap="square"
          opacity={0.5}
        />
      </svg>
      <div
        tw="absolute flex text-[10px] font-bold"
        style={{
          color: zenColors.muted,
          fontFamily: "JetBrains Mono",
          letterSpacing: "0.1em",
          ...labelStyles[position],
        }}
      >
        {labels[position]}
      </div>
    </div>
  );
}

function StarLogo() {
  return (
    <div tw="flex items-center justify-center relative">
      <div
        tw="absolute flex rounded-full border border-dashed"
        style={{
          width: "500px",
          height: "500px",
          borderColor: zenColors.accent,
          borderWidth: "2px",
        }}
      />
      <div
        tw="absolute flex rounded-full border"
        style={{
          width: "420px",
          height: "420px",
          borderColor: zenColors.accent,
          borderWidth: "1px",
        }}
      />

      <svg
        width="480"
        height="480"
        viewBox="0 0 3000 3000"
        fill="none"
        tw="relative"
      >
        <path
          d="M1268.87,964.837c102.836,-184.48 154.253,-276.721 231.13,-276.721c76.877,0 128.294,92.24 231.127,276.72l26.605,47.727c29.228,52.423 43.834,78.636 66.623,95.931c22.781,17.295 51.149,23.714 107.899,36.554l51.668,11.69c199.691,45.184 299.545,67.775 323.3,144.166c23.756,76.388 -44.313,155.993 -180.457,315.187l-35.22,41.187c-38.686,45.238 -58.033,67.857 -66.737,95.843c-8.695,27.986 -5.772,58.163 0.073,118.527l5.326,54.948c20.581,212.405 30.876,318.608 -31.314,365.819c-62.198,47.211 -155.687,4.165 -342.664,-81.919l-48.372,-22.278c-53.13,-24.462 -79.695,-36.697 -107.859,-36.697c-28.164,0 -54.729,12.235 -107.859,36.697l-48.372,22.278c-186.978,86.084 -280.467,129.13 -342.66,81.919c-62.193,-47.211 -51.901,-153.414 -31.318,-365.819l5.324,-54.948c5.85,-60.364 8.774,-90.541 0.071,-118.527c-8.702,-27.986 -28.045,-50.605 -66.732,-95.843l-35.221,-41.187c-136.141,-159.194 -204.212,-238.799 -180.456,-315.187c23.756,-76.391 123.604,-98.982 323.302,-144.166l51.664,-11.69c56.747,-12.84 85.121,-19.26 107.903,-36.554c22.782,-17.295 37.395,-43.506 66.617,-95.931l26.605,-47.727Z"
          stroke={zenColors.foreground}
          strokeWidth="60"
          opacity={0.8}
        />
      </svg>
    </div>
  );
}

function GridBackground() {
  return (
    <div tw="absolute inset-0 flex flex-wrap">
      {Array.from({ length: 120 }).map((_, i) => (
        <div
          key={i}
          tw="flex border-r border-b"
          style={{
            width: "100px",
            height: "100px",
            borderColor: "rgba(43, 41, 36, 0.03)",
          }}
        />
      ))}
    </div>
  );
}

function DefaultOG({ title, description, version }: DefaultOGProps) {
  const isLongTitle = title.length > 50;
  const isMediumTitle = title.length > 30 && title.length <= 50;
  const titleFontSize = isLongTitle ? "36px" : isMediumTitle ? "48px" : "64px";
  const titleMarginBottom = isLongTitle ? "16px" : "24px";
  const descFontSize = isLongTitle ? "18px" : "22px";
  const separatorMarginBottom = isLongTitle ? "16px" : "24px";

  return (
    <div
      tw="w-full h-full flex relative overflow-hidden"
      style={{
        backgroundColor: zenColors.background,
        fontFamily: "Be Vietnam Pro",
      }}
    >
      <GridBackground />

      <div tw="absolute top-10 left-10 flex">
        <CornerFrame position="tl" version={version} />
      </div>
      <div tw="absolute top-10 right-10 flex">
        <CornerFrame position="tr" version={version} />
      </div>
      <div tw="absolute bottom-10 left-10 flex">
        <CornerFrame position="bl" version={version} />
      </div>
      <div tw="absolute bottom-10 right-10 flex">
        <CornerFrame position="br" version={version} />
      </div>

      <div tw="flex w-full h-full px-24 py-16 relative z-10">
        <div tw="flex items-center justify-center w-[45%]">
          <StarLogo />
        </div>

        <div tw="flex flex-col justify-center w-[55%] pl-16">
          <div
            tw="flex text-xs font-bold tracking-[0.3em] mb-4 opacity-50"
            style={{
              fontFamily: "JetBrains Mono",
              color: zenColors.foreground,
            }}
          >
            [ BY_HUMAN_FOR_HUMAN ]
          </div>

          <div
            tw="font-bold tracking-tight"
            style={{
              fontFamily: "JetBrains Mono",
              color: zenColors.foreground,
              lineHeight: 1.15,
              fontSize: titleFontSize,
              marginBottom: titleMarginBottom,
            }}
          >
            {title}
          </div>

          <div
            tw="w-32"
            style={{
              backgroundColor: zenColors.foreground,
              opacity: 0.15,
              height: "2px",
              marginBottom: separatorMarginBottom,
            }}
          />

          <div
            tw="leading-relaxed"
            style={{
              color: zenColors.muted,
              lineHeight: 1.5,
              maxWidth: "500px",
              fontSize: descFontSize,
            }}
          >
            {description}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DefaultOG;
