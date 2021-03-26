var express=require('express');
var app=express();

const beers = require('./open-beer-database.json')

app.use(express.json())
app.set('json spaces', 40);


app.get('/',function(req,res){

    res.send('Hello World!');

});

app.get('/api/beers/',function(req,res){

    res.status(200).json(beers);

});

app.get('/api/beers/:brewery_id',function(req,res){

    console.log('brewery id');
    const id = parseInt(req.params.brewery_id);
    console.log('id:'+id)
    const beer = beers.find(beers => beers.brewery_id === id);
    console.log(beer);
    res.status(200).json(beer);

});

var server=app.listen(3000,function() {});