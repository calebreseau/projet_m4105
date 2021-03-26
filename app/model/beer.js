module.exports = (sequelize, DataTypes) => {
    const Beer = sequelize.define("beer", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        brewery_id: {
            type: DataTypes.INTEGER,

        },
        brewery: {
            type: DataTypes.STRING,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        alcohol_By_Volume: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        style: {
            type: DataTypes.STRING,
            allowNull: true,

        },
        category: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    })
    return Beer;
}
