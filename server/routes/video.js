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
        const thumbnailUploadResult = await cloudinary.uploader.upload(thumbnail.tempFilePath);
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

router.get('/getAll', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const videos = await Video.find({});
    res.status(200).json(videos);
});

router.get('/details/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const id = req.params.id;
    try {
        const video = await Video.findOne({ _id: id });
        if(!video) {
            return res.status(404);
        }

        video.views++;
        await video.save();
        res.status(200).send({ video });
    } catch(err) {
        res.status(400).send({ message: err.message });
    }
});

router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const id  = req.params.id;
    try{
        const videoToDelete = await Video.findById(id);
        if(!videoToDelete) {
            return res.status(404);
        }
        await cloudinary.uploader.destroy(videoToDelete.thumbnail);
        await cloudinary.uploader.destroy(videoToDelete.link);
        await Video.deleteOne({ _id: videoToDelete._id });
        return res.status(200);
    } catch(err) {
        return res.status(400).json({ message: err.message })
    }
});

module.exports = router;