const throng = require('throng')
const mongoose = require('mongoose')
// For operations like what `path` can do but URL
const url = require('url')
const app = require('./app')
const config = require('./config')

// localhost:27017
const mongoHost = new url.URL(config.MONGODB_URI).host

const startServer = async () => {
	try {
		await Promise.all([
			mongoose.connect(config.MONGODB_URI, {
				useNewUrlParser: true,
				useCreateIndex: true,
				useUnifiedTopology: true,
				useFindAndModify: false,
				// A Promise library class the application wishes to use such as Bluebird, must be ES6 compatible
				promiseLibrary: Promise,
			}),
			app.listen(config.PORT),
		])

		// eslint-disable-next-line no-console
		console.log(`Serving on port ${config.PORT}, on mongo ${mongoHost}`)
	} catch (err) {
		// eslint-disable-next-line no-console
		console.error('Unable to start server', err)
	}
}

// Make Node.js clustered for better multi-core performance
throng(
	{
		workers: config.WORKERS,
		lifetime: Infinity,
	},
	startServer,
)
