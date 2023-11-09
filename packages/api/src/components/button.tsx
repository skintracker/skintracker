export enum ButtonType {
  Default = 0,
  Ghost = 1,
}

export interface ButtonProps {
  text?: string;
  children?: JSX.Element | JSX.Element[];
  classes?: string;
  type?: ButtonType;
  href?: string;
}

export function Button({
  children,
  classes,
  type,
  text,
  href,
  ...props
}: ButtonProps) {
  const classStr = (() => {
    switch (type) {
      case ButtonType.Ghost:
        return `flex p-2${classes ? ` ${classes}` : ""}`;
      default:
        return `flex border border-solid border-slate-200 rounded p-2${
          classes ? ` ${classes}` : ""
        }`;
    }
  })();
  return (
    <button
      type="button"
      class={classStr}
      {...(href ? { onclick: `location.href='${href}'` } : {})}
      {...props}
    >
      {children ?? text ?? ""}
    </button>
  );
}

export default Button;
