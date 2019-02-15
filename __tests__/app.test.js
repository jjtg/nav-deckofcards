const app = require('../src/app')
const Card = require('../src/models/Card')
const State = require('../src/models/State')

// TODO - make more readale
const testDeck = [
    new Card({value: "2", suit: "DIAMONDS"}),
    new Card({value: "4", suit: "DIAMONDS"}),
    new Card({value: "2", suit: "DIAMONDS"}),
    new Card({value: "2", suit: "DIAMONDS"}),
    new Card({value: "4", suit: "DIAMONDS"}),
    new Card({value: "J", suit: "DIAMONDS"}),
    new Card({value: "5", suit: "DIAMONDS"}),
    new Card({value: "Q", suit: "DIAMONDS"})
]

const blackJackDeck = [
    new Card({value: "A", suit: "DIAMONDS"}),
    new Card({value: "J", suit: "DIAMONDS"}),
    new Card({value: "A", suit: "DIAMONDS"}),
    new Card({value: "Q", suit: "DIAMONDS"})

]

const loseDeck = [
    new Card({value: "A", suit: "DIAMONDS"}),
    new Card({value: "A", suit: "DIAMONDS"}),
    new Card({value: "J", suit: "DIAMONDS"}),
    new Card({value: "5", suit: "DIAMONDS"}),
    new Card({value: "Q", suit: "DIAMONDS"})
]

const npcLoseDeck = [
    new Card({value: "7", suit: "DIAMONDS"}),
    new Card({value: "2", suit: "DIAMONDS"}),
    new Card({value: "5", suit: "DIAMONDS"}),
    new Card({value: "J", suit: "DIAMONDS"}),
    new Card({value: "5", suit: "DIAMONDS"}),
    new Card({value: "Q", suit: "DIAMONDS"})
]


describe('Game Start Functionality Test', () => {
    test('start game should return valid new state', async () => {
        expect.assertions(2)
        const startTestState = await app.startGame(true)
        expect(startTestState.users.length).toBe(2)
        expect(startTestState.deck.length).toBe(48)
    })
})

describe('Game Finished on Initialization', () => {
    test('game should not advance any further', async () => {
        expect.assertions(3)
        const blackJackState = new State(blackJackDeck, 'TestPlayer', true)
        const finishedTestState = await app.startGame(true, blackJackState)
        expect(blackJackDeck.length).toBe(0)
        expect(finishedTestState.finished).toBe(true)
        expect(finishedTestState.winner.playerName).toBe('Uavgjort')
    })
})

/**
 * User has to pick cards until result is over 17
 * Since he starts at 15 that means one more.
 * NPC has to pick cards until result is over user
 * in this test case it equates to 2 putting him at
 * 20 points and winning him the game.
 */
describe('Game Core Functionality Test', () => {
    const coreTestState = new State(testDeck, 'TestPlayer', true)
    test('user should pick one more card then npc should play and win', () => {
        const {user, npc, advancedState} = advanceStateAndFetchUserAndNpc(coreTestState)
        expect(user.hand.length).toBe(3)
        expect(user.keepPlaying).toBe(false)

        const finishedState = app.advanceGame(advancedState)
        expect(npc.hand.length).toBe(4)
        expect(finishedState.finished).toBe(true)
        expect(finishedState.winner.playerName).toBe(npc.playerName)
    })
})

describe('User Loosing On First Round Test', () => {
    const userLooseState = new State(loseDeck, 'TestPlayer', true)
    test('user should pick one card and loose the game', () => {
        const {user, npc, advancedState} = advanceStateAndFetchUserAndNpc(userLooseState)
        expect(user.hand.length).toBe(3)
        expect(user.lostGame).toBe(true)
        expect(advancedState.finished).toBe(true)
        expect(advancedState.winner.playerName).toBe(npc.playerName)
    })
})

describe('NPC Loosing due to overshooting 21', () => {
    const npcLoosesState = new State(npcLoseDeck, 'TestPlayer', true)
    test('user should pick one card then npc should pick one card and lose the game', async () =>{
        const initialState = app.advanceGame(npcLoosesState)
        const {user, npc, advancedState} = await advanceStateAndFetchUserAndNpc(initialState)
        expect(user.hand.length).toBe(3)
        expect(npc.hand.length).toBe(3)
        expect(advancedState.finished).toBe(true)
        expect(advancedState.winner.playerName).toBe(user.playerName)
    })
})

function advanceStateAndFetchUserAndNpc(state) {
    const advancedState = app.advanceGame(state)
    const {user, npc} = advancedState.fetchUserAndNpc()
    return {user, npc, advancedState}
}