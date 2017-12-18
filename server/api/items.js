const express = require('express');
const router  = express.Router();

// static demo data
const data = [
    {
        id: 12345,
        'name': 'Item A'
    },
    {
        id: 45678,
        'name': 'Item B'
    }
];

router.get('/items/', (req, res) => {
    res.send(data);
});

router.get('/items/:id', (req, res) => {
    const id = req.params.id;
    const item = data.find(i => i.id === id);
    if (item) {
        res.send(item);
    } else {
        res.status(404).send('Not Found');
    }
});

module.exports = router;