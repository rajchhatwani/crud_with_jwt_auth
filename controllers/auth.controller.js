const jwt = require('jsonwebtoken');
const config = require('../config')
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    if (email !== 'admin@codesfortomorrow.com' || password !== 'Admin123!@#') {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
        { email, role: 'admin' },
        config.jwt_secret,
        { expiresIn: '1d' }
    );

    res.status(200).json({ token });
};

module.exports = { loginAdmin };
