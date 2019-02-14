
const fetchDeckOfCards = require('./api/Api')

const State = require('./models/State')
const Card = require('./models/Card')



const startGame = async (testEnv = false) => {
    let deck = []
    await fetchDeckOfCards()
        .then(res => deck = res.data.map(it => new Card(it)))
        .catch(console.error)
    const state = new State(deck)
    if (testEnv) return state
    else {
        while(!state.finished){
            advanceGame(state)
        }
    }
}

const advanceGame = (state) => {
    const user = state.users.filter(it => !it.isNpc)[0]
    const npc = state.users.filter(it => it.isNpc)[0]

    if (user.keepPlaying) {
        user.hand.push(state.deck.pop())
    } else {
        if (user.lostGame) {
            state.winner = npc
            state.finished = true
            state.displayFinishedGameState()
        } else {
            while(npc.handValue < user.handValue) {
                npc.hand.push(state.deck.pop())
            }
            const { winners, tie, _ } = state.calculateFinalScore()
            // TODO - fix this
            state.winner = tie ? { playerName: 'Uavgjort' } : winners[0]
            state.finished = true
            state.displayFinishedGameState()
        }
    }
    return state
}


startGame()

module.exports = {
    startGame: startGame,
    advanceGame: advanceGame
}

