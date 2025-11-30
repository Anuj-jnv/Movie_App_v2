import { MovieModel } from "../models/movie.model.js";
import {
  CreateMovieRequest,
  UpdateMovieRequest,
  AddReviewRequest,
} from "../schemas/movie.schema.js";

export class MovieService {
  async getAllMovies() {
    try {
      return await MovieModel.find({})
        .populate("genre", "name")
        .populate("reviews.user", "username email");
    } catch (error) {
      throw new Error(`Error fetching movies: ${error}`);
    }
  }

  async getMovieById(id: string) {
    try {
      const movie = await MovieModel.findById(id)
        .populate("genre", "name")
        .populate("reviews.user", "username email");
      if (!movie) {
        throw new Error("Movie not found");
      }
      return movie;
    } catch (error) {
      throw new Error(`Error fetching movie: ${error}`);
    }
  }

  async createMovie(data: CreateMovieRequest) {
    try {
      const movie = await MovieModel.create(data);
      return await movie.populate("genre", "name");
    } catch (error) {
      throw new Error(`Error creating movie: ${error}`);
    }
  }

  async updateMovie(id: string, data: UpdateMovieRequest) {
    try {
      const movie = await MovieModel.findByIdAndUpdate(id, data, { new: true })
        .populate("genre", "name")
        .populate("reviews.user", "username email");
      if (!movie) {
        throw new Error("Movie not found");
      }
      return movie;
    } catch (error) {
      throw new Error(`Error updating movie: ${error}`);
    }
  }

  async deleteMovie(id: string) {
    try {
      const movie = await MovieModel.findByIdAndDelete(id);
      if (!movie) {
        throw new Error("Movie not found");
      }
      return movie;
    } catch (error) {
      throw new Error(`Error deleting movie: ${error}`);
    }
  }

  async addReview(movieId: string, reviewData: AddReviewRequest) {
    try {
      const movie = await MovieModel.findById(movieId);
      if (!movie) {
        throw new Error("Movie not found");
      }
      movie.reviews.push(reviewData as any);
      movie.numReviews = movie.reviews.length;
      await movie.save();
      return await movie.populate("reviews.user", "username email");
    } catch (error) {
      throw new Error(`Error adding review: ${error}`);
    }
  }

  async getMovieReviews(movieId: string) {
    try {
      const movie = await MovieModel.findById(movieId).populate(
        "reviews.user",
        "username email"
      );
      if (!movie) {
        throw new Error("Movie not found");
      }
      return movie.reviews;
    } catch (error) {
      throw new Error(`Error fetching reviews: ${error}`);
    }
  }
}
