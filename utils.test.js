const mongoose = require('mongoose')
const packageModule = require('./package.json')

const getMongo = ({ mongoUrl, dropDatabase = true, connectionWhitelist }) => {
	if (mongoose.connection.host)
		throw new Error(
			`There was already a mongoose connection, this was dangerous. It's connected to: ${mongoose.connection.host}`,
		)

	let hasConnected = false

	const connect = async () => {
		await mongoose.connect(mongoUrl, {
			useNewUrlParser: true,
			promiseLibrary: global.Promise,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
		})

		hasConnected = true

		// eslint-disable-next-line no-console
		console.log(`Database connected on ${mongoUrl}`)
	}

	const drop = async () => {
		if (!hasConnected)
			throw new Error(
				'Was trying to drop a database, but not connected to the test database',
			)

		if (!connectionWhitelist.includes(mongoose.connection.client.s.url))
			throw new Error('Was trying to a non-whitelisted database, aborted')

		await mongoose.connection.db.dropDatabase()
		// eslint-disable-next-line no-console
		console.log('Test database dropped')
	}

	const close = async () => {
		// eslint-disable-next-line no-console
		console.log('Closing mongoose connection')

		if (!mongoose.connection)
			throw new Error('Could not close connection, there was none')

		if (!hasConnected)
			throw new Error(
				`Tried to close connection to ${mongoose.connection.host}, but was not connected t ourl ${mongoUrl}`,
			)

		await Promise.all(
			mongoose.modelNames().map((model) => {
				return mongoose.model(model).ensureIndexes()
			}),
		)

		await mongoose.disconnect()

		hasConnected = false

		// eslint-disable-next-line no-console
		console.log('Mongoose connection closed')
	}

	return {
		connect,
		drop,
		close,
	}
}

const mongo = getMongo({
	mongoUrl: `mongodb://localhost:27017/${packageModule.name}-test`,
	connectionWhitelist: [`mongodb://localhost:27017/${packageModule.name}-test`],
})

// Run this function before running tests
global.before(async () => {
	if (process.env.NODE_ENV !== 'mocha')
		throw new Error('NODE_ENV should be set to "mocha"')

	// Create connection
	await mongo.connect()
	// Clear previous database
	await mongo.drop()
})

// Run this function after running tests
global.after(async () => {
	// Close connection
	await mongo.close()
})
