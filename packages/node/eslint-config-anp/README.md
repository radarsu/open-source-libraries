<p align="center">
    <h1>eslint-config-anp</h1>
    <div>Very strict Angular & Nest & Prettier compatible eslint configuration. Comes with import, max-params-no-constructor and prettier plugins.</div>
</p>

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/radarsu)

## Table of contents

- [Table of contents](#table-of-contents)
- [Getting Started](#getting-started)
- [Usage](#usage)

## Getting Started

`npm i eslint-config-anp -D`

Installation of `eslint`, `prettier` and other dependencies is not necessary. Package has them included in it's dependencies by design.

## Usage

-   Create `.prettierrc.js` file in project's root:

```js
module.exports = require(`eslint-config-anp/dist/prettier`);
```

-   Create `.eslintrc.js` file in project's root:

```js
module.exports = {
    extends: [`./node_modules/eslint-config-anp`],
};
```
