const multer = require('multer');
const express = require('express');
const imageController = require('@controllers/image');

const router = express.Router();

//multer options
// const upload = multer({
// 	fileFilter(req, file, cb) {
// 	if (!file.originalname.match(/\.(png|jpg|jpeg|heic)$/)){
// 		cb(new Error('Please upload an image.'))
// 	}
// 	cb(undefined, true)
// 	}
// });

const storage = multer.diskStorage({
	fileFilter (req, file, cb) {
		if (!file.originalname.match(/\.(png|jpg|jpeg|heic)$/)){
			cb(new Error('Please upload an image.'))
		}
	},
	destination (req, file, cb) {
		cb(null, 'public/images')
	},
	filename (req, file, cb) {
		// const fileName = Date.now() + '-' + req.file.originalname
		const imageName = Date.now() + '-' + file.originalname ;
		cb(null, imageName)
	}
})

//multer options
const upload = multer({
	storage: storage
});

// eslint-disable-next-line no-undef
router.post('/upload/:id', upload.single('image'), imageController.save);

router.delete('/:id', imageController.remove);

router.get('/get/:id', imageController.get)

module.exports = router;