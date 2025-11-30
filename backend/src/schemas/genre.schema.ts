import { z } from "zod";

// Genre Request Schemas
export const CreateGenreSchema = z.object({
  name: z
    .string()
    .min(1, "Genre name is required")
    .max(32, "Genre name must not exceed 32 characters")
    .trim(),
});

export const UpdateGenreSchema = z.object({
  name: z
    .string()
    .min(1, "Genre name is required")
    .max(32, "Genre name must not exceed 32 characters")
    .trim()
    .optional(),
});

// Genre Response Schema
export const GenreResponseSchema = z.object({
  _id: z.string(),
  name: z.string(),
  createdAt: z.date().or(z.string()),
  updatedAt: z.date().or(z.string()),
});

export const GenreListResponseSchema = z.array(GenreResponseSchema);

// Type exports
export type CreateGenreRequest = z.infer<typeof CreateGenreSchema>;
export type UpdateGenreRequest = z.infer<typeof UpdateGenreSchema>;
export type GenreResponse = z.infer<typeof GenreResponseSchema>;
export type GenreListResponse = z.infer<typeof GenreListResponseSchema>;