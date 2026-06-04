"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Switch from "@/components/shared/input/Switch";
import type { AlertState } from "../types";

type Props = { state: AlertState; update: <K extends keyof AlertState>(key: K, value: AlertState[K]) => void };

export default function BehaviorSection({ state, update }: Props) {
  return <SectionCard title="Behavior" subtitle="Behavior controls for native alert generation."><Switch label="Dismissible" checked={state.dismissible} onChange={(value) => update("dismissible", value)} />
<Switch label="Disabled" checked={state.disabled} onChange={(value) => update("disabled", value)} /></SectionCard>;
}
