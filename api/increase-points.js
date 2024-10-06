const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

router.post('/increase-points', async (req, res) => {
    const { telegramId } = req.body;

    if (!telegramId) {
        return res.status(400).json({ error: 'Invalid telegramId' });
    }

    try {
        const updatedUser = await prisma.user.update({
            where: { telegramId },
            data: { points: { increment: 1 } },
        });

        res.json({ success: true, points: updatedUser.points });
    } catch (error) {
        console.error('Error increasing points:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
