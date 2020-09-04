const {Router} = require('express');
const router = Router();
const fs = require('fs-extra');

// Model of DB
const Photo = require('../models/Photo');

// Cloudinary
const cloudinary = require('./configCloudinary');

router.get('/', (req, res) => {
  // res.send('Hola');
  res.render('partials/images');
});

router.get('/images/add', (req, res) => {
  // res.sendFile(path.join(__dirname, '../views/layouts/main.html'));
  // res.render('../views/partials/image_form');
  res.render('partials/image_form');
});

router.post('/images/add', async (req, res) => {
  // console.log(req.body);
  const {title, description} = req.body;
  // console.log(req.file);

  const result = await cloudinary.v2.uploader.upload(req.file.path);
  // console.log(result);

  const newPhoto = new Photo({
    title,
    description,
    imageURL: result.secure_url,
    public_id: result.public_id,
  });
  await newPhoto.save();

  res.send('World');
  await fs.unlink(req.file.path);
});

module.exports = router;
