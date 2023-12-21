import { PhaseTag } from "@/components/phase-tag";
import { STSkin } from "@skintracker/types/src";

export function renderSkinPhaseTag(skin: STSkin): JSX.Element | string {
  if (!skin.phase || skin.phase === null) return "";
  return (
    <PhaseTag
      phase={skin.phase}
      skin={skin.name as "Doppler" | "Gamma Doppler"}
    />
  );
}
