const express = require("express");
const router = express.Router();
const excel = require("../excel")
const coordinatorController = require('../contollers/coordinatorController'); // Ensure the path is correct

router.post("/accept", coordinatorController.Accept);
router.post("/acceptall", coordinatorController.Acceptall);
router.post("/reject", coordinatorController.Reject);
router.get("/dashboard",coordinatorController.Dashboard)
router.get("/download",excel.download)

module.exports = router;
