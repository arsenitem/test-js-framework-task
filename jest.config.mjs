export default {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.ts': 'ts-jest',
	},
	moduleFileExtensions: ['ts', 'js'],
};