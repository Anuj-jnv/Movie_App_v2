import { z } from "zod";

// Request Schemas
export const CreateUserSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username must not exceed 50 characters")
    .trim(),
  email: z
    .string()
    .email("Invalid email format")
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must not exceed 100 characters"),
  isAdmin: z.boolean().default(false),
});

export const UpdateUserSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username must not exceed 50 characters")
    .trim()
    .optional(),
  email: z
    .string()
    .email("Invalid email format")
    .toLowerCase()
    .trim()
    .optional(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must not exceed 100 characters")
    .optional(),
  isAdmin: z.boolean().optional(),
});

export const UserLoginSchema = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .toLowerCase()
    .trim(),
  password: z.string().min(1, "Password is required"),
});

// Response Schemas
export const UserResponseSchema = z.object({
  _id: z.string(),
  username: z.string(),
  email: z.string(),
  isAdmin: z.boolean(),
  createdAt: z.date().or(z.string()),
  updatedAt: z.date().or(z.string()),
});

export const UserListResponseSchema = z.array(UserResponseSchema);

export const ErrorResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  error: z.any().optional(),
});

export const SuccessResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.any().optional(),
});

// Type exports
export type CreateUserRequest = z.infer<typeof CreateUserSchema>;
export type UpdateUserRequest = z.infer<typeof UpdateUserSchema>;
export type UserLoginRequest = z.infer<typeof UserLoginSchema>;
export type UserResponse = z.infer<typeof UserResponseSchema>;
export type UserListResponse = z.infer<typeof UserListResponseSchema>;
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
export type SuccessResponse = z.infer<typeof SuccessResponseSchema>;