const userRoutes = require('./../routes/user');
const videoRoutes = require('./../routes/video');

module.exports = app => {
    app.use('/api/users', userRoutes);
    app.use('/api/videos', videoRoutes);
    console.log('routes are set');
};