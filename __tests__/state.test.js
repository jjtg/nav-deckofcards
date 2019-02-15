const State = require('../src/models/State')
const Card = require('../src/models/Card')

// Deck that starts with winner
const winningDeck = [
    new Card({value: "J", suit: "DIAMONDS"}),
    new Card({value: "Q", suit: "DIAMONDS"}),
    new Card({value: "K", suit: "DIAMONDS"}),
    new Card({value: "A", suit: "DIAMONDS"})
]

const losingDeck = [
    new Card({value: "J", suit: "DIAMONDS"}),
    new Card({value: "Q", suit: "DIAMONDS"}),
    new Card({value: "A", suit: "DIAMONDS"}),
    new Card({value: "A", suit: "DIAMONDS"})
]


describe('State Class Test', () => {
	const state = new State(winningDeck, 'TestPlayer', true)
    const loseState = new State(losingDeck, 'TestPlayer', true)
    test('user should win', () => expect(state.winner.playerName).toBe('TestPlayer'))
    test('game winning state should be finished', () => expect(state.finished).toBe(true))
    test('user should loose', () => expect(loseState.winner.playerName).not.toBe('TestPlayer'))
    test('game loosing state should be finished', () => expect(loseState.finished).toBe(true))
})