const noop = require('noop2')
const test = require('tape')
const raf = require('raf')
const vel = require('./')

test('el = vel() should assert input types', function (t) {
  t.plan(1)
  t.throws(vel, /function/)
})

test('el = vel() should be a function', function (t) {
  t.plan(1)
  const el = vel(noop)
  t.equal(typeof el, 'function')
})

test('el() should render an element', function (t) {
  t.plan(5)

  const el = vel(function (h, state) {
    t.equal(typeof state, 'object')
    t.equal(typeof h, 'function')
    t.equal(state.foo, 'bar')
    return h('div')
  })
  const node = el({ foo: 'bar' })

  t.equal(typeof node, 'object')
  t.equal(node.nodeType, 1, 'is dom')
})

test('el() can parse string templates', function (t) {
  t.plan(2)

  const el = vel(function (h, state) {
    return h.html('<div>hello silly world</div>')
  })
  const node = el({ foo: 'bar' })

  t.equal(typeof node, 'object')
  t.equal(node.nodeType, 1, 'is dom')
})

test('el can create svg elements', function (t) {
  t.plan(2)

  const el = vel(function (h, state) {
    return h.svg('svg', { width: 400, height: 300 })
  })
  const node = el()

  t.equal(typeof node, 'object')
  t.equal(node.tagName, 'svg')
})

test('calling el() twice should update an element', function (t) {
  t.plan(8)

  const el = vel(function (h, state) {
    t.equal(typeof state, 'object')
    t.equal(typeof h, 'function')
    return h('div', state.foo)
  })

  const node = el({ foo: 'bar' })

  t.equal(typeof node, 'object')
  t.equal(typeof node.childNodes[0], 'object')
  t.equal(node.childNodes[0].data, 'bar')

  el({ foo: 'baz' })
  raf(function () {
    t.equal(node.childNodes[0].data, 'baz')
  })
})

test('el() and el.render() are aliases', function (t) {
  t.plan(1)
  const el = vel(noop)
  t.equal(el, el.render)
})

test('calling el.toString() renders to string', function (t) {
  t.plan(1)
  const el = vel(function (h, state) {
    return h('div', 'hello ' + state + ' world')
  })
  const str = el.toString('cruel')
  t.equal(str, '<div>hello cruel world</div>')
})
