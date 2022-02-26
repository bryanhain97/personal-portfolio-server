const express = require('express');
const app = express();
require('dotenv').config()

const PORT = process.env.SERVER_PORT
app.use(express.json())
app.listen(PORT, () =>  {
    console.log(`App listening on PORT: ${PORT}`)
})