module.exports = {
	env: {
		commonjs: true,
		es2021: true,
		jest: true,
	},
	extends: ['xo'],
	parserOptions: {
		ecmaVersion: 'latest'
	},
	ignorePatterns: ['app/migrations/*.js', '.eslintrc.js'],
	overrides: [
		{
			files: ['app/routes/event.routes.js'], // ignored because of the express Router() method.
			rules: {
				"new-cap": "off",
			}
		}
	],
	rules: {}
};
