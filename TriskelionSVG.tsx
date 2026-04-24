// components/ui/TriskelionSVG.tsx
'use client';

interface Props { size?: number; className?: string; }

export default function TriskelionSVG({ size = 160, className = '' }: Props) {
  const cx = size / 2;
  const cy = size / 2;

  function armPath(rotationDeg: number): string {
    const steps   = 100;
    const innerR  = size * 0.06;
    const outerR  = size * 0.41;
    const sweep   = Math.PI * 1.55;
    const b       = (outerR - innerR) / sweep;
    const startA  = -Math.PI / 2 + (rotationDeg * Math.PI / 180);
    let d = '';
    for (let i = 0; i <= steps; i++) {
      const t     = i / steps;
      const theta = t * sweep;
      const r     = innerR + b * theta;
      const angle = startA - theta;
      const x     = (cx + r * Math.cos(angle)).toFixed(2);
      const y     = (cy + r * Math.sin(angle)).toFixed(2);
      d += i === 0 ? `M ${x} ${y} ` : `L ${x} ${y} `;
    }
    return d;
  }

  const sw = size * 0.076;
  const gradId  = `tg-${size}`;
  const clipId  = `tc-${size}`;

  return (
    <svg
      width={size} height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Trisk triskelion logo"
    >
      <defs>
        <radialGradient id={gradId} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#F7E88A" />
          <stop offset="30%"  stopColor="#E8C244" />
          <stop offset="65%"  stopColor="#C49A2A" />
          <stop offset="100%" stopColor="#7A5010" />
        </radialGradient>
        <clipPath id={clipId}>
          <circle cx={cx} cy={cy} r={size * 0.445} />
        </clipPath>
      </defs>

      {/* Outer rings */}
      <circle cx={cx} cy={cy} r={size * 0.47}  fill="none" stroke="#C49A2A" strokeWidth={1}   opacity={0.4} />
      <circle cx={cx} cy={cy} r={size * 0.445} fill="none" stroke="#C49A2A" strokeWidth={0.5} opacity={0.2} />

      {/* Background */}
      <circle cx={cx} cy={cy} r={size * 0.44} fill="#0E0A02" />

      {/* Three spiral arms */}
      {[0, 120, 240].map((rot) => (
        <path
          key={rot}
          d={armPath(rot)}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth={sw}
          strokeLinecap="round"
          clipPath={`url(#${clipId})`}
        />
      ))}

      {/* Center hub */}
      <circle cx={cx} cy={cy} r={size * 0.065} fill={`url(#${gradId})`} />
      <circle cx={cx} cy={cy} r={size * 0.025} fill="#FEFAEC" />
    </svg>
  );
}
