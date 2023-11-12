import { GoToCommand } from "../commands";

export function isGoToCommand(obj: unknown): obj is GoToCommand {
  return typeof obj === "object" && obj !== null && "href" in obj;
}
