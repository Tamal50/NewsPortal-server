const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId




const app = express()

app.use(bodyParser.json());
app.use(cors());
const port = 5000

app.get('/', (req, res) => {
  res.send("Database Working")
})

const uri = "mongodb+srv://Tamal:Tamal@cluster0.ox36p.mongodb.net/NewsProtal?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
    const news = client.db("NewsProtal").collection("News");
    const admin = client.db("NewsProtal").collection("admin");



    app.post('/addNews', (req, res) => {
        const product = req.body;
      news.insertOne(product)
      .then(result =>{
        console.log(result.acknowledged)
          res.json(result.acknowledged)
      })
    })

    app.get('/News', (req, res) => {
        news.find({})
        .toArray((err, documents) => {
          res.send(documents)
        })
      })

      app.post('/addAdmin', (req, res) => {
        const email = req.body;
        admin.insertOne(email)
      .then(result =>{
        console.log(result.acknowledged)
          res.json(result.acknowledged)
      })
    })

    app.get('/admin', (req, res) => {
        admin.find({})
        .toArray((err, documents) => {
          res.send(documents)
        })
      })


      app.get('/news/:id', (req, res) => {
        news.find({_id:ObjectId(req.params.id)})
        .toArray((err, documents)=>{
          res.send(documents[0])
        })
      })

      app.get('/news/catagory/:data', (req, res) => {
        var query = { catagory: req.params.data };
        news.find(query)
        .toArray((err, documents)=>{
          res.send(documents)
        })
      })

      app.delete('/delete/:id', (req, res) => {
        news.deleteOne({_id:ObjectId(req.params.id)})
        .then( result =>{
          console.log(result)
        })
    })
    
   
 
    console.log("Database")

});



app.listen(process.env.PORT || port, () => { })