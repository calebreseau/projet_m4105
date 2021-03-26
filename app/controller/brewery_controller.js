"use strict";
const fs = require('fs');
const fastcsv = require('fast-csv');

const Models = require("../model/db_init");
const brewerieFileName = require('../config/config').brewerieFileName;
const Brewery = require('../model/db_init').Brewery;

module.exports = {
    populateBreweries:  async (req,res) => {
        const promise = new Promise((resolve,reject) => {
            const stream =    fs.createReadStream(brewerieFileName, {encoding: 'utf8'})
                .pipe(fastcsv.parse({ headers: true, delimiter : ';' }))
                .on('error', error => console.error(error))
                .on('data',
                    async row =>
                        await Brewery.create({
                            id: row.id,
                            nameBreweries: row.breweries,
                            city: row.city

                        }).catch(e => {console.log('unable to insert : '+e)}))
                .on('end', rowCount => resolve({message : 'parsed done'}));
        });
        return res.status(200).send(result);
    },
    getAll: async (req,res) => {
        const result = await Models.Brewery.findAll();
        return res.status(200).send(result);
    }
}
