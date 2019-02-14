
const getActiveEndpoint = (fallback = false) => {
	if (fallback) return 'fallback_endpoint'
	return 'http://nav-deckofcards.herokuapp.com/shuffle'
}

module.exports = getActiveEndpoint 