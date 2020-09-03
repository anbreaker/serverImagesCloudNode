const mongoose = require('mongoose');

// const dbLink = process.env.MONGODB_URI;
const dbLink = 'mongodb://localhost:27017/test';

mongoose
  .connect(dbLink, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((db) => console.log('DB is conneted an create on', db.connection.host))
  .catch((error) => console.error(error));
