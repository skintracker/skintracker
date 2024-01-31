export interface PhaseTagProps {
  phase: 1 | 2 | 3 | 4;
  skin: "Doppler" | "Gamma Doppler";
}

export function PhaseTag({ phase, skin }: PhaseTagProps) {
  let color = "";
  if (skin === "Doppler") {
    switch (phase) {
      case 1:
        color =
          "bg-[linear-gradient(70deg,_rgba(2,0,36,1)_0%,_rgba(121,9,61,1)_80%,_rgba(199,45,119,1)_96%)]";
        break;
      case 2:
        color =
          "bg-[linear-gradient(50deg,_rgba(2,0,36,1)_0%,_rgba(121,9,61,1)_30%,_rgba(199,45,119,1)_84%)]";
        break;
      case 3:
        color =
          "bg-[linear-gradient(90deg,_rgba(8,5,55,1)_0%,_rgba(34,17,173,1)_41%,_rgba(18,61,31,1)_71%)]";
        break;
      case 4:
        color =
          "bg-[linear-gradient(90deg,_rgba(8,5,55,1)_20%,_rgba(34,17,173,1)_94%)]";
        break;
    }
  } else {
    switch (phase) {
      case 1:
        color =
          "bg-[linear-gradient(138deg,_rgba(24,36,17,1)_63%,_rgba(102,209,45,1)_100%)]";
        break;
      case 2:
        color =
          "bg-[linear-gradient(63deg,_rgba(17,36,19,1)_16%,_rgba(38,170,92,1)_100%)]";
        break;
      case 3:
        color =
          "bg-[linear-gradient(230deg,_rgba(17,36,19,1)_25%,_rgba(52,209,198,1)_51%,_rgba(38,145,82,1)_77%)]";
        break;
      case 4:
        color =
          "bg-[linear-gradient(302deg,_rgba(68,218,49,1)_0%,_rgba(17,36,19,1)_42%,_rgba(38,145,82,1)_87%)]";
        break;
    }
  }
  return (
    <span class={`rounded-sm mx-2 italic p-1 pr-[7px] text-white ${color}`}>
      P{phase}
    </span>
  );
}
