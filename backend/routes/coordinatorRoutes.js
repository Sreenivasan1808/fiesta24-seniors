const express = require("express");
const router = express.Router();
const excel = require("../excel")
const coordinatorController = require('../contollers/coordinatorController'); 
const authenticateToken = require('../middleware/authMiddleware');
router.use(authenticateToken)
router.post("/participantpasswordchange",coordinatorController.participantpasswordchange)
router.post("/accept", coordinatorController.Accept);
router.post("/acceptall", coordinatorController.Acceptall);
router.post("/reject", coordinatorController.Reject);
router.post("/changeMember",coordinatorController.changeMember)
router.get("/dashboard",coordinatorController.Dashboard)
router.get("/download",excel.download)
router.get("/getMembers",coordinatorController.getMembers)

module.exports = router;
