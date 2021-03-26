"use strict";
const fs = require('fs');
const csv = require('fast-csv');

const Model = require("../model");
const {Op} = require("sequelize");
const beerFileName = require('../config/config').beerFileName;
const Beer = require('../model').Beer;

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
        return h.response(result).code(200);
    },
    getBeerById : async (request, h) => {
        const result = await Model.Beer.findAll({
            where: {id: request.params.id}
        })
        return h.response(result).code(200)
    },
    getBeerByName : async (request, h) => {
        const result = await Model.Beer.findAll({where: {name: request.params.name}})
        return h.response(result).code(200)
    },
    getBeerByCategory : async (request, h) => {
        const result = await Model.Beer.findAll({where: {category: request.params.category}})
        return h.response(result).code(200)
    },
    getByCity : async (request, h) => {
        const result = await Model.Beer.findAll({attributes: ['id'],where: {city: request.params.city}})
        return h.response(result).code(200)
    },
    getByCountry : async (request, h) => {
        const result = await Model.Beer.findAll({where: {country: request.params.country}})
        return h.response(result).code(200)
    }
}