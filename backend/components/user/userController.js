const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { users } = require('./users');

/**
 * POST create a new user
 * /api/user/signup
 */
module.exports.signUp = async (req, res) => {
    console.log('req.body:', req.body);
    const { email, password } = req.body;

    if (!email && !password) {
        res.status(400).json({ message: `Email and password is not provided` });
    } else if (!email) {
        res.status(400).json({ message: `Email is not provided` });
    } else if (!password) {
        res.status(400).json({ message: `Password is not provided` });
    }

    const userExists = users.find((user) => user.email === email);

    if (userExists) {
        res.status(403).json({ message: `User already exists!` });
    }

    try {
        const hashedPw = await bcrypt.hash(password, 10);

        const newUser = {
            id: users.length + 1,
            email,
            password: hashedPw,
        };

        users.push(newUser);

        res.status(201).json({ message: 'New User created!' });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

/**
 * POST user login
 * /api/user/login
 */
module.exports.login = async (req, res, next) => {
    const { email, password, isAdmin } = req.body;

    try {
        const user = users.find((user) => user.email === email);

        if (!user) {
            return res.status(401).json({ message: 'Auth failed' });
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return res.status(401).json({ message: 'Auth failed' });
        }

        const token = jwt.sign(
            { email: user.email, userId: user.id, isAdmin },
            'secret',
            {
                expiresIn: '1h',
            },
        );

        res.status(200).json({ token, expiresIn: 36000 });
    } catch (error) {
        return res.status(401).json({ message: 'Auth failed' });
    }
};
