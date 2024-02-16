/* eslint-disable no-undef */
require('dotenv').config();
var Express = require("express");
// var MongoClient = require("mongodb").MongoClient;
const { MongoClient } = require('mongodb');
var cors = require("cors");
const multer = require('multer');
// const multer = require("multer")
var app = Express();
app.use(cors())



const CONNECTION_STRING = process.env.MONGO_ATLAS_URL;
const DATABASE_NAME = "wonjobDB";
const COLLECTION_NAME = "wonjobCollection";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(CONNECTION_STRING, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     }
// });
let database;
app.listen(5038, () => {
    MongoClient.connect(CONNECTION_STRING, (error, client) => {
        if (error) {
            console.error('Error connecting to database:', error);
        } else {
            database = client.db(DATABASE_NAME);
            console.log('DB Success');

            app.get('/api/get', (req, res) => {
                database.collection(COLLECTION_NAME).find({}).toArray((error, result) => {
                    if (error) {
                        console.error('Error:', error);
                        res.status(500).send('Internal Server Error');
                    }
                    res.status(200).send(result)
                })

            })

            // async function run() {
            //     try {
            //         // Connect the client to the server	(optional starting in v4.7)
            //         await client.connect();
            //         // Send a ping to confirm a successful connection
            //         await client.db("admin").command({ ping: 1 });
            //         console.log("Pinged your deployment. You successfully connected to MongoDB!");
            //     } finally {
            //         // Ensures that the client will close when you finish/error
            //         await client.close();
            //     }
            // }
            // run().catch(console.dir);
        }
    })
})

app.post('/api/addJobList', multer().none(), (req, res) => {
    database.collection(COLLECTION_NAME).count({}, function (numOfDocs) {
        const newData = {
            id: String(numOfDocs + 1),
            title: String(req.query.title) ?? ""
        }
        database.collection(COLLECTION_NAME).insertOne(newData);
        res.send(200).json({ success: 'Added Sucessfully .', data: newData })

    })

})
app.delete('/api/delete/:id', async (req, res) => {
    console.log(req)
    // const id = req.query.id;
    const query = { _id: ObjectId(req.params.id) };
    // const id = (req.params.id)
    // database.collection(COLLECTION_NAME).deleteOne(query)
    const collection = db.collection(COLLECTION_NAME);
    let result = await collection.deleteOne(query);
    res.send("Deleted Successfully : " + result)
})