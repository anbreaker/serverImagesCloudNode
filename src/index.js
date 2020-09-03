'use strict';
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = require('./app');

// Start the server
app.listen(app.get('port'), () => {
  console.log('Envioroment: ', process.env.NODE_ENV);
  console.log(`Server on Port: http://127.0.0.1:${app.get('port')}`);
});
