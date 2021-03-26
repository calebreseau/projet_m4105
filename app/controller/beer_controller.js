"use strict";
const fs = require('fs');
const fastcsv = require('fast-csv');

const Model = require("../model/db_init");
const {Op} = require("sequelize");
const beerFileName = require('../config/config').beerFileName;
const Beer = require('../model/db_init').Beer;

module.exports = {
    populateBeers:  async (req,res) => {
        const promise = new Promise((resolve,reject) => {
            const stream = fs.createReadStream(beerFileName, {encoding: 'utf8'})
                .pipe(fastcsv.parse({ headers: true, delimiter : ';' }))
                .on('error', error => console.error(error))
                .on('data',
                    async row =>
                        await Beer.create({
                            id :row.id,
                            brewery_id : row.brewery_id,
                            brewery : row.Brewer,
                            name: row.name,
                            alcohol_By_Volume: row.alcohol_By_Volume,
                            style : row.Style,
                            category : row.Category,
                            city : row.City,
                            country: row.Country
                        }).catch(e => {console.log('unable to insert : '+e)}))
                .on('end', rowCount => resolve({message : 'parsing done'}));
        });
        return res.status(200).send();
    },
    getAll: async (req,res) => {
        const result = await Model.Beer.findAll();
        return res.status(200).send(result);
    },
    getBeerById : async (req, res) => {
        const result = await Model.Beer.findAll({
            where: {id: req.params.id}
        })
        return res.status(200).send(result);
    },
    getBeerByName : async (req, res) => {
        const result = await Model.Beer.findAll({where: {name: req.params.name}})
        return res.status(200).send(result);
    },
    getBeerByCategory : async (req, res) => {
        const result = await Model.Beer.findAll({where: {category: req.params.category}})
        return res.status(200).send(result);
    },
    getByCity : async (req, res) => {
        const result = await Model.Beer.findAll({attributes: ['id'],where: {city: req.params.city}})
        return res.status(200).send(result);
    },
    getByCountry : async (req, h) => {
        const result = await Model.Beer.findAll({where: {country: req.params.country}})
        return res.status(200).send(result);
    }
}
