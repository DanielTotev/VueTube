const userRoutes = require('./../routes/user');
const videoRoutes = require('./../routes/video');
const profileRoutes = require('./../routes/profile');

module.exports = app => {
    app.use('/api/users', userRoutes);
    app.use('/api/videos', videoRoutes);
    app.use('/api/profile', profileRoutes);
    console.log('routes are set');
};