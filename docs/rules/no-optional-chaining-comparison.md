# Disallow optional chaining in comparison operators (`@timobechtel/rules/no-optional-chaining-comparison`)

💼 This rule is enabled in the following configs: 🌐 `all`, `flat/all`.

💡 This rule is manually fixable by [editor suggestions](https://eslint.org/docs/latest/use/core-concepts#rule-suggestions).

<!-- end auto-generated rule header -->

## Description

This rule disallows the use of optional chaining in both sides of a comparison operator.

### Why

Both sides of the comparison can be undefined when using optional chaining. This could lead to unexpected results. See examples below.

### Examples

#### Invalid ❌

```js
const isOwner = useMemo(() => {
   // 🚨 currentUser and author might not be loaded yet (undefined) causing the comparison to return true
  return currentUser?.id === author?.id;
}, [currentUser, author]);
```

#### Valid ✅

```js
const isOwner = useMemo(() => {
   // ✅ currentUser and author are checked before the comparison
  return currentUser && author && currentUser.id === author.id;
}, [currentUser, author]);
```

## Options

<!-- begin auto-generated rule options list -->

| Name        | Type     | Default        |
| :---------- | :------- | :------------- |
| `operators` | String[] | [`===`, `!==`] |

<!-- end auto-generated rule options list -->
