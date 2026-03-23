export type DefaultOGProps = {
  title: string;
  description: string;
};

const zenColors = {
  background: "#e3e1d9",
  foreground: "#2b2924",
  muted: "#7f7d75",
  border: "#cfcdc4",
  primary: "#4a4580",
};

function CornerFrame({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const size = 48;
  const strokeWidth = 2;

  const paths: Record<string, string> = {
    tl: `M0 ${size} L0 0 L${size} 0`,
    tr: `M${size - size} 0 L${size} 0 L${size} ${size}`,
    bl: `M0 0 L0 ${size} L${size} ${size}`,
    br: `M0 ${size} L${size} ${size} L${size} 0`,
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
    >
      <path
        d={paths[position]}
        stroke={zenColors.border}
        strokeWidth={strokeWidth}
        strokeLinecap="square"
      />
    </svg>
  );
}

function StarLogo() {
  return (
    <svg
      width="280"
      height="280"
      viewBox="0 0 3000 3000"
      fill="none"
    >
      <path
        d="M1268.87,964.837c102.836,-184.48 154.253,-276.721 231.13,-276.721c76.877,0 128.294,92.24 231.127,276.72l26.605,47.727c29.228,52.423 43.834,78.636 66.623,95.931c22.781,17.295 51.149,23.714 107.899,36.554l51.668,11.69c199.691,45.184 299.545,67.775 323.3,144.166c23.756,76.388 -44.313,155.993 -180.457,315.187l-35.22,41.187c-38.686,45.238 -58.033,67.857 -66.737,95.843c-8.695,27.986 -5.772,58.163 0.073,118.527l5.326,54.948c20.581,212.405 30.876,318.608 -31.314,365.819c-62.198,47.211 -155.687,4.165 -342.664,-81.919l-48.372,-22.278c-53.13,-24.462 -79.695,-36.697 -107.859,-36.697c-28.164,0 -54.729,12.235 -107.859,36.697l-48.372,22.278c-186.978,86.084 -280.467,129.13 -342.66,81.919c-62.193,-47.211 -51.901,-153.414 -31.318,-365.819l5.324,-54.948c5.85,-60.364 8.774,-90.541 0.071,-118.527c-8.702,-27.986 -28.045,-50.605 -66.732,-95.843l-35.221,-41.187c-136.141,-159.194 -204.212,-238.799 -180.456,-315.187c23.756,-76.391 123.604,-98.982 323.302,-144.166l51.664,-11.69c56.747,-12.84 85.121,-19.26 107.903,-36.554c22.782,-17.295 37.395,-43.506 66.617,-95.931l26.605,-47.727Z"
        stroke={zenColors.primary}
        strokeWidth="60"
      />
    </svg>
  );
}

function DefaultOG({ title, description }: DefaultOGProps) {
  return (
    <div
      tw="w-full h-full flex relative"
      style={{
        backgroundColor: zenColors.background,
        fontFamily: "Be Vietnam Pro",
      }}
    >
      <div tw="absolute top-6 left-6 flex">
        <CornerFrame position="tl" />
      </div>
      <div tw="absolute top-6 right-6 flex">
        <CornerFrame position="tr" />
      </div>
      <div tw="absolute bottom-6 left-6 flex">
        <CornerFrame position="bl" />
      </div>
      <div tw="absolute bottom-6 right-6 flex">
        <CornerFrame position="br" />
      </div>

      <div tw="flex w-full h-full px-20 py-16">
        <div tw="flex items-center justify-center w-2/5">
          <StarLogo />
        </div>

        <div tw="flex flex-col justify-center w-3/5 pl-12">
          <div
            tw="text-6xl font-bold tracking-tight"
            style={{
              fontFamily: "JetBrains Mono",
              color: zenColors.foreground,
            }}
          >
            {title}
          </div>

          <div
            tw="mt-6 mb-8 h-px w-32"
            style={{ backgroundColor: zenColors.border }}
          />

          <div
            tw="text-2xl leading-relaxed"
            style={{
              color: zenColors.muted,
              lineHeight: 1.6,
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
