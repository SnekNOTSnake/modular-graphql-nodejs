const { gql, makeExecutableSchema } = require('apollo-server-express')
// Deepmerge, in this case for merging objects
const deepmerge = require('deepmerge')

const directives = require('../directives')
const scalars = require('../scalars')

const globalTypeDefs = gql`
	type Query
	type Mutation
`

const makeExecutableSchemaFromModules = ({ modules }) => {
	let typeDefs = [globalTypeDefs, ...scalars.typeDefs, ...directives.typeDefs]
	let resolvers = { ...scalars.resolvers }

	modules.forEach((module) => {
		typeDefs = [...typeDefs, ...module.typeDefs]
		resolvers = deepmerge(resolvers, module.resolvers)
	})

	return makeExecutableSchema({
		typeDefs,
		resolvers,
		schemaDirectives: { ...directives.schemaDirectives },
	})
}

module.exports = {
	makeExecutableSchemaFromModules,
}
