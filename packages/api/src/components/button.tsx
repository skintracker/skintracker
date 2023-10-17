export interface HTMXOptions {
  method: "post" | "get";
  route: string;
  target?: string;
  swap?: string;
}

export enum ButtonType {
  Default = 0,
  Ghost = 1,
}

export interface ButtonProps {
  text: string;
  classes?: string;
  type?: ButtonType;
  href?: string;
  htmx?: HTMXOptions;
  _?: string;
}

export function Button({ classes, type, text, href, htmx, _ }: ButtonProps) {
  const classStr = (() => {
    switch (type) {
      case ButtonType.Ghost:
        return `p-2 ${classes}`;
      default:
        return `border border-solid border-slate-200 rounded p-2 ${classes}`;
    }
  })();
  if (href)
    return (
      <a href={href} class={classStr} data-script={_} safe>
        {text}
      </a>
    );
  if (!htmx)
    return (
      <button type="button" class={classStr} data-script={_} safe>
        {text}
      </button>
    );
  switch (htmx.method) {
    case "post":
      return (
        <button
          type="button"
          class={classStr}
          hx-post={htmx.route}
          hx-swap={htmx.swap}
          hx-target={htmx.target}
          data-script={_}
          safe
        >
          {text}
        </button>
      );
    case "get":
      return (
        <button
          type="button"
          class={classStr}
          hx-get={htmx.route}
          hx-swap={htmx.swap}
          hx-target={htmx.target}
          data-script={_}
          safe
        >
          {text}
        </button>
      );
  }
}

export default Button;
