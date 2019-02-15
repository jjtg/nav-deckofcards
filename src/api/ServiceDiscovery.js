const constants = require('../utils/constants')

// mocking 'service discovery'
const getActiveEndpoint = (fallback = false) => {
	if (fallback) return 'fallback_endpoint'
	return `${constants.rootUrl}/shuffle`
}

module.exports = getActiveEndpoint