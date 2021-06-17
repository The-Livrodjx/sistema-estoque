const {Sequelize} = require("sequelize")
const connection = require("../database/database")

const Admin = connection.define("admin", {

    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

Admin.sync({force: false}).then(() => console.log("Tabela admin criada")).catch(err => console.log(err))

module.exports = Admin