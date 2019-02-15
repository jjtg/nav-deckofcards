const Koa = require("koa")
const Router = require("koa-router")
const app = new Koa()
const router = new Router()

const Card = require('../models/Card')
const State = require('../models/State')

const fetchDeckOfCards = require('../api/Api')
const constants = require('../utils/constants')

/**
 * Just a gimmick
 */
router.get('/about', (ctx, next) => {
    ctx.body = {
        description: 'Kodeoppgave for NAV IKT',
        author: 'Julian Torp'
    }
})

/**
 * Always returns a new blackjack game state.
 */
router.get('/blackjack', async (ctx, next) => {
    let deck = []
    await fetchDeckOfCards()
        .then(res => deck = res.data.map(it => new Card(it)))
        .catch(console.error)
    const gameState = new State(deck)
    ctx.body = {
        successful: true,
        state: gameState
    }
})

/**
 * Advances the game and finalizes if necessary.
 */
router.post('/blackjack', async (ctx, next) => {
    ctx.body = {
        successful: true,
        state: 'none'
    }
})

app.use(router.routes())
app.use(router.allowedMethods())

const server = app.listen(constants.apiPort)
module.exports = server

