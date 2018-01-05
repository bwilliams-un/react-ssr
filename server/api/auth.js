const express = require('express');
const router  = express.Router();

const requiresAuth = require('../middleware/requiresAuth');

const jwt = require('jsonwebtoken');
const jwtSecretKey = process.env.JWT_SECRET_KEY;

/**
 * Create an encoded and signed token that expires in 10 minutes
 */
const createToken = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, jwtSecretKey, {expiresIn: 10 * 60}, (err, encoded) => {
            if (err) return reject(err);
            resolve(encoded);
        });
    });
};

/**
 *  User login that returns a token
 */
router.post('/tokens', async (req, res) => {
    const { body } = req;

    if (!body.username || !body.password) {
        return res.status(403).json({ error: 'invalid credentials' });
    }

    // Check password

    const data = {
        username: body.username
    };

    try {
        // Assuming all the credentials are good create a token
        const token = await createToken({ data });

        res.status(200).json({ username: data.username, token });
    } catch (e) {
        res.status(500).json({ error: 'server error' });
    }
});

/**
 * Refreshes a non-expired token
 */
router.post('/tokens/refresh', requiresAuth, async (req, res) => {
    // requiresAuth middleware insures we have a valid token by this point and it's not expired
    const { data } = res.locals.token;

    try {
        const newToken = await createToken({ data });
        res.status(200).json({ username: data.username, token: newToken });
    } catch (e) {
        res.status(500).json({ error: 'server error' });
    }
});

module.exports = router;