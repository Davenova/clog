const { TelegramWebApp } = require('@twa-dev/types');
const { prisma } = require('./lib/prisma'); // Assuming the prisma client is set up in this file

const telegramWebApp = new TelegramWebApp({
    token: process.env.TELEGRAM_BOT_TOKEN,  // Store the token in .env
});

// Get user data from Telegram WebApp
const userData = await telegramWebApp.getUserData();

// Check if user exists, else create new user
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

console.log('User data saved or retrieved:', user);
