export interface PhaseTagProps {
  phase: 1 | 2 | 3 | 4;
  skin: "Doppler" | "Gamma Doppler";
}

export function PhaseTag({ phase, skin }: PhaseTagProps) {
  const classParts = ["phase"];
  if (skin === "Gamma Doppler") {
    classParts.push("g");
  }
  classParts.push(phase.toString());
  return <span class={`phase-tag ${classParts.join("-")}`}>P{phase}</span>;
}
