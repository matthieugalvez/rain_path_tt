import type { ReactNode } from "react";

interface Props {
  title: string;
  children?: ReactNode;
  background?: string;
  selected?: boolean;
  invalid?: boolean;
  simulationStatus?: "completed" | "current" | "future";
}

export default function BaseNode({
  title,
  children,
  background = "#ffffff",
  selected = false,
  invalid = false,
  simulationStatus = "future",
}: Props) {
  const runtimeStyle =
    simulationStatus === "completed"
      ? {
          opacity: 0.4,

          filter: "grayscale(1)",

          transition: "all 0.25s ease",
        }
      : simulationStatus === "current"
        ? {
            boxShadow: "0 0 0 8px rgba(245,158,11,0.3)",

            transition: "all 0.25s ease",
          }
        : {};

  return (
    <div
      style={{
        minWidth: 220,

        padding: 16,

        borderRadius: 14,

        ...runtimeStyle,

        border: invalid
          ? "2px solid #dc2626"
          : selected
            ? "2px solid #2563eb"
            : simulationStatus === "current"
              ? "2px solid #f59e0b"
              : "1px solid #d1d5db",

        background,

        transition: "all 0.15s ease",

        transform: selected ? "scale(1.02)" : "scale(1)",

        boxShadow: invalid
          ? "0 0 0 4px rgba(220,38,38,0.15)"
          : selected
            ? "0 0 0 4px rgba(37,99,235,0.15)"
            : "0 2px 6px rgba(0,0,0,0.08)",

        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          fontWeight: 700,
          marginBottom: 10,
          fontSize: 15,
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: 14,
          color: "#374151",
        }}
      >
        {children}
      </div>
    </div>
  );
}
