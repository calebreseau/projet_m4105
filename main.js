var express=require('express');
var app=express();

var beer_controller = require('./app/controller/beer_controller.js');
var brewery_controller = require('./app/controller/brewery_controller.js');
var db_init = require('./app/model/db_init.js');
var test = require('./test.js');

app.use(express.json())
app.set('json spaces', 40); //pour rendre la sortie visible durant la conception



app.get('/',function(req,res){

    res.send('Hello World!');

});

// Beers API routes

app.get('/api/beers/populate',function(req,res){

    beer_controller.populateBeers(req,res);

});

app.get('/api/beers/',function(req,res){

    beer_controller.getAll(req,res);

});

app.get('/api/beers/id/:id',function(req,res){

    beer_controller.getBeerById(req,res);

});

app.get('/api/beers/name/:name',function(req,res){

    beer_controller.getBeerByName(req,res);

});

app.get('/api/beers/category/:category',function(req,res){

    beer_controller.getBeerByCategory(req,res);

});

app.get('/api/beers/city/:city',function(req,res){

    beer_controller.getByCity(req,res);

});

app.get('/api/beers/country/:country',function(req,res){

    beer_controller.getByCountry(req,res);

});

// Breweries api routes

app.get('/api/breweries/populate',function(req,res){

    brewery_controller.populateBreweries(req,res);

});


app.get('/api/breweries/',function(req,res){

    brewery_controller.getAll(req,res);

});

app.get('/api/test/',function(req,res){

    test.test(req,res);

});
app.use(function (req, res, next) {
    res.status(404).send("[{'error': '404: page inconnue'}]")
  });


var server=app.listen(3000,function() {});