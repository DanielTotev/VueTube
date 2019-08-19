const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
});


module.exports = {
    uploadImage: image => cloudinary.uploader.upload(image.tempFilePath),

    uploadVideo: video => cloudinary.uploader.upload(video.tempFilePath, { resource_type: "video" }),
    
    deleteResource: resourceLink => cloudinary.api.delete_resources(resourceLink)
}