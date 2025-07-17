import restaurantcontroller from "../controllers/restaurant.controller.js";

import express from "express";
const router = express.Router();

//POST http://localhost:5000/api/v1/restaurant 
router.post("/", restaurantcontroller.create);

//GET http://localhost:5000/api/v1/restaurant
router.get("/", restaurantcontroller.getAll);

//GET http://localhost:5000/api/v1/restaurant/:id
router.get("/:id", restaurantcontroller.getById);

//PUT http://localhost:5000/api/v1/restaurant/:id
router.put("/:id", restaurantcontroller.update);

//DELETE http://localhost:5000/api/v1/restaurant/:id
router.delete("/:id", restaurantcontroller.delete);

export default router;
