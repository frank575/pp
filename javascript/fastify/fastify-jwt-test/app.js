const fastify = require('fastify')({
  logger: false
})

fastify.register(require('fastify-jwt'), {
  secret: 'secret'
})

fastify.decorate("authenticate", async (request, reply) => {
  try {
    await request.jwtVerify()
  } catch (err) {
    reply.send(err)
  }
})

fastify.route({
  method: 'GET',
  url: '/secret',
  preHandler: [fastify.authenticate],
  handler: (req, reply) => {
    reply.send('secret')
  }
})

fastify.post('/signup', (req, reply) => {
  const token = fastify.jwt.sign({
    foo: 'bar'
  })
  reply.send({
    token
  })
})

fastify.listen(3000, '0.0.0.0', function(err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`server listening on ${address}`)
})
