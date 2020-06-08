const apirouter = require('express').Router();
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const errorHandler = require('./middleware/errors');

apirouter.get('/', (req, res) => {
  res.json({ message: 'API is working !' });
});

apirouter.use('/auth', authRoutes);
apirouter.use('/users', userRoutes);
apirouter.use(errorHandler);

module.exports = apirouter;
