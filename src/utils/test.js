const request = require('supertest')
const app = require('../app')

const graphQLRequest = ({ query, variables = null }) => {
	return request(app).post('/graphql').send({ variables, query })
}

module.exports = { request: graphQLRequest }
