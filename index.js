const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = 3000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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
    // await client.connect();

    const coffeeCollection = client.db("coffeDb").collection("coffes");
    app.get("/coffes", async (req, res) => {
      const cursor = coffeeCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.post("/coffes", async (req, res) => {
      const newCoffe = req.body;
      console.log(newCoffe);
      const result = await coffeeCollection.insertOne(newCoffe);

      res.send(result);
    });

    app.get("/coffee/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await coffeeCollection.findOne(query);
      res.send(result);
    });

    app.delete("/coffee/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await coffeeCollection.deleteOne(query);
      res.send(result);
    });

    app.put("/coffee/:id", async (req, res) => {
      const id = req.params.id;
      const updatedCoffee = req.body;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: updatedCoffee,
      };
      const options = { upsert: true };
      const result = await coffeeCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.send(result);
    });

    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
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
