export interface PhaseTagProps {
  phase: 1 | 2 | 3 | 4;
  skin: "Doppler" | "Gamma Doppler";
}

export function PhaseTag({ phase, skin }: PhaseTagProps) {
  let color = "";
  if (skin === "Doppler") {
    switch (phase) {
      case 1: {
        color =
          "bg-[linear-gradient(70deg,_rgba(2,0,36,1)_0%,_rgba(121,9,61,1)_80%,_rgba(199,45,119,1)_96%)] text-white";
        break;
      }
      case 2: {
        color =
          "bg-[linear-gradient(50deg,_rgba(2,0,36,1)_0%,_rgba(121,9,61,1)_30%,_rgba(199,45,119,1)_84%)] text-white";
        break;
      }
      case 3: {
        color =
          "bg-[linear-gradient(90deg,_rgba(8,5,55,1)_0%,_rgba(34,17,173,1)_41%,_rgba(18,61,31,1)_71%)] text-white";
        break;
      }
      case 4: {
        color =
          "bg-[linear-gradient(90deg,_rgba(8,5,55,1)_20%,_rgba(34,17,173,1)_94%)] text-white";
        break;
      }
    }
  }
  return (
    <span class={`rounded-sm mx-2 italic p-1 pr-[7px] ${color}`}>P{phase}</span>
  );
}
