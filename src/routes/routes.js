const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
  res.send('Hola');
});

router.get('/images/add', (req, res) => {
  // res.send('Hola');
  res.render('image_form');
});

module.exports = router;
