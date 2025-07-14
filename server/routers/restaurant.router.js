import restaurantcontroller from "../controllers/restaurant.controller.js";

import express from "express";
const router = express.Router();

//POST http://localhost:5000/api/v1/restaurant (local me 3000)
router.post("/", restaurantcontroller.create);

export default router;
