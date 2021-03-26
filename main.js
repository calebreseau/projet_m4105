var express=require('express');
var app=express();

app.get('/',function(req,res){

    res.send('Hello World!');

});

app.get('/test',function(req,res){

    res.send('test');

});

var server=app.listen(3000,function() {});