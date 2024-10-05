const { TelegramWebApp } = require('@twa-dev/types');

const telegramWebApp = new TelegramWebApp({
    token: '7711678323:AAG8LLrWRjouHRwMC2_J5csOj_wn_y1utks',
  });

const userData = await telegramWebApp.getUserData();

const User = require('./user');

const user = new User({
  telegramId: userData.id,
  username: userData.username,
});

user.save((err, user) => {
  if (err) {
    console.error(err);
  } else {
    console.log(user);
  }
});