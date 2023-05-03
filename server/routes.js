const controllers = require("./controllers");
const router = require("express").Router();

// user requests
router.get("/login/:id", controllers.loginUser);
router.post("/signup/:id", controllers.createUser);
router.get("/getAllClients/:id", controllers.getAllClients);
router.post("/addClient", controllers.addClient);
router.get("/user/check", controllers.checkGoogleUser);

// workout requests
router.get("/dateRangeOfWorkouts", controllers.getDateRangeOfWorkouts);
router.get("/workouts/:id", controllers.getWorkouts);
router.get("/workout", controllers.getSingleWorkout);
router.get("/workoutByDate", controllers.getWorkoutByDate);
router.get("/workoutResults/:id", controllers.getWorkoutResults);
router.put("/updateWorkoutResult", controllers.updateWorkoutResult);
router.post("/workout", controllers.addWorkout);
router.put("/workout", controllers.editWorkouts);
router.delete("/workout", controllers.deleteWorkout);

router.get("/test", controllers.test);

module.exports = router;
