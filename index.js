const express = require('express');
const app = express();
const books = require('google-books-search');
const cool = require('cool-ascii-faces')
const cors = require('cors');
const stripe = require("stripe")(process.env.STRIPE_TESTPRIVATEKEY);
const { MongoClient, ServerApiVersion } = require('mongodb')
require('dotenv').config();
const googleBooksOptions = require('./googleBooksOptions')
const client = new MongoClient(process.env.MONGODB_ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })
const items = new Map([
    [1, { priceInCents: 250, name: 'A cup of coffee for Bryan' }]
])

app.use(express.json())
app.use(cors())
const PORT = process.env.PORT || 1220

app.post('/get-books', async (req, res) => {
    const { searchBy } = req.body;
    console.log(searchBy)
    books.search(searchBy, googleBooksOptions('title'), (error, results, apiResponse) => {
        if (!error) {
            res.json(results)
        } else {
            console.log(error);
        }
    });
})
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