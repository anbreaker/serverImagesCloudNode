const app = require('./app');

// Start the server
app.listen(app.get('port'), () => {
  console.log(`Server on Port: http://127.0.0.1:${app.get('port')}`);
});
