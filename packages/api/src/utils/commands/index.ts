export interface GoToCommand {
  href: string;
}

export interface ShowModalCommand {
  "hx-get": string;
}

export const commands: Record<string, GoToCommand | ShowModalCommand> = {
  "Go to: Dashboard/Home": {
    href: "/",
  },
  Logout: {
    "hx-get": "/client/home/logout-modal",
  },
  "Add Skin": {
    "hx-get": "/client/home/add-skin-modal",
  },
  "Remove Skin": {
    "hx-get": "/client/home/add-skin-modal",
  },
  "Developer: Show Debug Page": {
    href: "/developer",
  },
};
