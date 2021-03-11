const bodyParser = require('body-parser');
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();

// Database Connection
const connectionString  = 'mongodb+srv://AbnitChauhan:ahngeaSp743qsyM2@abnit.x8lyh.mongodb.net/Abnit?retryWrites=true&w=majority';


//MongoClient Connection
MongoClient.connect(connectionString, {
    useUnifiedTopology: true
  }, (err, client) => {
    if (err) return console.error(err)
    console.log('Connected to Database')
  })

  
// MiddleWare 
app.use(bodyParser.urlencoded({extended:true}));


app.get ('/',  (req, res) =>{
    res.sendFile(__dirname +'/index.html');
});

app.post('/quotes', (req,res) => { 
     
    console.log(req.body);  
})



// __dirname is the current directory you are in 
app.listen(3000, ()=>{console.log('Server Running on localhost:3000')});

// console.log('May Node be With You ! ');