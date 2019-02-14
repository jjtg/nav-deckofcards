module.exports = class User {
	constructor(name, npc = false) {
		this.playerName = name
		this.isNpc = npc
		this.hand = []
	}

	get handValue() {
		return this.hand.map(it => it.adjustedValue).reduce((acc, curr) => acc + curr)
	}

	get hasBlackJack() {
		return (this.handValue === 21)
	}

	get keepPlaying() {
		return (this.handValue < 17 && this.handValue < 21)
	}

	get lostGame() {
		return (this.handValue > 21)
	}

	get displayHand() {
		return this.hand.map(it => it.displayString).join()
	}

	get displayUserState() {
		return `${this.playerName}\t| ${this.handValue}\t| ${this.displayHand}`
	}
}