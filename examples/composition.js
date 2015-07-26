const vel = require('vel')

const header = vel((h, state) => {
  return h('h1', state.header)
})

const body = vel((h, state) => {
  return h('p', state.body)
})

const wrap = vel((h, state) => {
  return h('section', [
    header.vtree(state),
    body.vtree(state)
  ])
})

const state = {
  header: 'my header',
  body: 'lorem ipsum'
}

document.body.appendChild(wrap.render(state))
// => <section>
// =>   <h1>my header</h1>
// =>   <p>lorem ipsum</p>
// => </section>
