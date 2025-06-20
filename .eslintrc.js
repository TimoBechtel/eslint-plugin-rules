module.exports = {
	extends: ['eslint:recommended', 'plugin:eslint-plugin/recommended'],
	plugins: ['n', 'eslint-plugin'],
	env: {
		es2021: true,
		node: true,
	},
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
};
