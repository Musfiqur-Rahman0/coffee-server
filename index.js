const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = 3000;
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nliquld.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// initailize the app with express
const app = express();
app.use(cors());
app.use(express.json());

// initializing mongobd client
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const run = async () => {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
};

run().catch(console.dir());

app.get("/", (req, res) => {
  res.send("Hellow world");
});

app.listen(port, () => {
  console.log("my coffee server is runing on port ", port);
});
