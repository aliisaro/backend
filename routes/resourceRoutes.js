const express = require("express");
const router = express.Router();
const {  getAllResources, addResource, getResourceById, deleteResource, updateResource } = require("../controllers/waterControllers");

const requireAuth = require("../middleware/requireAuth");

router.use(requireAuth);

router.get("/", getAllResources);

router.post("/", addResource); 

router.get("/:id", getResourceById);

router.put("/:id", updateResource);

router.delete("/:id", deleteResource);

module.exports = router;
