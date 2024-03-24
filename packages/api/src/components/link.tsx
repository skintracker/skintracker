export type LinkProps = JSX.IntrinsicElements["a"] & {
  children?: JSX.Element | JSX.Element[];
};

export function Link({ children, ...props }: LinkProps) {
  return (
    <a class="link" {...props}>
      {children}
    </a>
  );
}

export function LinkNav({ children, ...props }: LinkProps) {
  return (
    <a class="link link-nav" {...props}>
      {children}
    </a>
  );
}

export default Link;
