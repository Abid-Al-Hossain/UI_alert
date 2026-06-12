"use client";

import type { CSSProperties } from "react";
import type { AlertState } from "../types";

const severityTone: Record<string, { label: string; icon: string; fallback: string }> = {
  info: { label: "Information", icon: "i", fallback: "#38bdf8" },
  success: { label: "Success", icon: "+", fallback: "#22c55e" },
  warning: { label: "Warning", icon: "!", fallback: "#f59e0b" },
  error: { label: "Error", icon: "!", fallback: "#fb7185" },
};

function shell(state: AlertState): CSSProperties {
  return {
    width: state.width,
    minHeight: state.height,
    padding: state.padding,
    borderRadius: state.radius,
    border: `${state.borderWidth}px solid ${state.border}`,
    boxShadow: `0 ${Math.round(state.shadow / 3)}px ${state.shadow}px rgba(0,0,0,.28)`,
    background: state.background,
    color: state.foreground,
    fontFamily: state.fontFamily,
    opacity: state.disabled ? 0.55 : 1,
    transition: state.motion ? "opacity 0.2s ease, transform 0.2s ease" : "none",
    transform: state.motion ? "translateY(0)" : undefined,
  };
}

export default function LivePreview({ state }: { state: AlertState }) {
  const tone = severityTone[state.severity] ?? severityTone.info;
  const accent = state.accent || tone.fallback;
  const isAssertive = state.role === "alert" || state.livePoliteness === "assertive";
  const isDismissed = state.previewState === "closed";
  const isFocused = state.previewState === "focus";

  if (isDismissed) {
    return (
      <div role="status" aria-live="polite" className="rounded-2xl border px-4 py-3 text-sm" style={{ borderColor: state.border, color: state.muted, fontFamily: state.fontFamily }}>
        Alert dismissed in state preview.
      </div>
    );
  }

  return (
    <section
      id={state.id}
      role={state.role}
      aria-label={state.ariaLabel}
      aria-live={state.livePoliteness}
      aria-atomic="true"
      tabIndex={state.disabled ? -1 : state.tabIndex}
      data-severity={state.severity}
      data-placement={state.placement}
      style={{
        ...shell(state),
        outline: isFocused ? `3px solid ${accent}` : "none",
        outlineOffset: isFocused ? 4 : 0,
      }}
      className="grid content-start"
    >
      <div className="grid gap-4" style={{ gap: state.gap }}>
        <div className="flex items-start gap-4">
          {state.iconMode !== "none" ? (
            <span
              aria-hidden="true"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border text-sm font-black"
              style={{ borderColor: accent, color: accent, background: `color-mix(in oklab, ${accent} 16%, transparent)` }}
            >
              {tone.icon}
            </span>
          ) : null}
          <div className="grid min-w-0 flex-1 gap-2">
            <p className="m-0 text-xs font-bold uppercase tracking-[0.16em]" style={{ color: accent }}>
              {state.label || tone.label}
            </p>
            <h3 className="m-0" style={{ fontSize: state.titleSize, fontWeight: state.fontWeight }}>
              {state.title}
            </h3>
            <p className="m-0" style={{ color: state.muted, fontSize: state.bodySize }}>
              {state.description}
            </p>
          </div>
          {state.dismissible ? (
            <button
              type="button"
              aria-label="Dismiss alert"
              disabled={state.disabled}
              className="rounded-xl border px-3 py-2 text-sm"
              style={{ borderColor: state.border, color: state.foreground }}
            >
              x
            </button>
          ) : null}
        </div>
        <p className="m-0 rounded-2xl border px-4 py-3 text-sm" style={{ borderColor: state.border, color: state.muted }}>
          {state.helper} {isAssertive ? "Assertive announcement." : "Polite announcement."}
        </p>
        {state.showActions ? (
          <div className="flex flex-wrap gap-3">
            <button type="button" disabled={state.disabled} className="rounded-xl px-4 py-2 text-sm font-bold" style={{ background: accent, color: "#020617" }}>
              Primary action
            </button>
            <button type="button" disabled={state.disabled} className="rounded-xl border px-4 py-2 text-sm font-bold" style={{ borderColor: state.border, color: state.foreground }}>
              Secondary
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
