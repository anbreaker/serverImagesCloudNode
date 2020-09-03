const {Router} = require('express');
const path = require('path');
const router = Router();

router.get('/', (req, res) => {
  res.send('Hola');
});

router.get('/images/add', (req, res) => {
  // res.send('Hola');
  // res.sendFile(path.join(__dirname, '../views/layouts/main.html'));
  res.render('../views/partials/image_form');
});

module.exports = router;
