// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
export interface DividerProps {}

export default function Divider({ ...props }: DividerProps & JSX.IntrinsicElements["hr"]) {
  return <hr class="border-gray-200 border-1 mb-2" {...props} />;
}
