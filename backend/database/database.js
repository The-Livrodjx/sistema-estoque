require('dotenv/config');
const {Sequelize} = require("sequelize")

const connection = new Sequelize(process.env.DBNAME, process.env.DBUSER, process.env.DBPASS, {

    host: process.env.DBHOST,
    dialect: "mysql",
    dialectOptions: {
        useUTC: false, //for reading from database
        dateStrings: true,
        typeCast: true
    },
    timezone: '-3:00', // for writing to database
})

module.exports = connection