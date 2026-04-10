interface BrioIconProps {
  size?: number;
  className?: string;
}

export default function BrioIcon({ size = 32, className = "" }: BrioIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="48" height="48" rx="12" fill="#16a34a" />
      <path
        d="M12 33 L18 16 L26 28 L31 21 L37 33"
        fill="none"
        stroke="white"
        strokeWidth="2.8"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx="37" cy="33" r="2.6" fill="#86efac" />
    </svg>
  );
}
