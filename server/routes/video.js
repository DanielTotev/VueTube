const router = require('express').Router();
const cloudUtils = require('./../utils/cloudUtils');
const Video = require('./../models/Video');
const passport = require('passport');


router.post('/upload', passport.authenticate('jwt', { session: false }),  async (req, res) => {
    const  { title, author, description } = req.body;
    const uploaderId = req.user._id;
    const thumbnail  = req.files.thumbnail;
    const video = req.files.video;
    try {
        const thumbnailUploadResult = await cloudUtils.uploadImage(thumbnail);
        const videoUploadResult = await cloudUtils.uploadVideo(video);

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
            return res.status(404).send({ message: 'Not Found' });
        }
        await cloudUtils.deleteResource(videoToDelete.thumbnail);
        await cloudUtils.deleteResource(videoToDelete.link);
        await Video.deleteOne({ _id: videoToDelete._id });
        return res.status(200).json({ message: 'Success' });
    } catch(err) {
        return res.status(400).json({ message: err.message })
    }
});

router.put('/edit/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const id = req.params.id;
    try {
        const videoFromDb = await Video.findById(id);
        if(!videoFromDb) {
            return res.status(404).json({ message: 'Video not found!' });
        }
        
        const { title, author, description } = req.body;
        videoFromDb.title = title;
        videoFromDb.author = author;
        videoFromDb.description = description;

        if(req.files) {
            const { video, thumbnail } = req.files;

            if(video) {
                cloudUtils.deleteResource(videoFromDb.link);
                const videoUploadResult = await cloudUtils.uploadVideo(video);
                videoFromDb.link = videoUploadResult.url;
            }

            if(thumbnail) {
                cloudUtils.deleteResource(videoFromDb.thumbnail);
                const thumbnailUploadResult = cloudUtils.uploadImage(thumbnail);
                videoFromDb.thumbnail = thumbnailUploadResult.url;
            }
        }

        await videoFromDb.save();
        return res.status(200).json({ videoFromDb });
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;