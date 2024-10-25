import type { RenderConfig } from '../types';
import MiniFramework from '../index';

describe('miniFramework', () => {
	let app: MiniFramework;
	let container: HTMLElement;

	beforeEach(() => {
		document.body.innerHTML = '<div id="app"></div>';
		container = document.getElementById('app')!;
	});

	it('should render initial config', () => {
		const config: RenderConfig = {
			tag: 'div',
			props: {
				class: 'class1',
				id: 'wrapper',
				children: [
					{
						tag: 'p',
						props: {
							class: 'text',
							textContent: 'Hello, World!',
							children: [
								{
									tag: 'span',
									props: {
										class: 'highlight',
										textContent: 'This is a span.',
									},
								},
							],
						},
					},
				],
			},
		};

		app = new MiniFramework(config);
		app.mount('#app');
		expect(container.innerHTML).toContain('Hello, World!');
		expect(container.querySelector('span')!.textContent).toBe('This is a span.');
	});

	it('should update config dynamically', () => {
		const initialConfig: RenderConfig = {
			tag: 'div',
			props: {
				class: 'class1',
				id: 'wrapper',
				children: [
					{
						tag: 'p',
						props: {
							class: 'text',
							textContent: 'Hello, World!',
							children: [
								{
									tag: 'span',
									props: {
										class: 'highlight',
										textContent: 'This is a span.',
									},
								},
							],
						},
					},
				],
			},
		};

		const updatedConfig: RenderConfig = {
			tag: 'div',
			props: {
				class: 'newClass',
				id: 'newWrapper',
				children: [
					{
						tag: 'p',
						props: {
							class: 'newText',
							textContent: 'Updated text',
						},
					},
				],
			},
		};

		app = new MiniFramework(initialConfig);
		app.mount('#app');
		app.updateConfig(updatedConfig);

		expect(container.innerHTML).toContain('Updated text');
		expect(container.querySelector('div')!.className).toBe('newClass');
	});
});
