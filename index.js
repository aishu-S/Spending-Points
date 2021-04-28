const express = require('express')
const app = express()
const routes = require('./routes');
const dataService = require('./dataService')

const PORT = 1337
dataService.initData();


app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
  })

app.use(
express.urlencoded({
    extended: true
})
)

app.use(express.json())

app.post('/transactions', routes.addTransaction)
app.post('/spendPoints', routes.spendPoints)
app.get('/balancePoints', routes.balancePoints)