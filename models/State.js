const Card = require('./Card.js')
const User = require('./User.js')

const fetchDeckOfCards = require('../api/Api.js')

module.exports = class State {
	constructor(deck, player='Player1') {
		this.users = [new User('Magnus', true), new User(player)]
		this.deck = deck
		this.winner = null
		this.finished = false
		this.initialize()
	}

	initialize() {
		this.users.map(user => user.hand = this.dealFirstHand())
		const winners  = this.users.filter(it => it.hasBlackJack)
		if (winners.length > 0) {
			this.winner = winners[0]
			this.finished = true
			
			// Can possibly be neater
			console.log(`Vinner: ${this.winner.playerName}`)
			this.users.map(it => console.log(it.displayUserState))
		}
	}

	dealFirstHand(inverted = false) {
		if (inverted) return [this.deck.shift(), this.deck.shift()]
		return [this.deck.pop(), this.deck.pop()]
	}
}