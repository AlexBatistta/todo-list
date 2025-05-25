import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginPrettier from 'eslint-plugin-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig([
	js.configs.recommended,
	tseslint.configs.recommended,
	pluginReact.configs.flat.recommended,
	{
		files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
		languageOptions: {
			globals: globals.browser,
		},
		plugins: {
			react: pluginReact,
			prettier: pluginPrettier,
		},
		rules: {
			'react/react-in-jsx-scope': 'off',
			'@typescript-eslint/explicit-function-return-type': 'error',
			eqeqeq: ['error', 'always'],
			curly: 'error',
			'react/jsx-boolean-value': ['error', 'never'],
			'react/self-closing-comp': 'warn',
			'react/jsx-curly-brace-presence': [
				'error',
				{ props: 'never', children: 'never' },
			],
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{ argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
			],
			'@typescript-eslint/consistent-type-imports': 'error',
			'@typescript-eslint/no-explicit-any': 'warn',
			'linebreak-style': 'off',
			'react/prop-types': 'off',
		},
	},
]);
