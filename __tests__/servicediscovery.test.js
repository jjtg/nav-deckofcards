const getActiveEndpoint = require('../src/api/ServiceDiscovery.js')

describe('service discovery mock', () => {
    test('service returns actual endpoint', async () => {
    	const endpoint = getActiveEndpoint()
        expect(endpoint).toContain('http://nav-deckofcards.herokuapp.com/shuffle')
    })
    test('service return fallback endpoint', async() => {
        const endpoint = getActiveEndpoint(true)
        expect(endpoint).toContain('fallback_endpoint')
    })
})