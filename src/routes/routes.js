const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')

const api = new Koa()
const router = new Router()

const app = require('../app')
const constants = require('../utils/constants')

const State = require('../models/State')
const User = require('../models/User')
const Card = require('../models/Card')

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
router.get('/blackjack', async (ctx) => {
    try {
        const gameState = await app.startGame(true)
        ctx.body = {
            successful: true,
            gameState: gameState
        }
    } catch (err) {
       console.error(err)
    }
})

/**
 * Advances the game and finalizes if necessary.
 */
router.post('/blackjack', async (ctx) => {
    try {
        convertBodyToDto(ctx.request.body.gameState)
            .then(state => {
                ctx.body = {
                    successful: true,
                    gameState: app.advanceGame(state)
                }
            })
            .catch(err => {
                console.log(err)
                ctx.body = {
                    successful: false,
                    message: err
                }
            })
    } catch (err) {
        console.error(err)
    }
})

async function convertBodyToDto(state) {
    state.users = state.users.map(user => {
        user.hand = user.hand.map(card => new Card(card))
        return new User(null,null,user)
    })
    state.deck = state.deck.map(card => new Card(card))
    return new State(null, null, null, state)
}


api.use(bodyParser())
api.use(router.routes())
api.use(router.allowedMethods())

const server = api.listen(constants.apiPort)
module.exports = server

