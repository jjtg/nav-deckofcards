const State = require('../src/models/State')
const Card = require('../src/models/Card')

// Deck that starts with winner
const testDeck = [
    new Card({value: "J", suit: "DIAMONDS"}),
    new Card({value: "Q", suit: "DIAMONDS"}),
    new Card({value: "K", suit: "DIAMONDS"}),
    new Card({value: "A", suit: "DIAMONDS"})
]


describe('State Class Test', () => {
	const state = new State(testDeck, 'TestPlayer', true)
    test('player should win', () => expect(state.winner.playerName).toContain('TestPlayer'))
    test('game state should be finished', () => expect(state.finished).toBe(true))
})