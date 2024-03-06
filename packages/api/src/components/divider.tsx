export type DividerProps = JSX.IntrinsicElements["hr"];

export function Divider({ ...props }: DividerProps) {
  return <hr class="divider" {...props} />;
}

export function DividerSpaced({ ...props }: DividerProps) {
  return <hr class="divider-spaced" {...props} />;
}

export default Divider;
