const Koa = require('koa')
const Cors = require('@koa/cors')
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
        setUserPayload(gameState)
        ctx.body = {
            successful: true,
            gameState: gameState
        }
    } catch (err) {
        console.error(err)
        ctx.status = 500
        ctx.body = {
            successful: false,
            message: err.message
        }
    }
})

/**
 * Advances the game and finalizes if necessary.
 */
router.post('/blackjack', async (ctx) => {
    try {
        convertBodyToDto(ctx.request.body.gameState)
            .then(state => {
                const advancedState = app.advanceGame(state)
                setUserPayload(advancedState)
                ctx.body = {
                    successful: true,
                    gameState: advancedState
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
        ctx.status = 500
        ctx.body = {
            successful: false,
            message: err.message
        }
    }
})

async function convertBodyToDto(state) {
    state.users = state.users.map(user => {
        user.hand = user.hand.map(card => new Card(card))
        return new User(null, null, user)
    })
    state.deck = state.deck.map(card => new Card(card))
    return new State(null, null, true, state)
}

function setUserPayload(state) {
    state.users.forEach(user => user.payload())
}

api.use(bodyParser())
api.use(Cors())
api.use(router.routes())
api.use(router.allowedMethods())

const server = api.listen(constants.apiPort)
module.exports = server

