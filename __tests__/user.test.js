const User = require('../src/models/User')
const Card = require('../src/models/Card')

describe('Basic User Test', () => {
	const testUser = new User('TestUser', false)
	testUser.hand = [new Card({value: "2", suit: "DIAMONDS"}), new Card({value: "2", suit: "CLUBS"})]

    test('user hand should have value 4', () => expect(testUser.handValue).toEqual(4))
    test('user hand string should be parsed correctly', () => expect(testUser.displayHand).toBe('D2,C2'))
	test('user state string should be parsed correctly', () => expect(testUser.displayUserState).toBe("TestUser\t|\t4\t|\tD2,C2"))
    test('user should keep playing', () => expect(testUser.keepPlaying).toBe(true))
})

describe('Initial Unlucky User Test', () => {
	const unluckyUser = new User('UnluckyUser', false)
	unluckyUser.hand = [new Card({value: "A", suit: "DIAMONDS"}), new Card({value: "Q", suit: "CLUBS"}), new Card({value: "Q", suit: "DIAMONDS"})]
	test('user should have lost game', () => expect(unluckyUser.lostGame).toBe(true))
})

describe('Initial BlackJack User Test', () => {
	const luckyUser = new User('LuckyUser', false)
	luckyUser.hand = [new Card({value: "A", suit: "DIAMONDS"}), new Card({value: "Q", suit: "CLUBS"})]

	test('user should have BlackJack', () => expect(luckyUser.hasBlackJack).toBe(true))
	test('user should not keep playing', () => expect(luckyUser.keepPlaying).toBe(false))
})