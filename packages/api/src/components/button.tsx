export interface HTMXOptions {
	method: "post" | "get";
	route: string;
}

export enum ButtonType {
	Default = 0,
	Ghost = 1,
}

export interface ButtonProps {
	text: string;
	type?: ButtonType;
	href?: string;
	htmx?: HTMXOptions;
}

export function Button({ type, text, href, htmx }: ButtonProps) {
	const classStr = (() => {
		switch (type) {
			case ButtonType.Ghost:
				return "p-2";
			default:
				return "border border-solid border-slate-200 rounded p-2";
		}
	})();
	if (href)
		return (
			<a href={href} class={classStr} safe>
				{text}
			</a>
		);
	if (!htmx)
		return (
			<button type="button" class={classStr} safe>
				{text}
			</button>
		);
	switch (htmx.method) {
		case "post":
			return (
				<button type="button" class={classStr} hx-post={htmx.route} safe>
					{text}
				</button>
			);
		case "get":
			return (
				<button type="button" class={classStr} hx-get={htmx.route} safe>
					{text}
				</button>
			);
	}
}
