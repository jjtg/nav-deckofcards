const State = require('../src/models/State')
const Card = require('../src/models/Card')

// Deck that starts with winner
const testDeck = [
new Card({value: "A", suit: "DIAMONDS"}), 
new Card({value: "K", suit: "DIAMONDS"}),
new Card({value: "Q", suit: "DIAMONDS"}),
new Card({value: "J", suit: "DIAMONDS"})
]


// TODO - maps are inverting order, look into it. 
describe('State Class Test', async () => {
	const state = new State(testDeck, 'Player1', true)
    test('player should win', () => expect(state.winner.playerName).toContain('Player1'))
    test('game state should be finished', () => expect(state.finished).toBe(true))
})