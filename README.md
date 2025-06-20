# @timobechtel/eslint-plugin-rules

Collection of useful eslint rules

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `@timobechtel/eslint-plugin-rules`:

```sh
npm install @timobechtel/eslint-plugin-rules --save-dev
```

## Usage

Here's an example ESLint configuration that enables all rules.

### `eslintrc.cjs`

```js
module.exports = {
    extends: ['plugin:@timobechtel/rules/all'],
}
```

### `eslint.config.cjs` (requires eslint>=v8.23.0)

```js
const plugin = require('@timobechtel/eslint-plugin-rules');

module.exports = {
    ...plugin.configs['flat/all'],
}
```

## Configurations

<!-- begin auto-generated configs list -->

|    | Name       |
| :- | :--------- |
| 🌐 | `all`      |
|    | `flat/all` |

<!-- end auto-generated configs list -->

## Rules

<!-- begin auto-generated rules list -->

💼 Configurations enabled in.\
🌐 Set in the `all` configuration.\
💡 Manually fixable by [editor suggestions](https://eslint.org/docs/latest/use/core-concepts#rule-suggestions).

| Name                                                                             | Description                                        | 💼                     | 💡 |
| :------------------------------------------------------------------------------- | :------------------------------------------------- | :--------------------- | :- |
| [no-optional-chaining-comparison](docs/rules/no-optional-chaining-comparison.md) | Disallow optional chaining in comparison operators | 🌐 ![badge-flat/all][] | 💡 |

<!-- end auto-generated rules list -->
