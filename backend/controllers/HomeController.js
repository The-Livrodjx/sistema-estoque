class HomeController {

    async index(req, res) {

        res.json({msg: "Hello World"})
    }
}

module.exports = new HomeController()