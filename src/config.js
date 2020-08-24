const NODE_ENV = process.env.NODE_ENV
const PORT = process.env.PORT || 4200
const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN
const JWT_COOKIE_EXPIRES_IN = process.env.JWT_COOKIE_EXPIRES_IN
const WORKERS = process.env.WORKERS

module.exports = {
	NODE_ENV,
	PORT,
	MONGODB_URI,
	JWT_SECRET,
	JWT_EXPIRES_IN,
	JWT_COOKIE_EXPIRES_IN,
	WORKERS,
}
