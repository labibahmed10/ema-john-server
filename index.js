const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 8000;

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
  try{

  }
  finally{
    
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("The server is running");
});

//listening to port
app.listen(port, () => console.log("The port is running in", port));

//
//
