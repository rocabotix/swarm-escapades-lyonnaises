'use client';

interface WavingFlagProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}

export function WavingFlag({
  src,
  alt = "Drapeau flottant",
  width = 58,
  height = 38,
}: WavingFlagProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className="animate-wave drop-shadow-md"
      style={{ transformOrigin: 'bottom center' }}
    />
  );
}