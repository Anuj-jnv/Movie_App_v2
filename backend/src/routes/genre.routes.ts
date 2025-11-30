import { FastifyInstance } from "fastify";
import { GenreController } from "../controllers/genre.controller.js";

export async function genreRoutes(app: FastifyInstance) {
  const genreController = new GenreController();

  app.get("/genres", genreController.getAllGenres);

  app.get("/genres/:id", genreController.getGenreById);

  app.post("/genres", genreController.createGenre);

  app.put("/genres/:id", genreController.updateGenre);

  app.delete("/genres/:id", genreController.deleteGenre);
}