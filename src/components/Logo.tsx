type LogoProps = {
  className?: string;
};

/**
 * Wordmark built as inline SVG text — zero network request, crisp at any
 * size, and themeable via CSS. "IG" monogram doubles as a play-button cut,
 * nodding to the product without resorting to a literal triangle icon.
 */
export function Logo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 168 28"
      className={className}
      role="img"
      aria-label="Impervious Generation"
    >
      <title>Impervious Generation</title>
      <text
        x="0"
        y="21"
        fontFamily="var(--font-display)"
        fontWeight="800"
        fontSize="20"
        letterSpacing="-0.02em"
        fill="currentColor"
      >
        impervious
        <tspan fill="#E63946">.</tspan>
      </text>
    </svg>
  );
}
