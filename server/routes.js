const controllers = require('./controllers/index.js');
const router = require('express').Router();

router.get('/login/:id', controllers.userControllers.loginUser);
router.post('/signup/:id', controllers.userControllers.createUser);
router.get('/workout/:id', controllers.userControllers.getWorkouts);
router.get('/workout', controllers.userControllers.getAllClients)
router.post('/workout', controllers.userControllers.addWorkout);

module.exports = router;