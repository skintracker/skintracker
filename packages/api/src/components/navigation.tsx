import { Button } from "./button";

export interface NavigationItem {
	name: string;
	route: string;
}

export interface NavigationProps {
	items: NavigationItem[];
}

export default function Navigation({ items }: NavigationProps) {
	return (
		<nav id="navigation" class="bg-slate-800 text-white py-4 px-8">
			<div id="navigation-container" class="grid grid-cols-2">
				<a href="/">
					<span class="text-xl font-bold">Skintracker</span>
				</a>
				<ul class="justify-self-end">
					{items.map((item) => {
						return (
							<li>
								<Button type={1} text={item.name} href={item.route} />
							</li>
						);
					})}
				</ul>
			</div>
		</nav>
	);
}
