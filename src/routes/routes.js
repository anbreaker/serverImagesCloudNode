const {Router} = require('express');
const router = Router();
const fs = require('fs-extra');

// Model of DB
const Photo = require('../models/Photo');

// Cloudinary
const cloudinary = require('./configCloudinary');

router.get('/', async (req, res) => {
  const photos = await Photo.find().lean();
  // console.log(photos);
  res.render('partials/images', {photos});
});

router.get('/images/add', async (req, res) => {
  // res.sendFile(path.join(__dirname, '../views/layouts/main.html'));
  // res.render('../views/partials/image_form');
  const photos = await Photo.find().lean();
  res.render('partials/image_form', {photos});
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
  // Delete image of uploads local
  await fs.unlink(req.file.path);

  res.redirect('/');
});

router.get('/images/delete/:photo_id', async (req, res) => {
  const {photo_id} = req.params;
  const photoDeleted = await Photo.findByIdAndDelete(photo_id);

  //Delete photo on cloudinary
  const result = await cloudinary.v2.uploader.destroy(photoDeleted.public_id);
  console.log(result);
  res.redirect('/images/add');
});

module.exports = router;
