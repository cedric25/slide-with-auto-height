# Vue 3 + Vite

👉 Github repo linked to Medium post: https://medium.com/front-end-weekly/a-slide-transition-with-changing-height-bb504d0aa7fa

## Final result

![Final result](./final-result.gif)

## Start

```
git clone https://github.com/cedric25/slide-with-auto-height.git
cd slide-with-auto-height
```

or faster and without all the git history:

```
npm init using cedric25/slide-with-auto-height slide-with-auto-height
```

(Feel free to use `npm` or `yarn`)

```
pnpm install
pnpm dev
```

## Initial steps to create this repo

Init project:
```
pnpm create vite slide-with-auto-height --template vue
```

Install TailwindCSS:
```
pnpm install -D tailwindcss postcss autoprefixer

pnpx tailwindcss init -p
```

Install Prettier:
```
pnpm add prettier prettier-plugin-tailwindcss -D
```

And later on:  
+ TypeScript  
+ ESLint  
+ [eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue)  
+ [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components)
+ [VueUse](https://vueuse.org/)
