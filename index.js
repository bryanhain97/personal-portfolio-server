const express = require('express');
const app = express();
const cool = require('cool-ascii-faces')

const PORT = process.env.SERVER_PORT || 5000
app.use(express.json())
app.listen(PORT, () =>  {
    console.log(`App listening on PORT: ${PORT}`)
})

app.get('/', (req,res) => {
    res.send('hello from thatguybryan-server.')
})
app.get('/cool', (req,res) => {
    res.send(cool())
})