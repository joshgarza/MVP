const controllers = require("./controllers");
const router = require("express").Router();

router.get("/login/:id", controllers.loginUser);
router.post("/signup/:id", controllers.createUser);
// update endpoint to be workouts plural
router.get("/workout/:id", controllers.getWorkouts);
router.put("/workout", controllers.editWorkouts);
router.delete("/workout", controllers.deleteWorkout);
router.get("/getAllClients/:id", controllers.getAllClients);
router.post("/workout", controllers.addWorkout);
router.post("/addClient", controllers.addClient);
router.post("/postWorkoutResult", controllers.postWorkoutResult);

module.exports = router;
