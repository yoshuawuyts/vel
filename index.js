const create = require('virtual-dom/create-element')
const svg = require('virtual-hyperscript-svg')
const patch = require('virtual-dom/patch')
const diff = require('virtual-dom/diff')
const toHtml = require('vdom-to-html')
const mainLoop = require('main-loop')
const html = require('virtual-html')
const h = require('virtual-dom/h')
const assert = require('assert')

h.html = html
h.svg = svg

module.exports = vel

// initialize a new virtual element
// fn -> null
function vel (rend) {
  assert.equal(typeof rend, 'function')

  var update = null
  render.toString = toString
  render.render = render
  return render

  // render the element's vdom tree to DOM nodes
  // which can be mounted on the DOM
  // any? -> DOMNode
  function render (data) {
    if (update) return update(data)

    const loop = mainLoop(data, renderFn(rend), {
      create: create,
      diff: diff,
      patch: patch
    })

    update = loop.update

    return loop.target
  }

  // render the element's vdom tree to a string
  // any? -> str
  function toString (data) {
    return toHtml(renderFn(rend)(data))
  }
}

// render function
// (fn, fn) -> fn(any?) -> obj
function renderFn (rend) {
  return function (data) {
    return rend(h, data)
  }
}
