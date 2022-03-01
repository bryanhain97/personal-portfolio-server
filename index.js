const express = require('express');
const app = express();
const cool = require('cool-ascii-faces')
const cors =  require('cors');
const stripe = require('stripe')('sk_test_51KWQn4BU58LFQRGJ6ChYO0mTdacnp7JtW2CUVDxt9Z4IuIDzXPHIjtVkJQw6niQZLFkbXp9lSSTm16FYeeHCpPWa00QeSNimEg')
app.use(express.json())
app.use(cors())


const PORT = process.env.PORT || 5000
const YOUR_DOMAIN = "https://www.thatguybryan.com"

app.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        line_items: [{
            price: 250,
            quantity: 1,
        }],
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}?success=true`,
        cancel_url: `${YOUR_DOMAIN}?canceled=true`
    })
    res.redirect(303, session.success_url)
})


app.listen(PORT, () =>  {
    console.log(`App listening on PORT: ${PORT}`)
})

app.get('/', (req,res) => {
    res.send(JSON.stringify('hello from thatguybryan-server.'))
})
app.get('/cool', (req,res) => {
    res.send(cool())
})