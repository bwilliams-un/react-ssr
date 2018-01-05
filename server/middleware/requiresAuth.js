const jwt = require('jsonwebtoken');
const jwtSecretKey = process.env.JWT_SECRET_KEY;

// Usage: router.get('/endpoint', requiresAuth(), (res, res, next) => {

module.exports = async (req, res, next) => {
    let attributes = '';
    // Check for an Authorization header that contains a Bearer token
    if (req.headers && req.headers.authorization) {
        const auth = req.headers.authorization.split(' ');
        if (auth[0] === 'Bearer') {
            const token = auth[1];
            try {
                // Verify that the token is valid and signed
                const { data } = await new Promise((resolve, reject) => {
                    jwt.verify(token, jwtSecretKey, (err, decoded) => {
                        if (err) return reject(err);
                        resolve(decoded);
                    });
                });
                res.locals.token = {
                    token,
                    data
                };
                return next();
            } catch (e) {
                // Only disclose the error to the client if it's a simple expiration to avoid leaking specifics
                if (e instanceof jwt.TokenExpiredError) {
                    attributes = 'error="invalid_token" error_description="token is expired"';
                }
            }
        }
    }
    res.set('WWW-Authenticate', `Bearer ${attributes}`)
        .status(401)
        .send('Unauthorized');
};
