import { STSkinCategory } from "@skintracker/types/src";

export function skinCategoryToInt(category: STSkinCategory) {
  switch (category) {
    case "Normal":
      return 0;
    case "StatTrak™":
      return 1;
    case "Souvenir":
      return 2;
    default:
      return 0;
  }
}
