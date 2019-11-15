const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        console.log(req.body)
        const db = req.app.get('db')
        const { username, password } = req.body

        const result = await db.check_user_name([username])
        const existingUser = result[0];
        if (existingUser) {
            return res.status(409).send(`Username already taken`)
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        let newUser = await db.register_user([username, hash]);
        newUser = newUser[0];
        req.session.username = { ...newUser };
        res.status(200).send(req.session.user)
    },
    login: async (req, res) => {
        const { username, password } = req.body
        const db = req.app.get('db')
        let foundUser = await db.check_user_name([username])
        foundUser = foundUser[0]
        if (!foundUser) {
            res.status(401).send('Username not found.  Please register as a new user before logging in.')
        }
        const isAuthenticated = bcrypt.compareSync(password, foundUser.password)

        if (authenticated) {
            delete foundUser.password;
            req.session.user = foundUser;
            res.status(202).send(req.session.user)
        } else {
            res.status(403).send('Incorrect password')
        }
    }

}

