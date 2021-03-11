 
const express = require('express');
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const app = express();

// Database Connection
    const connectionString  = 'mongodb+srv://AbnitChauhan:ahngeaSp743qsyM2@abnit.x8lyh.mongodb.net/Abnit?retryWrites=true&w=majority';


//MongoClient Connection
    MongoClient.connect(connectionString, {useUnifiedTopology: true}).
    then(client => {
        const db= client.db('Abnit');
        const quotesCollection = db.collection('quotes'); 

// Set Embeded Javascript
    app.set('view engine', 'ejs');

  // MiddleWare ======================================== 
    app.use(express.urlencoded({extended:true}));  
    app.use(express.static('public'));
    app.use(express.json());
// ===================================================

    app.get ('/',  (req, res) =>{ 
      const cursor = db.collection('quotes'). find().toArray()
      .then(results =>{
        res.render('index.ejs', {quotes : results});
      });
      
    });
  
    app.post('/quotes', (req,res) => { 
      quotesCollection.insertOne(req.body)
        .then(result => { 
          res.redirect('/')
        })  
        .catch(error =>console.error(error))
      });

  // UPDATE
      app.put('/quotes', (req,res) =>{
       quotesCollection.findOneAndUpdate(
         {name: 'shivam'},
         {
           $set:{
             name: req.body.name,
             quote: req.body.quote
           }
         },
         {
           upsert: true
         }
       )
       .then(result => {res.json('Success')})
       .catch(error => console.error(error))
      })

// DELETE
      app.delete('/quotes', (req, res) => {
        quotesCollection.deleteOne(
          { name: req.body.name }
        )
          .then(result => {
            if (result.deletedCount === 0) 
            {
              return res.json('No quote to delete')
            } 
            res.json(`Deleted Darth Vadar's quote`)
          })
          .catch(error => console.error(error))
      })
      
    });

    
 
// __dirname is the current directory you are in 
    app.listen(3000, ()=>{console.log('Server Running on localhost:3000')});

// console.log('May Node be With You ! ');