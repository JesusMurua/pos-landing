import Link from "next/link";

type ButtonVariant = "primary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-600 text-white hover:bg-primary-700 shadow-sm",
  ghost:
    "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
  outline:
    "bg-white text-primary-600 border border-primary-600 hover:bg-primary-50",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  href,
  onClick,
  children,
  className = "",
  loading = false,
  disabled = false,
}: ButtonProps) {
  const isDisabled = loading || disabled;
  const classes = `inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-150 ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    const isExternal = href.startsWith("http");
    if (isExternal) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={isDisabled ? undefined : onClick} disabled={isDisabled} className={classes}>
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </button>
  );
}
