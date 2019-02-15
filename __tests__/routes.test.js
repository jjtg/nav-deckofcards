const request = require('supertest')
const server = require('../src/routes/routes')
const mockRequest = require('../resources/mockRequest')

afterAll(() => {
    server.close()
})

describe('basic route tests', () => {
    test('GET /about should return description', async () => {
        expect.assertions(2)
        const response = await request(server).get('/about')
        expect(response.status).toEqual(200)
        expect(response.body.description).toContain('Kodeoppgave for NAV IKT')
    })
    test('GET /blackjack should return a new game state', async () => {
        expect.assertions(3)
        const response = await request(server).get('/blackjack')
        expect(response.status).toEqual(200)
        expect(response.body.gameState.deck.length).toBe(48)
        expect(response.body.gameState.users.length).toBe(2)
    })
    test('POST /blackjack should return an advanced state', async () => {
        const postResponse = await request(server).post('/blackjack').send(mockRequest)
        expect(postResponse.status).toEqual(200)
        expect(postResponse.body.gameState.deck.length).toBe(47)
        expect(postResponse.body.gameState.finished).toBe(true)
    })
})
