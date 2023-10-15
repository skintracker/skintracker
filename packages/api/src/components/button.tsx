export interface HTMXOptions {
	method: 'post' | 'get';
	route: string;
}

export interface ButtonProps {
	text: string;
	href?: string;
	htmx?: HTMXOptions;
}

export function Button({ text, href, htmx }: ButtonProps) {
	if (href) return <a href={href}>{text}</a>;
	if (!htmx) return <button type="button">{text}</button>;
	switch (htmx.method) {
		case 'post':
			return (
				<button type="button" hx-post={htmx.route} safe>
					{text}
				</button>
			);
		case 'get':
			return (
				<button type="button" hx-get={htmx.route} safe>
					{text}
				</button>
			);
	}
}
