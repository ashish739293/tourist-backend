import express from "express";
import { createTour, deleteTour, getAllTour, getFeaturedTour, getSingleTour, getTourCount, updateTour } from "../controllers/tourController.js";
import { verifyAdmin ,verifyToken} from "../utils/verifyToken.js";

const tourRoute = express.Router();

// Route for getting featured tours
tourRoute.get("/featured", getFeaturedTour);

tourRoute.get("/:id", getSingleTour);

tourRoute.post("/",verifyToken, createTour);

tourRoute.put("/:id", verifyToken,updateTour);

tourRoute.delete("/:id", deleteTour);

tourRoute.get("/", getAllTour);

tourRoute.get("/count", getTourCount);

export default tourRoute;
