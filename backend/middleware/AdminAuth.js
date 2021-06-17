var jwt = require("jsonwebtoken")

var secret = "lkpfaemklfealkfamlkfsadmlk"

module.exports = function (req, res, next) {

    const authToken = req.headers['authorization']

    if(authToken != undefined) {

        const bearer = authToken.split(' ')
        const token = bearer[1]

        try {
            var decode = jwt.verify(token, secret)
            console.log(decode)

            if(decode) {
                next()
            }
            else {
                res.status(406)
                return res.json({err: "Você não é um administrador"})
            }
            
            
        }catch(err) {

            res.status(406)
            return res.json({err: "Usuário ou senha incorretos"})
        }
    }
    else {
        res.status(403)
        return res.send("Você não está autenticado !")
    }
}