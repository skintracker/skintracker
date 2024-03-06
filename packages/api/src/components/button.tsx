export interface ButtonProps {
  children?: JSX.Element | JSX.Element[];
}

export interface LinkButtonProps extends ButtonProps {
  href: string;
}

export function ButtonGhost({ children, ...props }: ButtonProps) {
  return (
    <button type="button" class="button" {...props}>
      {children}
    </button>
  );
}

export function ButtonPrimary({ children, ...props }: ButtonProps) {
  return (
    <button type="button" class="button button-primary" {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({ children, href, ...props }: LinkButtonProps) {
  return (
    <button
      type="button"
      class="button button-primary"
      onclick={`location.href=${href}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default ButtonPrimary;
