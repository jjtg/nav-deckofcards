const Card = require('./Card')

module.exports = class User {
	constructor(name, npc = false, entity) {
		if (!entity){
			this.playerName = name
			this.isNpc = npc
			this.hand = []
		} else {
			this.playerName = entity.playerName
			this.isNpc = entity.isNpc
			this.hand = entity.hand || []
		}
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
		return `${this.playerName}\t|\t${this.handValue}\t|\t${this.displayHand}`
	}

	payload() {
		const payload = this
		payload.score =  this.handValue
		payload.handDisplay = this.displayHand
	}
}