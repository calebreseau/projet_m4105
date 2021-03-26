const path = require('path');
const myKey = '1234';
const dbPath = path.join(__dirname,'..','..','data','beerDB.db');
const brewerieFileName = path.join(__dirname,'..','..','data','open-beer-database-breweries.csv');
const beerFileName = path.join(__dirname,'..','..','data','open-beer-database.csv');

module.exports.myKey=myKey;
module.exports.dbPath = dbPath;
module.exports.brewerieFileName = brewerieFileName;
module.exports.beerFileName = beerFileName;
