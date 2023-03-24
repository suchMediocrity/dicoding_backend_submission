/**
 * server.js
 * File running server. API akan berjalan ketika file ini dipanggil.
 */
const Hapi = require('@hapi/hapi')
const routes = require('./routes')

const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: 'localhost'
  })

  server.route(routes)

  await server.start()
  console.log(`Server berjalan pada ${server.info.uri}`)
}

init()
