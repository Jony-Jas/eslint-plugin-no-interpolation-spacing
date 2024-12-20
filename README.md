﻿# eslint-plugin-no-interpolation-spacing

A custom ESLint plugin to enforce no spacing between Angular-style interpolations (`{{ }}`) and HTML elements, ensuring clean and consistent coding standards for your Angular templates.

---

## Installation

Install the plugin using npm:

```bash
npm install eslint-plugin-no-interpolation-spacing --save-dev
```
Or using yarn:
```bash
yarn add eslint-plugin-no-interpolation-spacing --dev
```

## Usage

### Add the Plugin to Your ESLint Configuration

Add no-interpolation-spacing to your ESLint configuration file. Below is an example using `.eslintrc.json`:

```json
{
    "plugins": ["no-interpolation-spacing"],
    "rules": {
        "no-interpolation-spacing/no-space-between-interpolation-and-element": "error"
    }
}
```
Or if you use `eslint.config.js`:
```javascript
const noInterpolationSpacingPlugin = require('eslint-plugin-no-interpolation-spacing');

module.exports = {
  plugins: {
    'no-interpolation-spacing': noInterpolationSpacingPlugin,
  },
  rules: {
    'no-interpolation-spacing/no-space-between-interpolation-and-element': 'error',
  },
};
```
## Configuration
This plugin is primarily designed for Angular templates and HTML files. Make sure your ESLint configuration targets `.html` files.
#### Example in `eslint.config.js`:
```javascript
module.exports = [
  {
    files: ['**/*.html'], // Apply only to HTML files
    plugins: {
      'no-interpolation-spacing': require('eslint-plugin-no-interpolation-spacing'),
    },
    rules: {
      'no-interpolation-spacing/no-space-between-interpolation-and-element': 'error',
    },
  },
];

```


## Rule `no-space-between-interpolation-and-element`
This rule ensures there are no spaces or newlines between Angular-style interpolations (`{{ }}`) and adjacent elements in HTML files.

#### Example:
✅ Correct:
```html
<div>{{value}}</div>
<span>Hello {{name}}</span>
```
❌ Incorrect:
```html
<div> {{value}}</div>
<span>Hello {{ name }}</span>
```

## Contributing
We welcome contributions! If you'd like to contribute, follow these steps:

* Fork the repository.
* Make your changes.
* Submit a pull request.


## Changelog

See `Github Releases` for realease notes and changelog.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
