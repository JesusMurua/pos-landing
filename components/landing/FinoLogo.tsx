interface FinoLogoProps {
  size?: number;
  mode?: "dark" | "light";
}

export default function FinoLogo({ size = 28, mode = "dark" }: FinoLogoProps) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      <div
        style={{
          width: size,
          height: size,
          borderRadius: 7,
          background: "#16a34a",
          color: "white",
          fontWeight: 800,
          fontSize: size * 0.55,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          letterSpacing: "-0.04em",
          fontFamily: "Inter, sans-serif",
        }}
      >
        f
      </div>
      <span
        style={{
          fontWeight: 700,
          fontSize: 18,
          letterSpacing: "-0.02em",
          color: mode === "dark" ? "white" : "#0f172a",
        }}
      >
        Fino
      </span>
    </div>
  );
}
