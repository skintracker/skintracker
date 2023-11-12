import { STSkinExterior } from "@skintracker/types/src";

export function skinExteriorToInt(exterior: STSkinExterior) {
  switch (exterior) {
    case "Factory New":
      return 0;
    case "Minimal Wear":
      return 1;
    case "Field-Tested":
      return 2;
    case "Well-Worn":
      return 3;
    case "Battle-Scarred":
      return 4;
    default:
      return 0;
  }
}
