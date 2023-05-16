# Shopify Dev Start

## Prerequisites
I'm assuming you've already have a working environment w/ Node, NPM, Git, Vite, Shopify-cli installed. 
If not, please install them first.

## Installation
1. Getting theme instals going.
```sh
$ npm init -y
$ npm create vite
$ npm install
$ npm install --save-dev tailwindcss postcss autoprefixer
$ npx tailwindcss init -p
$ npm install --save-dev vite-plugin-shopify
$ npm install --save-dev npm-run-all
```
2. Download the theme from Shopify
```
$ shopify theme pull
```
Usually I'll start downloading Dawn 9.0.0 theme from Shopify and then modify it to my needs.

3. Create and Modify the vite.config.js
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
6. Create tailwind build process
```sh
$ npx tailwindcss -i ./src/tailwnd.css -o ./assets/tailwind.css
```
7. Update package.json > scripts
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
8. Add reference to tailwind.css in layout/theme.liquid
```liquid
{{ 'tailwind.css' | asset_url | stylesheet_tag }}
```
9. Add reference to AlpineJS via CDN in layout/theme.liquid
```html
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.12.1/dist/cdn.min.js"></script>
```
10. Remove the vite vanilla files from base directory

## Shopify Dev Start
```sh
$ npm run dev
```
## Shopify Deploy
```sh
$ npm run build:deploy
```
NOTE: you need to have an already theme created on the store just to be pushed