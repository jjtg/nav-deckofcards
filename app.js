const Koa = require('koa')
const Router = require('koa-router')
const fetchDeckOfCards = require('./api/Api.js')

const State = require('./models/State.js')
const Card = require('./models/Card.js')

const app = new Koa()
const router = new Router()


router.get('/about', (ctx, next) => {
    ctx.body = {
    	description: 'Kodeoppgave for NAV IKT',
    	author: 'Julian Torp'
    }
})

router.get('/', async (ctx, next) => {
	let deck
	await fetchDeckOfCards()
		.then(res => deck = res.data.map(it => new Card(it)))
		.catch(console.error)
	const gameState = new State(deck)
	ctx.body = {
		successful: true,
		state: gameState
	}
})

async function startGame() {
	let deck
	await fetchDeckOfCards()
		.then(res => deck = res.data.map(it => new Card(it)))
		.catch(console.error)
	const state = new State(deck)
}

startGame()

app.use(router.routes())
app.use(router.allowedMethods())
const server = app.listen(3000)

module.exports = server