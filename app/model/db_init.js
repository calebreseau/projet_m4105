const {Sequelize, DataTypes} = require("sequelize");
const dbPath = require("../config/config").dbPath;

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: require('../config/config').dbPath,
    logging: console.log, //or false,

});

const db = {};
db.Brewery = require('./brewery')(sequelize,DataTypes);
db.Beer = require('./beer')(sequelize,DataTypes);

db.Brewery.hasMany(db.Beer ,{ as: "bieres", onDelete: 'cascade', onUpdate:'cascade' })
//onDelete ne fonctionne pas
db.Beer.belongsTo(db.Brewery,{
    foreignKey: "brewery",
    as: "brasserie",
    allowNull : false
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

