# vel
[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![Downloads][downloads-image]][downloads-url]
[![js-standard-style][standard-image]][standard-url]

Efficiently create and render
[virtual-dom](https://github.com/Matt-Esch/virtual-dom) elements.

## Installation
```bash
$ npm install vel
```

## Usage
```js
const vel = require('vel')

const el = vel((h, state) => h.html(`<p>hello ${state.type} world</p>`))
const node = el({ type: 'cruel' })

document.body.appendChild(node)
// <p>hello cruel world</p>
```

## API
### el = vel(cb(h, state))
Initialize a new virtual element.  Listen to the `render` event. Expects a
`vdom` tree to be returned. `h` accepts [`virtual-dom` elements](https://github.com/Matt-Esch/virtual-dom),
`h.html` accepts 
[HTML strings](https://github.com/substack/virtual-hyperscript-svg) and `h.svg`
accepts
[`virtual-dom` SVG elements](https://github.com/substack/virtual-hyperscript-svg).

### el([state])
Render the element's vdom tree to DOM nodes which can be mounted on the DOM.
Uses [main-loop](https://github.com/Raynos/main-loop) under the hood. Calling
the method again will re-render the DOM nodes with the new state. Alias:
`el.render([state])`.

### el.toString([state])
Render the element's vdom tree to a string. For example useful to pre-render
HTML on the server, or save to a static file.

### vtree = el.vtree([data])
Get the element's vdom tree. Useful for element composition.

## FAQ
### why did you write this?
Using `virtual-dom` requires quite some boilerplate. `vel` removes the need for
that boilerplate without adding extra features, making it easier to write
`virtual-dom` systems.

### why is there no state transport mechanism included?
`vel` does one thing, and only one thing. Instead of including a state transport
mechanism I felt it made more sense to let users decide for themselves how they
want their state to flow between components.

### what's the difference between virtual-dom and react?
`react` is an opinionated framework that uses non-standard syntax to create
systems. It forces users to write JS in OO style and is hard to switch from
once you buy into it. `virtual-dom` does away with those opinions, giving users
a blazingly fast rendering engine without the overhead of a framework.

### this module sound lot like base-element!
Yeah, definitely! I'm actually a huge fan of
[`base-element`](https://www.npmjs.com/package/base-element). However I wanted
something a little more barebone favoring composition over inheritance. If
inheritance is your thing, definitely check out
[`base-element`](https://www.npmjs.com/package/base-element) (and say hi to
[@shama](https://github.com/shama) for me :grin:).

## See Also
- [virtual-dom](https://github.com/Matt-Esch/virtual-dom)
- [virtual-hyperscript-svg](https://github.com/substack/virtual-hyperscript-svg)
- [main-loop](https://github.com/Raynos/main-loop)
- [virtual-html](https://github.com/azer/virtual-html)
- [vdom-to-html](https://github.com/nthtran/vdom-to-html/)

## License
[MIT](https://tldrlegal.com/license/mit-license)

[npm-image]: https://img.shields.io/npm/v/vel.svg?style=flat-square
[npm-url]: https://npmjs.org/package/vel
[travis-image]: https://img.shields.io/travis/yoshuawuyts/vel/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/yoshuawuyts/vel
[codecov-image]: https://img.shields.io/codecov/c/github/yoshuawuyts/vel/master.svg?style=flat-square
[codecov-url]: https://codecov.io/github/yoshuawuyts/vel
[downloads-image]: http://img.shields.io/npm/dm/vel.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/vel
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: https://github.com/feross/standard
