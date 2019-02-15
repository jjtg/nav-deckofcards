const Koa = require("koa")
const Router = require("koa-router")
const app = new Koa()
const router = new Router()

const Card = require('../models/Card')
const State = require('../models/State')

const fetchDeckOfCards = require('../api/Api')

router.get('/about', (ctx, next) => {
    ctx.body = {
        description: 'Kodeoppgave for NAV IKT',
        author: 'Julian Torp'
    }
})

router.get('/', async (ctx, next) => {
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

app.use(router.routes())
app.use(router.allowedMethods())

const server = app.listen(8080)

module.exports = server

