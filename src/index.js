const { GraphQLServer } = require('graphql-yoga')
const { importSchema } = require('graphql-import')
const { Prisma } = require('prisma-binding')
const { me, signup, login, AuthPayload } = require('./auth')

const resolvers = {
  Query: {
    me,
  },
  Mutation: {
    signup,
    login,
  },
  // AuthPayload,
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',             // points to Prisma database schema
      endpoint: 'https://eu1.prisma.sh/nikolas/auth-example/prod',   // Prisma service endpoint (see `~/.prisma/config.yml`)
      secret: 'mysecret123',                                // `secret` taken from `prisma.yml`
      debug: true                                           // log all requests to the Prisma API to console
    }),
  }),
})

server.start(() => console.log(`Server is running on http://localhost:4000`))
