const express = require('express');
const bodyparser= require('body-parser');

const app = express();

 //tell app we are going to be able to parse urls and json 
 app.use(bodyparser.json())
 app.use(bodyparser.urlencoded({extended: true}))


const dbConnect = require('./dbConnect.js');
const mongoose = require('mongoose');


//Set up default mongoose connection
mongoose.connect(dbConnect.database.url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("connected to mongodb");
}).catch(err=>{
    console.log("unable to connect  ",err);
    process.exit();
});

require('./app/routes/phoneStore.routes.js')(app);
 //create sigle root to resond to the page whit json  
 /*app.get('/',(req,res)=>{
     res.json({"message":"Quote buddy . Manage all your fave quotes !"});
 });*/


 //look at port 3000
 app.listen(2000,()=>{
     console.log("Server Connected");
 }); 