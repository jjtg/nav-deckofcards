module.exports = class User {
	constructor(name, npc = false) {
		this.playerName = name
		this.isNpc = npc
		this.hand = []
	}

	get handValue() {
		return this.hand.reduce((acc, curr) => acc.adjustedValue + curr.adjustedValue)
	}

	get hasBlackJack() {
		return this.handValue === 21
	}

	get keepPlaying() {
		return this.handValue < 17 && this.handValue < 21
	}

	get displayHand() {
		return this.hand.map(it => it.displayString).join()
	}
}