const fetchDeckOfCards = require('./api/Api')

const State = require('./models/State')
const Card = require('./models/Card')


/**
 * Takes test state as parameter.
 * Fetches new deck of card and creates state or uses testState.
 * Returns test state if testEnv is true.
 * advances game until the game finishes.
 * @param returnState
 * @param initState
 */
const startGame = async (returnState = false, initState) => {
    let deck = []
    await fetchDeckOfCards()
        .then(res => deck = res.data.map(it => new Card(it)))
        .catch(console.error)

    // initState for testing purposes
    const state = initState || new State(deck)
    if (!returnState) {
        while (!state.finished) {
            advanceGame(state)
        }
    } else return state
}

/**
 * Takes a state, checks if the user can play and prioritizes a play.
 * when the user can't play anymore it checks if the user lost.
 * If the user hasn't lost, the NPC plays until he has more points.
 * The final score of the state is then calculated and end game is processed.
 * @param state
 * @returns {*}
 */
const advanceGame = (state) => {
    const {user, npc} = state.fetchUserAndNpc()

    if (user.keepPlaying) {
        user.hand.push(state.deck.pop())
    } else {
        if (user.lostGame) {
            processEndGame(npc, state)
        } else {
            while (npc.handValue < user.handValue) {
                npc.hand.push(state.deck.pop())
            }
            const {winners, tie, _} = state.calculateFinalScore()
            winner = tie ? {playerName: 'Uavgjort'} : winners[0]
            processEndGame(winner, state)
        }
    }
    return state
}

/**
 * Takes a state and a winner, sets the winner,
 * finishes the game and displays results in console.
 * @param winner
 * @param state
 */
const processEndGame = (winner, state) => {
    state.winner = winner
    state.finished = true
    state.displayFinishedGameState()
}

module.exports = {
    startGame: startGame,
    advanceGame: advanceGame
}

