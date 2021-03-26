var express=require('express');
var app=express();

var beer_controller = require('./app/controleur/beer_controleur.js');
var brewery_controller = require('./app/controleur/brewerie_controleur.js');
var db_init = require('./app/model/db_init.js');
const beers = require('./open-beer-database.json');

app.use(express.json())
app.set('json spaces', 40);


app.get('/',function(req,res){

    res.send('Hello World!');

});

app.get('/api/beers/',function(req,res){

    beer_controller.getAll(req,res);

});

app.get('/api/beers/:id',function(req,res){

    beer_controller.getBeerById(req,res);

});

app.get('/api/breweries/',function(req,res){

    brewery_controller.getAll(req,res);

});

var server=app.listen(3000,function() {});