const express = require("express");
const router = express.Router();
const coordinatorController = require('../contollers/coordinatorController'); // Ensure the path is correct

router.post("/accept", coordinatorController.Accept);
router.post("/acceptall", coordinatorController.Acceptall);
router.post("/reject", coordinatorController.Reject);

module.exports = router;
