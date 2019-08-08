const router = require('express').Router();
const cloudinary = require('cloudinary').v2;
const Video = require('./../models/Video');
const passport = require('passport');

cloudinary.config({
    cloud_name: 'dbtbhnqfk', 
    api_key: '423416941363816', 
    api_secret: '9MyyftE1ShXCOBZKHK8If0qUmEc' 
});

router.post('/upload', passport.authenticate('jwt', { session: false }),  async (req, res) => {
    const  { title, author, description } = req.body;
    const uploaderId = req.user._id;
    const thumbnail  = req.files.thumbnail;
    const video = req.files.video;
    try {
        const thumbnailUploadResult = await cloudinary.uploader.upload(thumbnail.tempFilePath)
        const videoUploadResult = await cloudinary.uploader.upload(video.tempFilePath, { resource_type: "video" });

        const createdVideo = await Video.create({
            title,
            author,
            description,
            uploaderId,
            link: videoUploadResult.url,
            thumbnail: thumbnailUploadResult.url
        })

        res.status(200).send(createdVideo);
    } catch(err) {
        res.status(400).send({ message: err.message });
    }
});

router.get('/getAll', async (req, res) => {
    const videos = await Video.find({});
    res.status(200).json(videos);
});

module.exports = router;