# sui-icon

## Description

A react component to render svg icons.

## Usage

```jsx
/*
name: String, One of the icons in the svg folder
size: Number, The size of the icon in pixels
color: String, A css fill color
*/

<Icon name="your-icon-name" />
<Icon name="your-icon-name" size={32} />
<Icon name="your-icon-name" size={32} color="#bada55" />
```

## Instalation
Clone this repository and run:
```
$ npm install
```

## Dependencies

To run the lint tasks we have dependencies of:

* [Ruby](https://www.ruby-lang.org/en/downloads/)
* [scss-lint](https://github.com/brigade/scss-lint)

If that tools are not installed you cant commit. Because the lint pass never will be ok.

## Start working in development mode:
```
$ npm run dev
```
This command will build your `.sass`, `.jsx` and `.js` files and open a local development environment, with hot reloading. A browser window will be opened as well, showing the entry point of your documents folder for development purposes.

## To work in TDD mode:
```
$ npm run test:watch
```
## To run unit tests only once:
```
$ npm test
```
## To publish yours docs page:
```
$ npm run doc
```

That will publish in a gh-page for `docs` folder.
What is a component without a public demo, isn´t ?!

## Usage
Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non perspiciatis, quod eum perferendis, facere enim hic. Quibusdam deleniti, distinctio. Molestias error quibusdam quo similique, laborum iste libero dolorum saepe et.
