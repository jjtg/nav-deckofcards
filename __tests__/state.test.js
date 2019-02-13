const State = require('../models/State')
const Card = require('../models/Card')

beforeAll(() => {
    console.log('testing game state class')

})

afterAll(() => {
    console.log('game state class test complete')
})

// Deck that starts with winner
const testDeck = [
new Card({value: "A", suit: "DIAMONDS"}), 
new Card({value: "K", suit: "DIAMONDS"}),
new Card({value: "Q", suit: "DIAMONDS"}),
new Card({value: "J", suit: "DIAMONDS"})
]


// TODO - maps are inverting order, look into it. 
// Probably a pop() shifting the array order.
describe('Basic User Test', async () => {
	const state = new State(testDeck)
    test('player should win', () => expect(state.winner.playerName).toContain('Player1'))
    test('game state should be finished', () => expect(state.finished).toBe(true))
})