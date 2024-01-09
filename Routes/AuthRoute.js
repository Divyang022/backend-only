const { Signup , Login ,details,GetStudentDetails,updateDetails, GetTeacherDetails, UpdateTeacherDetails} = require("../Controllers/AuthController");
const {userVerification} = require("../Middlewares/AuthMiddleware");

const router = require("express").Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post('/',userVerification);
router.get("/getStudentDetails",GetStudentDetails);
router.get("/getTeacherDetails", GetTeacherDetails);

// Add a new route for updating teacher details
router.put("/updateTeacherDetails/:email", UpdateTeacherDetails);
router.get("/:email",details);
router.put("/updateStudentDetails/:email",updateDetails);

//getTeacherDetails

module.exports = router;