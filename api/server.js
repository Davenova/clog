const mongoose = require('mongoose');
const { TelegramWebApp } = require('@twa-dev/types'); // Assuming this is the correct import for the Telegram Web App

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define API handler (to work with Vercel serverless functions)
export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Create a new Telegram Web App instance
      const telegramWebApp = new TelegramWebApp({
        token: process.env.TELEGRAM_API_TOKEN,
      });

      // Retrieve user data
      const userData = telegramWebApp.getUserData();
      const initData = userData.initData;
      const initDataUnsafe = userData.initDataUnsafe;

      if (initDataUnsafe.user) {
        // MongoDB user model
        const User = require('./models/User'); // Assuming you have a User model

        // Create a new user instance
        const user = new User({
          telegramId: initDataUnsafe.user.id,
          username: initDataUnsafe.user.username,
          firstName: initDataUnsafe.user.first_name,
          lastName: initDataUnsafe.user.last_name,
        });

        // Save user to MongoDB
        await user.save();

        // Respond with success message
        res.status(200).json({ message: 'User data saved successfully' });
      } else {
        res.status(404).json({ message: 'No user data available' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error processing user data' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
