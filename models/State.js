const Card = require('./Card.js')
const User = require('./User.js')

const fetchDeckOfCards = require('../api/Api.js')

module.exports = class State {
	constructor(deck, player='Player1') {
		this.users = [new User(player), new User('Magnus', true)]
		this.winner = null
		this.deck = deck
		this.initialize()
	}

	initialize() {
		this.users.map(user => {
			user.hand = this.dealFirstHand()
			if (user.hasBlackJack) {
				this.winner = user
				return
			}
		})
	}

	dealFirstHand(inverted = false) {
		if (inverted) return [this.deck.shift(), this.deck.shift()]
		return [this.deck.pop(), this.deck.pop()]
	}
}