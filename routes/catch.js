import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    const catchStatus = Math.random() < 0.5;
    const result = {
        'data': {
            'catch': catchStatus
        }
    };

    res.json(result);
});

export default router;