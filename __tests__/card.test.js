const Card = require('../src/models/Card')

describe('Card Class Test', () => {
    const ACE = new Card({value: "A", suit: "DIAMONDS"})
    const QUEEN = new Card({value: "Q", suit: "CLUBS"})
    const EIGHT = new Card({value: "8", suit: "HEARTS"})
    const THREE = new Card({value: "3", suit: "SPADES"})

    test('ace should equal 11', () => expect(ACE.adjustedValue).toBe(11))
    test('queen should equal 10', () => expect(QUEEN.adjustedValue).toBe(10))
    test('eight should equal 8', () => expect(EIGHT.adjustedValue).toBe(8))
    test('three should equal 3', () => expect(THREE.adjustedValue).toBe(3))

    test('ace should display D11', () => expect(ACE.displayString).toBe('D11'))
    test('queen should display C10', () => expect(QUEEN.displayString).toBe('C10'))
    test('eight should display H8', () => expect(EIGHT.displayString).toBe('H8'))
    test('three should display S3', () => expect(THREE.displayString).toBe('S3'))
})
