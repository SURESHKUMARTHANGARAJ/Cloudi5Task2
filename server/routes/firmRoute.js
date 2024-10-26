const express = require('express');
const { createFirm, updateFirm, deleteFirm, getFirmByName, getAllFirms } = require('../controllers/firmController');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage });

router.post('/', upload.single('logo'), createFirm);
router.put('/:id', upload.single('logo'), updateFirm);
router.delete('/:id', deleteFirm);
router.get('/name/:name', getFirmByName);
router.get('/', getAllFirms);

module.exports = router;
