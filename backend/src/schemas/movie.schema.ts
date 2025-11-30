import { z } from "zod";

// Review Schemas
export const CreateReviewSchema = z.object({
  name: z
    .string()
    .min(2, "Review name must be at least 2 characters")
    .max(100, "Review name must not exceed 100 characters"),
  rating: z
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must not exceed 5"),
  comment: z
    .string()
    .min(5, "Comment must be at least 5 characters")
    .max(1000, "Comment must not exceed 1000 characters"),
  user: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid user ID format"),
});

export const ReviewResponseSchema = z.object({
  _id: z.string(),
  name: z.string(),
  rating: z.number(),
  comment: z.string(),
  user: z.string(),
  createdAt: z.date().or(z.string()),
  updatedAt: z.date().or(z.string()),
});

// Movie Request Schemas
export const CreateMovieSchema = z.object({
  name: z
    .string()
    .min(1, "Movie name is required")
    .max(200, "Movie name must not exceed 200 characters")
    .trim(),
  image: z.string().optional(),
  year: z
    .number()
    .min(1800, "Year must be at least 1800")
    .max(new Date().getFullYear() + 5, "Year cannot be in far future"),
  genre: z.string(),
  detail: z
    .string()
    .min(10, "Detail must be at least 10 characters")
    .max(2000, "Detail must not exceed 2000 characters"),
  cast: z
    .array(z.string().min(1, "Cast member name required"))
    .min(1, "At least one cast member is required"),
});

export const UpdateMovieSchema = z.object({
  name: z
    .string()
    .min(1, "Movie name is required")
    .max(200, "Movie name must not exceed 200 characters")
    .trim()
    .optional(),
  image: z.string().optional(),
  year: z
    .number()
    .min(1800, "Year must be at least 1800")
    .max(new Date().getFullYear() + 5, "Year cannot be in far future")
    .optional(),
  genre: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid genre ID format")
    .optional(),
  detail: z
    .string()
    .min(10, "Detail must be at least 10 characters")
    .max(2000, "Detail must not exceed 2000 characters")
    .optional(),
  cast: z
    .array(z.string().min(1, "Cast member name required"))
    .optional(),
});

export const AddReviewSchema = z.object({
  name: z
    .string()
    .min(2, "Review name must be at least 2 characters")
    .max(100, "Review name must not exceed 100 characters"),
  rating: z
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must not exceed 5"),
  comment: z
    .string()
    .min(5, "Comment must be at least 5 characters")
    .max(1000, "Comment must not exceed 1000 characters"),
  user: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid user ID format"),
});

// Movie Response Schemas
export const MovieResponseSchema = z.object({
  _id: z.string(),
  name: z.string(),
  image: z.string().optional(),
  year: z.number(),
  genre: z.string(),
  detail: z.string(),
  cast: z.array(z.string()),
  reviews: z.array(ReviewResponseSchema),
  numReviews: z.number(),
  createdAt: z.date().or(z.string()),
  updatedAt: z.date().or(z.string()),
});

export const MovieListResponseSchema = z.array(MovieResponseSchema);

// Type exports
export type CreateMovieRequest = z.infer<typeof CreateMovieSchema>;
export type UpdateMovieRequest = z.infer<typeof UpdateMovieSchema>;
export type CreateReviewRequest = z.infer<typeof CreateReviewSchema>;
export type AddReviewRequest = z.infer<typeof AddReviewSchema>;
export type ReviewResponse = z.infer<typeof ReviewResponseSchema>;
export type MovieResponse = z.infer<typeof MovieResponseSchema>;
export type MovieListResponse = z.infer<typeof MovieListResponseSchema>;