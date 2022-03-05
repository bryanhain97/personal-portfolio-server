const express = require('express');
const app = express();
const cool = require('cool-ascii-faces')
const cors = require('cors');
require('dotenv').config();


app.use(express.json())
app.use(cors())
const stripe = require("stripe")(process.env.STRIPE_TESTPRIVATEKEY);
const items = new Map([
    [1, { priceInCents: 250, name: 'A cup of coffee for Bryan' }]
])
const PORT = process.env.PORT || 1220

app.post('/create-checkout-session', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create(
            {
                payment_method_types: ["card"],
                line_items: req.body.items.map(({ id, quantity }) => {
                    const item = items.get(id);
                    return {
                        price_data: {
                            currency: "eur",
                            product_data: {
                                name: item.name,
                                images: ["https://upload.wikimedia.org/wikipedia/commons/0/09/1-1267462282CoNq.jpg"]
                            },
                            unit_amount: item.priceInCents,
                        },
                        quantity: quantity
                    }
                }),
                mode: "payment",
                success_url: "https://thatguybryan.com",
                cancel_url: "https://thatguybryan.com"
            })
            res.json(session.url)
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
})


app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`)
})

app.get('/', (req, res) => {
    res.send(JSON.stringify('hello from thatguybryan-server.'))
})
app.get('/cool', (req, res) => {
    res.send(cool())
})