# vue-poc

> A Vue.js poc with 3 pages :

- HelloWorld.vue : index included links to the others pages
- Table : example of datatable component with data provides by JsonPlaceHolder
- Albums : CRUD implementation with FireBase Database

The project was built with vue-cli full-featured Webpack + vue-loader setup with hot reload, linting, testing & css extraction :

``` bash
# installer vue-cli
$ npm install --global vue-cli
# créer un nouveau projet en utilisant le template "webpack"
$ vue init webpack vue-poc
```

It includes : 

- vue-router
- EsLint
- Karma + Mocha for unit testing
- e2e tests with Nigthwatch

I add : 

- Bootstrap
- Firebase
- vuefire : Firebase bindings for Vue.js
- vue-resource : Http client for Vue.js

## Prerequisites

[Node.js](https://nodejs.org/en/) (>=4.x, 6.x preferred), npm version 3+ and [Git](https://git-scm.com/).

## Demo

Demo here : http://vue-poc.surge.sh/#/post

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
