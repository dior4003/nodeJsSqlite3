const express =require("express");
const exphbs=require("express-handlebars");
const serverless=require("serverless-http");
const app=express();
const bodyParser =require("body-parser") ;
require("dotenv").config();



let admin =false;

const port = 8080;
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(express.json()); 
const handlebars = exphbs.create({ extname: '.hbs',});
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');
const routes=require("./router");
app.use('/.netlify/functions/server', routes);  // path must route to lambda
app.use('/', routes);



module.exports=app;
module.exports.handler =serverless(app);
