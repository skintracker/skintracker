import pino from "pino";

export const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
  level: Bun.env.NODE_ENV === "production" ? "warn" : "info",
});

export default logger;
