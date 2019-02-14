const app = require('../src/app')
const Card = require('../src/models/Card')
const State = require('../src/models/State')

let testDeck = [
        new Card({value: "Q", suit: "DIAMONDS"}),
        new Card({value: "5", suit: "DIAMONDS"}),
        new Card({value: "Q", suit: "DIAMONDS"}),
        new Card({value: "4", suit: "DIAMONDS"}),
        new Card({value: "2", suit: "DIAMONDS"}),
        new Card({value: "4", suit: "DIAMONDS"}),
        new Card({value: "2", suit: "DIAMONDS"}),
        new Card({value: "2", suit: "DIAMONDS"}),
    ]

describe('Game Start Functionality Test', () => {
    test('start game should return valid new state', async () => {
        let testState = await app.startGame(true)
        expect(testState.users.length).toBe(2)
        expect(testState.deck.length).toBe(48)
    })
})

describe('Game Core Functionality Test', () => {
    test('user should pick one more card', () => {
        let testState = new State(testDeck)
        expect(app.advanceGame(testState).users.filter(it => !it.isNpc)[0].hand.length).toBe(3)
    })
})