import express from 'express';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client';
import { TelegramWebApp } from '@twa-dev/types';

const app = express();
const prisma = new PrismaClient();
const { PrismaClient } = require('@prisma/client');


// Middleware
app.use(bodyParser.json());

// Endpoint to handle user data
app.post('/api/user', async (req, res) => {
    try {
        const userData = req.body;

        if (!userData || !userData.id) {
            return res.status(400).json({ error: 'Invalid user data' });
        }

        let user = await prisma.user.findUnique({
            where: { telegramId: userData.id }
        });

        if (!user) {
            user = await prisma.user.create({
                data: {
                    telegramId: userData.id,
                    username: userData.username || ''
                }
            });
        }

        return res.json(user);
    } catch (error) {
        console.error('Error processing user data:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to increase user points
app.post('/api/increase-points', async (req, res) => {
    try {
        const { telegramId } = req.body;

        if (!telegramId) {
            return res.status(400).json({ error: 'Invalid telegramId' });
        }

        const updatedUser = await prisma.user.update({
            where: { telegramId },
            data: { points: { increment: 1 } }
        });

        return res.json({ success: true, points: updatedUser.points });
    } catch (error) {
        console.error('Error increasing points:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});


// Telegram Web App setup
const telegramWebApp = new TelegramWebApp({
  token: process.env.TELEGRAM_API_TOKEN, // Use the token from .env
});


// Your other server logic can go here...

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
