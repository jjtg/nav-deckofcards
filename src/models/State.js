const User = require('./User')

module.exports = class State {
    constructor(deck, player = 'Player1', supressConsoleLogs = false) {
        this.users = [new User('Magnus', true), new User(player)]
        this.deck = deck
        this.winner = null
        this.finished = false
        this.supressConsoleLogs = supressConsoleLogs
        this.initialize()
    }

    initialize() {
        this.users.map(user => user.hand = this.dealFirstHand())
        const winners = this.users.filter(it => it.hasBlackJack)
        if (winners.length > 0) {
            this.winner = winners[0]
            this.finished = true
            this.displayFinishedGameState()
        }
    }

    calculateFinalScore() {
        const winners = []
        const losers = []

        // sort by hand score descending, push highest
        // score user to winners if can't play anymore
        this.users
            .sort((a, b) => b.handValue - a.handValue)
            .map(user => {
                if (user.hasBlackJack) winners.push(user)
                else if (user.lostGame) losers.push(user)
                else if (!user.keepPlaying && winners.length === 0) winners.push(user)
                else losers.push(user)
            })
        const tie = (winners[0].handValue === losers[0].handValue)
        return {winners, tie, losers}
    }

    displayFinishedGameState() {
        if (this.supressConsoleLogs) return
        console.log(`Vinner: ${this.winner.playerName}`)
        this.users.map(it => console.log(it.displayUserState))
    }

    dealFirstHand(inverted = false) {
        if (inverted) return [this.deck.shift(), this.deck.shift()]
        return [this.deck.pop(), this.deck.pop()]
    }
}