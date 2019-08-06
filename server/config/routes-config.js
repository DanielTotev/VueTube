const userRoutes = require('./../routes/user');

module.exports = app => {
    app.use('/api/users', userRoutes);
    console.log('routes are set');
};