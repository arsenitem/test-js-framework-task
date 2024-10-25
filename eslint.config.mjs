import antfu from '@antfu/eslint-config';

export default antfu({
	jsonc: false,
	stylistic: {
		indent: 'tab',
		semi: true,
		quotes: 'single',
	},
	ignores: ['**./lib/*', '**./node_modules/*'],
	rules: {
		'style/max-len': ['error', { code: 120 }],
		'style/arrow-parens': ['error', 'always'],
		'no-console': 'off',
		'accessor-pairs': 'off',
		'eslint-comments/no-unlimited-disable': 'off',
		// enforces return statements in callbacks of array's methods
		// https://eslint.org/docs/rules/array-callback-return
		'array-callback-return': ['error', { allowImplicit: true }],

		// require return statements to either always or never specify values
		// https://eslint.org/docs/rules/consistent-return
		'consistent-return': 'error',

		// disallow else after a return in an if
		// https://eslint.org/docs/rules/no-else-return
		'no-else-return': ['error', { allowElseIf: false }],

		// disallow reassignment of function parameters
		// disallow parameter object manipulation except for specific exclusions
		// rule: https://eslint.org/docs/rules/no-param-reassign.html
		'no-param-reassign': ['error', {
			props: true,
			ignorePropertyModificationsFor: [
				'acc', // for reduce accumulators
				'accumulator', // for reduce accumulators
				'e', // for e.returnvalue
				'ctx', // for Koa routing
				'context', // for Koa routing
				'req', // for Express requests
				'request', // for Express requests
				'res', // for Express responses
				'response', // for Express responses
				'$scope', // for Angular 1 scopes
				'staticContext', // for ReactRouter context
			],
		}],

		// disallow use of assignment in return statement
		// https://eslint.org/docs/rules/no-return-assign
		'no-return-assign': ['error', 'always'],

		// disallow redundant `return await`
		// https://eslint.org/docs/rules/no-return-await
		'no-return-await': 'error',

		// disallow self assignment
		// https://eslint.org/docs/rules/no-self-assign
		'no-self-assign': ['error', {
			props: true,
		}],
	},
});
