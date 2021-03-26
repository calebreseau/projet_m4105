"use strict";
const fs = require('fs');
const csv = require('fast-csv');

const Model = require("../model/db_init");
const {Op} = require("sequelize");
const beerFileName = require('../config/config').beerFileName;
const Beer = require('../model/db_init').Beer;

module.exports = {
    populateBeers:  async (request,h) => {
        console.log('coucou')
        const promise = new Promise((resolve,reject) => {
            const stream = fs.createReadStream(beerFileName, {encoding: 'utf8'})
                .pipe(csv.parse({ headers: true, delimiter : ';' }))
                .on('error', error => console.error(error))
                .on('data',
                    async row =>
                        await Beer.create({
                            id :row.id,
                            brewery_id : row.brewery_id,
                            name: row.name,
                            alcohol_By_Volume: row.Alcohol_By_Volume,
                            style : row.Style,
                            category : row.Category,
                            city : row.City,
                            country: row.Country

                        }).catch(e => {console.log('unable to insert : '+e)}))
                .on('end', rowCount => resolve({message : 'parsed done'}));
        });
        return h.response(await promise).code(200);
    },
    getAll: async (request,h) => {
        const result = await Model.Beer.findAll();
        return h.status(200).send(result);
    },
    getBeerById : async (request, h) => {
        const result = await Model.Beer.findAll({
            where: {id: request.params.id}
        })
        return h.status(200).send(result);
    },
    getBeerByName : async (request, h) => {
        const result = await Model.Beer.findAll({where: {name: request.params.name}})
        return h.status(200).send(result);
    },
    getBeerByCategory : async (request, h) => {
        const result = await Model.Beer.findAll({where: {category: request.params.category}})
        return h.status(200).send(result);
    },
    getByCity : async (request, h) => {
        const result = await Model.Beer.findAll({attributes: ['id'],where: {city: request.params.city}})
        return h.status(200).send(result);
    },
    getByCountry : async (request, h) => {
        const result = await Model.Beer.findAll({where: {country: request.params.country}})
        return h.status(200).send(result);
    }
}
