const User = require('../models/User')
const Card = require('../models/Card')

beforeAll(() => {
    console.log('testing user class')

})

afterAll(() => {
    console.log('user class test complete')
})

describe('Basic User Test', () => {
	const testUser = new User('TestUser', false)
	testUser.hand = [new Card({value: "2", suit: "DIAMONDS"}), new Card({value: "2", suit: "CLUBS"})]

    test('user hand should have value 4', () => expect(testUser.handValue).toEqual(4))
    test('user hand string should be parsed correctly', () => expect(testUser.displayHand).toContain('D2,C2'))
    test('user should keep playing', () => expect(testUser.keepPlaying).toBe(true))
})

describe('Initial BlackJack User Test', () => {
	const luckyUser = new User('LuckyUser', false)
	luckyUser.hand = [new Card({value: "A", suit: "DIAMONDS"}), new Card({value: "Q", suit: "CLUBS"})]

	test('user should have BlackJack', () => expect(luckyUser.hasBlackJack).toBe(true))
	test('user shoudl not keep playing', () => expect(luckyUser.keepPlaying).toBe(false))
})