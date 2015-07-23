const vel = require('vel')

const el = vel((h, data) => {
  return h.html(`
    <p>Hello my name is ${data.name}</p>
  `)
})

el.toString({ name: 'Happy Hank' })
// => <p>Hello my name is Happy Hank</p>
