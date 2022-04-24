const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

require("dotenv").config();

//middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.EMA_USER}:${process.env.EMA_PASS}@cluster0.zqp7w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const products = client.db("emaJohn").collection("products");

    //loaded all the datas to show
    app.get("/products", async (req, res) => {
      const page = parseInt(req.query.page);
      const size = parseInt(req.query.size);
      console.log(page, size);
      const query = {};
      const cursor = products.find(query);
      const result = await cursor.toArray();

      res.send(result);
    });

    //loading data for pagination

    app.get("/productPerPage", async (req, res) => {
      const pages = await products.estimatedDocumentCount();

      res.send({ pages });
    });
  } finally {
    console.log("Connected to MongoDB");
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("The server is running");
});

//listening to port
app.listen(port, () => console.log("The port is running in", port));
