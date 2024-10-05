const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://nikandr:passwordtelegram@cluster0.m9vc0.mongodb.net/toolbox_data?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (err) => {
  console.error(err);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});