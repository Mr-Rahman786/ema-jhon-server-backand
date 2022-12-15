const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// middleWare
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.k05o9k1.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// start midlavel was connecet mongoDB
async function run() {
    try {
        const prodductCollection = client.db('ema-jhon').collection('products')

        // 1 : work to do hit API
        app.get('/products', async (req, res) => {
            const query = {}
            const cursor = prodductCollection.find(query);
            const products = await cursor.toArray();
            res.send(products)
        })
    }
    finally {
        
    }
}
run().catch(err => console.error(err));



app.get('/', (req, res) => {
    res.send('Ema jhon server was running')
})

app.listen(port, () => {
    console.log(`server running on ${port}`)
})