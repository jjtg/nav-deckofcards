const fetchDeckOfCards = require('../api/Api.js')

beforeAll(() => {
    console.log('testing & validating endpoint')
})

afterAll(() => {
    console.log('test & validation complete')
})

describe('api tests', () => {
    test('get deck of cards', async () => {
    	const response = await fetchDeckOfCards()
    	.then(res => {
    		expect(res.status).toBe(200)
    		expect(res.data.length).toBe(52)
    	})
    	.catch(console.error)
    })


})