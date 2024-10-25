import type { RenderConfig } from '~/types';

export default class MiniFramework {
	private config: RenderConfig;
	private root: HTMLElement | null = null;

	private renderedElement?: HTMLElement;

	constructor(config: RenderConfig) {
		this.config = new Proxy(config, {
			set: (target, prop: keyof RenderConfig, value) => {
				target[prop] = value; // eslint-disable-line no-param-reassign
				this.render(target);
				return true;
			},
		});
	}

	mount(selector: string) {
		if (this.root) {
			throw new Error('Already mounted');
		}

		this.root = document.querySelector(selector);
		if (!this.root) {
			throw new Error('Root node not found');
		}

		this.render(this.config);
	}

	updateConfig(config: RenderConfig) {
		Object.assign(this.config, config);
	}

	private render(config: RenderConfig) {
		this.renderedElement = this.createRenderElement(config);
		if (this.root && this.renderedElement) {
			this.root.innerHTML = '';
			this.root.appendChild(this.renderedElement);
		}
	}

	private createRenderElement(config: RenderConfig): HTMLElement {
		const element = document.createElement(config.tag);

		Object.entries(config.props).forEach(([key, value]) => {
			if (key === 'children')
				return;
			if (key === 'textContent') {
				element.textContent = value;
			}
			else {
				element.setAttribute(key, value);
			}
		});

		if (config.props.children) {
			config.props.children.forEach((childConfig) => {
				element.appendChild(this.createRenderElement(childConfig));
			});
		}

		return element;
	}
}
