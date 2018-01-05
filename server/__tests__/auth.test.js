
describe('requiresAuth Middleware', () => {
    test('401 with no Auth header', async () => {
        const res = {
            set: jest.fn().mockReturnThis(),
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        const req = {
            headers: {}
        };
        const next = jest.fn();

        const middleware = require('../middleware/requiresAuth');
        expect.assertions(2);
        await middleware(req, res, next);
        expect(res.set).toBeCalledWith('WWW-Authenticate', expect.any(String));
        expect(res.status).toBeCalledWith(401);
    });

    test('Auth header with no Bearer token', async () => {
        const res = {
            set: jest.fn().mockReturnThis(),
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        const req = {
            headers: {
                'authorization': 'Basic uu'
            }
        };
        const next = jest.fn();

        const middleware = require('../middleware/requiresAuth');
        expect.assertions(2);
        await middleware(req, res, next);
        expect(res.set).toBeCalledWith('WWW-Authenticate', expect.any(String));
        expect(res.status).toBeCalledWith(401);
    });

    test('Valid token', async () => {
        const res = {
            locals: {},
            set: jest.fn().mockReturnThis(),
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        const req = {
            headers: {}
        };
        const next = jest.fn();

        process.env.JWT_SECRET_KEY = 'secret';
        const jwt = require('jsonwebtoken');

        const data = {
            username: 'Test'
        };
        const token = jwt.sign({ data }, process.env.JWT_SECRET_KEY, { expiresIn: 10 * 60 });
        req.headers.authorization = `Bearer ${token}`;

        const middleware = require('../middleware/requiresAuth');
        expect.assertions(2);
        await middleware(req, res, next);
        expect(res.locals.token).toEqual(expect.objectContaining({
            data
        }));
        expect(next).toBeCalled();
    });

    test('Bad token', async () => {
        const res = {
            set: jest.fn().mockReturnThis(),
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        const req = {
            headers: {}
        };
        const next = jest.fn();

        process.env.JWT_SECRET_KEY = 'secret';
        const jwt = require('jsonwebtoken');

        const data = {
            username: 'Test'
        };
        const token = jwt.sign({ data }, 'differentsecret', { expiresIn: 10 * 60 });
        req.headers['authorization'] = `Bearer ${token}`;

        const middleware = require('../middleware/requiresAuth');
        expect.assertions(2);
        await middleware(req, res, next);
        expect(res.set).toBeCalledWith('WWW-Authenticate', expect.any(String));
        expect(res.status).toBeCalledWith(401);
    });

    test('Expired token', async () => {
        const res = {
            set: jest.fn().mockReturnThis(),
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        const req = {
            headers: {}
        };
        const next = jest.fn();

        process.env.JWT_SECRET_KEY = 'secret';
        const jwt = require('jsonwebtoken');

        const payload = {
            data: {
                username: 'Test'
            },
            iat: Math.floor(Date.now() / 1000) - (15 * 60) // iat=issued at, this one is expired
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: 10 * 60 });
        req.headers.authorization = `Bearer ${token}`;

        const middleware = require('../middleware/requiresAuth');
        expect.assertions(2);
        await middleware(req, res, next);
        expect(res.set).toBeCalledWith('WWW-Authenticate', expect.stringContaining('error="invalid_token"'));
        expect(res.status).toBeCalledWith(401);
    });
});