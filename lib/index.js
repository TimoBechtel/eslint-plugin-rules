/**
 * @fileoverview collection of useful eslint rules
 * @author Timo Bechtel
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const requireIndex = require('requireindex');
const packageJson = require('../package.json');
const PLUGIN_NAME = packageJson.name.replace(/^(@.*\/)?eslint-plugin-/, '$1');

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

const rules = requireIndex(__dirname + '/rules');

/** @type {import("eslint").ESLint.Plugin} */
const plugin = {
	meta: {
		name: packageJson.name,
		version: packageJson.version,
	},
	rules,
	configs: {
		all: {
			plugins: [PLUGIN_NAME],
			rules: Object.fromEntries(
				Object.entries(rules).map(([ruleName]) => [
					`${PLUGIN_NAME}/${ruleName}`,
					'error',
				])
			),
		},
	},
};

// flat config
/** @type {import("eslint").ESLint.ConfigData} */
plugin.configs['flat/all'] = {
	name: `${packageJson.name}/flat/all`,
	plugins: { [PLUGIN_NAME]: plugin },
	rules: Object.fromEntries(
		Object.entries(rules).map(([ruleName]) => [
			`${PLUGIN_NAME}/${ruleName}`,
			'error',
		])
	),
};

module.exports = plugin;
