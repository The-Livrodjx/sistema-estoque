const jwt = require("jsonwebtoken")

const secret = "lkpfaemklfealkfamlkfsadmlk"

const Admin = require("../models/Admin")

const bcrypt = require("bcrypt")

class AdminController {

    async authenticate(req, res) {

        const {
            email,
            password
        } = req.body

        if(email != undefined && password != undefined) {

            Admin.findOne({where: {email: email}}).then(async (admin) => {


                if(admin !== undefined) {

                    var result = await bcrypt.compare(password, admin.password)

                    if(result) {

                        var token = jwt.sign({email: admin.email}, secret)
        
                        res.status(200)
                        res.json({token: token})
                    }else {
                        res.status(406)
                        return res.json({message: "Senha incorreta"})
                    }
                }
                else {
                    res.status(406)
                    return res.json({message: "Dados incorretos"})
                }

            }).catch(err => {
                res.status(406)
                return res.json({message: "Dados incorretos"})
            })

        }else {
            res.status(406)
            return res.json({message: "Por favor insira dados corretos !"})
        }
    }

    async createAdmin(req, res) {

        const {
            name,
            email,
            password
        } = req.body

        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(password, salt)

        if(name !== undefined && email !== undefined) {

            Admin.create({
                name: name,
                email: email,
                password: hash
            }).then(() => {
                
                return res.json({msg: "Admin criado com sucesso !"})
            }).catch(err => {

                req.status = 406

                return res.json({msg: "Houve um erro :/", err: err})
            })
        }else {

            return res.json({msg: "Por favor envie dados válidos"})
        }
    }
}

module.exports = new AdminController()