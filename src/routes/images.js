const multer = require('multer');
const express = require('express');
const imageController = require('@controllers/image');

const router = express.Router();

//multer options
const upload = multer({
	fileFilter(req, file, cb) {
	if (!file.originalname.match(/\.(png|jpg|jpeg|heic)$/)){
		cb(new Error('Please upload an image.'))
	}
	cb(undefined, true)
	}
});

// eslint-disable-next-line no-undef
router.post('/upload', upload.single('upload'), imageController.save);

router.delete('/:id', imageController.remove);

router.get('/get/:id', imageController.get)

module.exports = router;