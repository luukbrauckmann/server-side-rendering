import express from 'express'

const app = express()
const port = 3000

const routes = [
	{ path: '/', title: 'Start', templateName: 'start' },
	{ path: '/404', title: '404', templateName: 'not-found' },
	{ path: '/toolboard', title: 'Toolboard', templateName: 'toolboard' },
	{ path: '/account', title: 'Account', templateName: 'account' }
]

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.static('static'))

app.get('/*', async (req, res) => {
	const route = routes.find(route => route.path === req.path) || routes.find(route => route.path === '/404')

	const url = 'https://api.vervoerregio-amsterdam.fdnd.nl/api/v1/principles'
	const data = await fetch(url)
		.then(response => response.json())
		.then(data => data)

	res.render('index', { route, principes: data.principes })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})