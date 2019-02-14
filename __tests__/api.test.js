const fetchDeckOfCards = require('../src/api/Api.js')

describe('Api Connectivity Test & Validation', () => {
    test('get deck of cards', async () => {
    	await fetchDeckOfCards()
    	.then(res => {
    		expect(res.status).toBe(200)
    		expect(res.data.length).toBe(52)
    	})
    	.catch(console.error)
    })


})