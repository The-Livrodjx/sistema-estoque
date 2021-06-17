const {Sequelize} = require("sequelize")
const connection = require("../database/database")

const Produto = connection.define("products", {


    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    preco: {
        type: Sequelize.STRING,
        allowNull: false
    },
    quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    quantidadeVendida: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalPrecoVendido: {
        type: Sequelize.FLOAT,
        allowNull: false
    },

    totalVendidoMes: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
})

Produto.sync({force: false}).then(() => console.log("Tabela produto criada")).catch(err => console.log(err))

module.exports = Produto