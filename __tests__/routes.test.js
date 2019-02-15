const request = require('supertest')
const server = require('../src/routes/routes.js')

describe('basic route tests', () => {
    test('GET /about should return description', async () => {
    	const response = await request(server).get('/about')
    	expect(response.status).toEqual(200)
    	expect(response.body.description).toContain('Kodeoppgave for NAV IKT')
    })
})
