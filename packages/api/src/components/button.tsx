export interface ButtonProps {
  text: string;
  onClickRoute: string;
}

export function Button({ text, onClickRoute }: ButtonProps) {
  return (
    <button type="button" hx-post={onClickRoute}>
      {text}
    </button>
  );
}
