import { FastifyInstance } from "fastify";
import { MovieController } from "../controllers/movie.controller.js";

export async function movieRoutes(app: FastifyInstance) {
  const movieController = new MovieController();

  app.get("/movies", movieController.getAllMovies);

  app.get("/movies/:id", movieController.getMovieById);

  app.post("/movies", movieController.createMovie);

  app.put("/movies/:id", movieController.updateMovie);

  app.delete("/movies/:id", movieController.deleteMovie);

  app.post("/movies/:id/reviews", movieController.addReview);

  app.get("/movies/:id/reviews", movieController.getMovieReviews);
}