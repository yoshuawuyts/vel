const vel = require('vel')

const el = vel((h, state) => {
  return h.html(`
    <p>Hello my name is ${state.name}</p>
  `)
})

el.toString({ name: 'Happy Hank' })
// => <p>Hello my name is Happy Hank</p>
