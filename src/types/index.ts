export interface RenderConfig {
	tag: string;
	props: {
		[key: string]: any;
		children?: RenderConfig[];
		textContent?: string;
	};
}
