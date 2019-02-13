module.exports =  class Card {
	constructor(entity) {
		if (!entity) {
			this.suit = 'CLUBS'
			this.value = 2
		} else {
			this.suit = entity.suit
			this.value = entity.value
		}
	}

	get adjustedValue() {
		const value = Number(this.value)
		if (!isNaN(value)) {
			return value
		} else {
			if (this.value === "A"){
				return 11
			} else {
				return 10
			}
		}
	}

	get displayString() {
		return `${this.suit.charAt(0)}${this.adjustedValue}`
	}
}