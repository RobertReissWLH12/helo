const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        console.log(req.body)
        const db = req.app.get('db')
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        let newUser = await db.register([username, hash])
        const newUser = newUser[0];
        req.session.userId = newUser.id;
        res.status(200).send(newUser)
    },

    login: async (req, res) => {
        const { username, password } = req.body;
        const db = req.app.get("db");
        let foundUser = await db.login(username, password);
        foundUser = foundUser[0];
        const authenticated = bcrypt.compareSync(password, foundUser.password);
        if (authenticated) {
            delete foundUser.password;
            req.session.userId = foundUser[0].id;
            if (foundUser) {
                res.status(202).send(foundUser);
            } else {
                res.status(401).send("username not found");
            }
        } else {
            res.status(401).send("password incorrect");
        }
    }


}

