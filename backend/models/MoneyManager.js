const {Sequelize} = require("sequelize");
const connection = require("../database/database")


const MoneyManager = connection.define("moneymanagements", {

    month: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: Date.now
    },
    totalGain: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    totalProductsSelled: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

MoneyManager.sync({force: false}).then(() => console.log("Tabela financeira criada"))
.catch(err => console.log(err))

module.exports = MoneyManager