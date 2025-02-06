import express from "express";
import { getTrendingMovie, getMovieTrailers, getMovieDetails, getMovieSimilarMovies,getMoviesByCategory } from "../controllers/movie.controller.js";

const router = express.Router();

router.get("/trending", getTrendingMovie);
router.get("/:id/trailers", getMovieTrailers);
router.get("/:id/details", getMovieDetails);
router.get("/:id/similar", getMovieSimilarMovies);
router.get("/:category", getMoviesByCategory);



export default router;