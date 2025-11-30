import { FastifyReply, FastifyRequest } from "fastify";
import { GenreService } from "../services/genre.service.js";
import {
  CreateGenreSchema,
  UpdateGenreSchema,
} from "../schemas/genre.schema.js";

export class GenreController {
  private genreService = new GenreService();

  getAllGenres = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const genres = await this.genreService.getAllGenres();
      return reply.code(200).send({
        success: true,
        message: "Genres fetched successfully",
        data: genres,
      });
    } catch (error: any) {
      return reply.code(500).send({
        success: false,
        message: error.message || "Error fetching genres",
        error: error,
      });
    }
  };

  getGenreById = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id } = req.params as { id: string };
      const genre = await this.genreService.getGenreById(id);
      return reply.code(200).send({
        success: true,
        message: "Genre fetched successfully",
        data: genre,
      });
    } catch (error: any) {
      return reply.code(404).send({
        success: false,
        message: error.message || "Genre not found",
        error: error,
      });
    }
  };

  createGenre = async (req: FastifyRequest, reply: FastifyReply) => {
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
            error: e,
          });
        }
      } else {
        bodyObj = raw;
      }

      const validatedData = CreateGenreSchema.parse(bodyObj);
      const genre = await this.genreService.createGenre(validatedData);
      return reply.code(201).send({
        success: true,
        message: "Genre created successfully",
        data: genre,
      });
    } catch (error: any) {
      return reply.code(400).send({
        success: false,
        message: error.message || "Error creating genre",
        error: error,
      });
    }
  };

  updateGenre = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id } = req.params as { id: string };
      const validatedData = UpdateGenreSchema.parse(req.body);
      const genre = await this.genreService.updateGenre(id, validatedData);
      return reply.code(200).send({
        success: true,
        message: "Genre updated successfully",
        data: genre,
      });
    } catch (error: any) {
      return reply.code(400).send({
        success: false,
        message: error.message || "Error updating genre",
        error: error,
      });
    }
  };

  deleteGenre = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id } = req.params as { id: string };
      await this.genreService.deleteGenre(id);
      return reply.code(200).send({
        success: true,
        message: "Genre deleted successfully",
      });
    } catch (error: any) {
      return reply.code(404).send({
        success: false,
        message: error.message || "Error deleting genre",
        error: error,
      });
    }
  };
}