export interface LinkProps {
  children?: JSX.Element | JSX.Element[];
}

export function Link({
  children,
  ...props
}: LinkProps & JSX.IntrinsicElements["a"]) {
  return (
    <a class="hover:cursor-pointer" {...props}>
      {children}
    </a>
  );
}
