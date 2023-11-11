import { AponiaCtx } from "aponia";

export type AponiaCtxExtended = AponiaCtx & {
  setCookie: (name: string, value: string, options?: unknown) => void;
  removeCookie: (name: string) => void;
  jwt: {
    sign: (payload: unknown) => Promise<string>;
    verify: <ReturnType = unknown, PayloadType = unknown>(
      payload: PayloadType,
    ) => Promise<ReturnType>;
  };
};
