import { GenreModel } from "../models/genre.model.js";
import {
  CreateGenreRequest,
  UpdateGenreRequest,
} from "../schemas/genre.schema.js";

export class GenreService {
  async getAllGenres() {
    try {
      return await GenreModel.find({}).sort({ createdAt: -1 });
    } catch (error) {
      throw new Error(`Error fetching genres: ${error}`);
    }
  }

  async getGenreById(id: string) {
    try {
      const genre = await GenreModel.findById(id);
      if (!genre) {
        throw new Error("Genre not found");
      }
      return genre;
    } catch (error) {
      throw new Error(`Error fetching genre: ${error}`);
    }
  }

  async createGenre(data: CreateGenreRequest) {
    try {
      const existingGenre = await GenreModel.findOne({
        name: data.name.toLowerCase(),
      });
      if (existingGenre) {
        throw new Error("Genre already exists");
      }
      return await GenreModel.create(data);
    } catch (error) {
      throw new Error(`Error creating genre: ${error}`);
    }
  }

  async updateGenre(id: string, data: UpdateGenreRequest) {
    try {
      if (data.name) {
        const existingGenre = await GenreModel.findOne({
          name: data.name.toLowerCase(),
          _id: { $ne: id },
        });
        if (existingGenre) {
          throw new Error("Genre name already exists");
        }
      }

      const genre = await GenreModel.findByIdAndUpdate(id, data, {
        new: true,
      });
      if (!genre) {
        throw new Error("Genre not found");
      }
      return genre;
    } catch (error) {
      throw new Error(`Error updating genre: ${error}`);
    }
  }

  async deleteGenre(id: string) {
    try {
      const genre = await GenreModel.findByIdAndDelete(id);
      if (!genre) {
        throw new Error("Genre not found");
      }
      return genre;
    } catch (error) {
      throw new Error(`Error deleting genre: ${error}`);
    }
  }
}