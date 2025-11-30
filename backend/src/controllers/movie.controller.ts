import { FastifyReply, FastifyRequest } from "fastify";
import { MovieService } from "../services/movie.service.js";
import {
  CreateMovieSchema,
  UpdateMovieSchema,
  AddReviewSchema,
} from "../schemas/movie.schema.js";

export class MovieController {
  private movieService = new MovieService();

  getAllMovies = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const movies = await this.movieService.getAllMovies();
      return reply.code(200).send({
        success: true,
        message: "Movies fetched successfully",
        data: movies,
      });
    } catch (error: any) {
      return reply.code(500).send({
        success: false,
        message: error.message || "Error fetching movies",
        error: error,
      });
    }
  };

  getMovieById = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id } = req.params as { id: string };
      const movie = await this.movieService.getMovieById(id);
      return reply.code(200).send({
        success: true,
        message: "Movie fetched successfully",
        data: movie,
      });
    } catch (error: any) {
      return reply.code(404).send({
        success: false,
        message: error.message || "Movie not found",
        error: error,
      });
    }
  };

  createMovie = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const raw = req.body as any;
      let bodyObj: unknown;

      if (typeof raw === "string") {
        try {
          bodyObj = JSON.parse(raw);
        } catch (e) {
          return reply.code(400).send({
            success: false,
            message: "Invalid JSON body",
            error: (e as Error).message,
          });
        }
      } else {
        bodyObj = raw;
      }

      const validatedData = CreateMovieSchema.parse(bodyObj);
      const movie = await this.movieService.createMovie(validatedData);
      return reply.code(201).send({
        success: true,
        message: "Movie created successfully",
        data: movie,
      });
    } catch (error: any) {
      return reply.code(400).send({
        success: false,
        message: error.message || "Error creating movie",
        error: error,
      });
    }
  };

  updateMovie = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id } = req.params as { id: string };
      const raw = req.body as any;
      let bodyObj: unknown;

      if (typeof raw === "string") {
        try {
          bodyObj = JSON.parse(raw);
        } catch (e) {
          return reply.code(400).send({
            success: false,
            message: "Invalid JSON body",
            error: (e as Error).message,
          });
        }
      } else {
        bodyObj = raw;
      }

      const validatedData = UpdateMovieSchema.parse(bodyObj);
      const movie = await this.movieService.updateMovie(id, validatedData);
      return reply.code(200).send({
        success: true,
        message: "Movie updated successfully",
        data: movie,
      });
    } catch (error: any) {
      return reply.code(400).send({
        success: false,
        message: error.message || "Error updating movie",
        error: error,
      });
    }
  };

  deleteMovie = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id } = req.params as { id: string };
      await this.movieService.deleteMovie(id);
      return reply.code(200).send({
        success: true,
        message: "Movie deleted successfully",
      });
    } catch (error: any) {
      return reply.code(404).send({
        success: false,
        message: error.message || "Error deleting movie",
        error: error,
      });
    }
  };

  addReview = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id } = req.params as { id: string };
      const raw = req.body as any;
      let bodyObj: unknown;

      if (typeof raw === "string") {
        try {
          bodyObj = JSON.parse(raw);
        } catch (e) {
          return reply.code(400).send({
            success: false,
            message: "Invalid JSON body",
            error: (e as Error).message,
          });
        }
      } else {
        bodyObj = raw;
      }

      const validatedData = AddReviewSchema.parse(bodyObj);
      const movie = await this.movieService.addReview(id, validatedData);
      return reply.code(201).send({
        success: true,
        message: "Review added successfully",
        data: movie,
      });
    } catch (error: any) {
      return reply.code(400).send({
        success: false,
        message: error.message || "Error adding review",
        error: error,
      });
    }
  };

  getMovieReviews = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id } = req.params as { id: string };
      const reviews = await this.movieService.getMovieReviews(id);
      return reply.code(200).send({
        success: true,
        message: "Reviews fetched successfully",
        data: reviews,
      });
    } catch (error: any) {
      return reply.code(404).send({
        success: false,
        message: error.message || "Error fetching reviews",
        error: error,
      });
    }
  };
}
