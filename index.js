const express = require('express');
const app = express();
const cool = require('cool-ascii-faces')

app.use(express.json())
app.listen(process.env.PORT || 5000, () =>  {
    console.log(`App listening on PORT: ${PORT}`)
})

app.get('/', (req,res) => {
    res.send('hello from thatguybryan-server.')
})
app.get('/cool', (req,res) => {
    res.send(cool())
})