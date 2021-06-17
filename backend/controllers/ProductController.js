const { Sequelize } = require("sequelize")
const Produto = require("../models/Produto")
const MoneyManager = require('../models/MoneyManager')
const Op = Sequelize.Op;
var actualId = 0;

class ProductController {
    
    async showAll(req, res) {

        Produto.findAll().then(produtos => {

            if (produtos !== undefined) {


                MoneyManager.findOne({order: [['id', 'DESC']]}).then(values => {
                   
                    actualId = values.id

                    return res.json({ produtos, ganhosTotais: values.totalGain.toFixed(2)})
                }).catch(err => {

                    if(err.message == "Cannot read property 'id' of null") {

                        let date = new Date()
                        let month = date.getMonth() + 1
                        let year = date.getFullYear()
                        let finalDate = `${month}-${year}`

                        MoneyManager.create({
                            month: finalDate,
                            totalGain: 0,
                            totalProductsSelled: 0,

                        }).then((values) => {

                            return res.json({ produtos, ganhosTotais: values.totalGain.toFixed(2)})
                        })
                    }
                    else {
                        res.json({ err: err.message }) 
                    }
                })


            }
        })
    }

    async findOne(req, res) {

        const id = req.params.id


        Produto.findOne({ where: { id: id } }).then(product => {

            return res.json(product)
        }).catch(err => {

            req.status = 400

            return res.json({ err: err.message })
        })
    }

    async create(req, res) {

        const {
            name,
            preco,
            quantidade
        } = req.body

        Produto.findOne({ where: { name: name } }).then(produto => {

            if (produto == undefined) {

                Produto.create({
                    name: name,
                    preco: `R$ ${preco.toFixed(2)}`,
                    quantidade: quantidade,
                    quantidadeVendida: 0,
                    totalPrecoVendido: 0,
                    totalVendidoMes: 0

                }).then(() => {

                    return res.json({ msg: "Produto cadastrado com sucesso !" })
                }).catch(err => {

                    req.status(400)

                    return res.json({ msg: "Houve um erro :/", err: err })
                })
            }
            else {
                res.status(403)
                return res.json({ msg: "Produto já cadastrado !" })
            }

        }).catch(err => {

            res.status(400)

            return res.json({ msg: "Houve um erro :/", err: err })
        })
    }

    async updateProduct(req, res) {

        const { id, name, quantidade, preco } = req.body


        Produto.findOne({ where: { id: id } }).then(product => {

            if (product != undefined) {

                Produto.update({
                    name,
                    quantidade,
                    preco
                }, { where: { id: id } }).then(() => {

                    return res.json({ message: "Tudo certo !" })
                })
            }
        }).catch(err => {

            return res.json({ err: err.message })
        })
    }

    async searchProduct(req, res) {

        const query = `%${req.body.name}%`

        if (query != undefined) {

            Produto.findAll({ where: { name: { [Op.like]: query } } })
                .then(products => {
                    return res.json(products)
                }).catch(err => {
                    res.status(403)
                    return res.json(err)
                });

        }
    }

    async deleteProduct(req, res) {
        const id = req.params.id

        if (id != undefined) {

            Produto.destroy({ where: { id: id } }).then(() => {

                return res.json({ msg: "Produto deletado com sucesso !" })
            })
        }
    }

    async sellAnotherItem(req, res) {

        const { id, totalSelled } = req.body
        if (id != undefined) {

            Produto.findOne({ where: { id: id } }).then(product => {

                Produto.findAll({ attributes: ["totalPrecoVendido"] }).then(todosPreco => {

                    let priceToConvert = product.preco.split(" ")[1]
                    let convertedPrice = parseFloat(priceToConvert.split('.').join('.'))

                    let amount = product.quantidade - totalSelled
                    let amountSelled = product.quantidadeVendida + totalSelled
                    let moneyEarned = totalSelled * convertedPrice
                    let totalVendidoMes = product.totalVendidoMes + moneyEarned

                    let ganhosTotais = 0
                    let totalProdutosVendidos = 0

                    MoneyManager.findOne({order: [['id', 'DESC']]}).then(value => {

                        return ganhosTotais += value.totalGain
                    })

                    MoneyManager.findOne({order: [['id', 'DESC']]}).then(value => {

                        return totalProdutosVendidos += value.totalProductsSelled
                    })


                    if (ganhosTotais === 0) {

                        ganhosTotais += moneyEarned
                    }

                    if (totalProdutosVendidos === 0) {

                        totalProdutosVendidos += amountSelled
                    }

                    // ganhosTotais += moneyEarned
                    // return res.json({totalPrecoVendido})

                    if (product.quantidade <= 0) {

                        res.status(400)
                        res.json({ err: "Produto em falta no estoque" })
                    }
                    else {
                        // let date = Date.now()
                        // let month = date.getMonth() + 1
                        
                        Produto.update({
                            quantidade: amount,
                            quantidadeVendida: amountSelled,
                            totalPrecoVendido: product.totalPrecoVendido + moneyEarned
                        }, { where: { id: product.id } }).then(productActual => {

                            if(actualId != 0) {
                                MoneyManager.update({ totalGain: ganhosTotais, totalProductsSelled: totalProdutosVendidos}, {where: {id: actualId}}).then(() => {
                                    res.json({ ganhosTotais })
                                })
                            }
                        })

                    }

                })

            }).catch(err => {

                res.status(406)
                res.json({ err: err.message })
            })
        }
    }

    async newMonth(req, res) {

        let date = new Date()
        let month = date.getMonth() + 1
        let year = date.getFullYear()
        let finalDate = `${month}-${year}`

        MoneyManager.create({
            month: finalDate,
            totalGain: 0,
            totalProductsSelled: 0,
        }).then(() => {

            Produto.update({quantidadeVendida: 0}, {where: {}}).then(() => {
                return res.json("Tudo certo")
            })
        })
    }

    async getManagements(req, res) {

        MoneyManager.findAll().then(values => {
            
            res.json(values)
        })
    }
    async returnId(req, res) {

        res.json(actualId)
    }
}

module.exports = new ProductController()