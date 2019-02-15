const axios = require('axios')
const getActiveEndpoint = require('./ServiceDiscovery.js')

function fetchDeckOfCards() {
	return axios.get(getActiveEndpoint())
}

module.exports = fetchDeckOfCards