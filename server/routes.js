const controllers = require('./controllers');
const router = require('express').Router();

router.get('/login/:id', controllers.loginUser);
router.post('/signup/:id', controllers.createUser);
router.get('/workout/:id', controllers.getWorkouts);
router.put('/workout', controllers.editWorkouts);
router.get('/getAllClients/:id', controllers.getAllClients)
router.post('/workout', controllers.addWorkout);
router.post('/addClient', controllers.addClient);

module.exports = router;