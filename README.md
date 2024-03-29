#This has been updated --> [2025|SVTA](https://github.com/taftera/2025-vta)
----
# Shopify Dev Start

## Prerequisites
I'm assuming you've already have a working environment w/ Node, NPM, Git, Vite, Shopify-cli installed. 
If not, please install them first.

## Installation
1. Getting theme installs going.
```sh
$ npm init -y
$ npm create vite
$ npm install
$ npm install --save-dev tailwindcss postcss autoprefixer
$ npx tailwindcss init -p
$ npm install --save-dev vite
$ npm install --save-dev vite-plugin-shopify
$ npm install --save-dev npm-run-all
```
2. Download the theme from Shopify Store
```
$ shopify theme pull
$ shopify theme check --init
```
Usually I'll start downloading Dawn 10.0.0 theme from Shopify and then modify it to my needs.

3. Create and Modify the ./vite.config.js
```js
import shopify from 'vite-plugin-shopify'

export default {
  plugins: [
    shopify()
  ]
}
```
4. Set up tailwind.config.js
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './config/*.json',
    './layout/*.liquid',
    './assets/*.liquid',
    './sections/*.liquid',
    './snippets/*.liquid',
    './templates/*.liquid',
    './templates/*.json',
    './templates/customers/*.liquid'
  ],
  prefix: 'tw-',
  theme: {
    screens: {
      sm: '320px',
      md: '750px',
      lg: '990px',
      xlg: '1440px',
      x2lg: '1920px',
      pageMaxWidth: '1440px',
    },
    extend: {},
  },
  plugins: [],
}
```
5. Create tailwind css file src/tailwnd.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
6. Update postcss.config.js with:
```javascript
export default {
// instead of 
module.exports = {
```
7. Create tailwind build process
```sh
$ npx tailwindcss -i ./src/tailwnd.css -o ./assets/tailwind.css
```
8. Update package.json > scripts
```json
{
  "scripts": {
    "dev": "run-p -sr dev:shopify dev:vite dev:tailwind",
    "dev:shopify": "shopify theme dev", 
    "dev:tailwind": "npx tailwindcss -i ./src/tailwind.css -o ./assets/tailwind.css --watch",
    "dev:vite": "vite", 
    "build": "vite build",
    "build:css": "npx tailwindcss -o assets/tailwind.css --minify",
    "build:deploy": "run-p -sr build:css && run-p -sr build:push",
    "build:push": "shopify theme push",
    "preview": "vite preview"
  }
}
```
```ssh
$ npm install
```
9. Add reference to tailwind.css in layout/theme.liquid
```liquid
{{ 'tailwind.css' | asset_url | stylesheet_tag }}
```
10. Add reference to AlpineJS via CDN in layout/theme.liquid
```html
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.12.1/dist/cdn.min.js"></script>
```
11. Remove the vite vanilla files from base directory
12. Add Shopify Prettier support
```ssh
$ npm install --save-dev prettier @shopify/prettier-plugin-liquid
```
13. Create .prettierrc file
```json
{
  "plugins": ["@shopify/prettier-plugin-liquid"]
}
```

## Shopify Dev Start
```sh
$ npm run dev
```
## Shopify Deploy
```sh
$ npm run build:deploy
```
NOTE: you need to have an already theme created on the store just to be pushed

### Last update 2023/07/18
