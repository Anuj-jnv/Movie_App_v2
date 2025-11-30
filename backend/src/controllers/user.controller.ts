import { FastifyReply, FastifyRequest } from "fastify";
import { UserService } from "../services/user.service.js";
import { CreateUserSchema, UpdateUserSchema } from "../schemas/user.schema.js";

export class UserController {
  private userService = new UserService();

  getAllUsers = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const users = await this.userService.getAllUsers();
      return reply.code(200).send({
        success: true,
        message: "Users fetched successfully",
        data: users,
      });
    } catch (error: any) {
      return reply.code(500).send({
        success: false,
        message: error.message || "Error fetching users",
        error: error,
      });
    }
  };

  getUserById = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id } = req.params as { id: string };
      const user = await this.userService.getUserById(id);
      return reply.code(200).send({
        success: true,
        message: "User fetched successfully",
        data: user,
      });
    } catch (error: any) {
      return reply.code(404).send({
        success: false,
        message: error.message || "User not found",
        error: error,
      });
    }
  };

  createUser = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const validatedData = CreateUserSchema.parse(req.body);
      const user = await this.userService.createUser(validatedData);
      return reply.code(201).send({
        success: true,
        message: "User created successfully",
        data: user,
      });
    } catch (error: any) {
      return reply.code(400).send({
        success: false,
        message: error.message || "Error creating user",
        error: error,
      });
    }
  };

  updateUser = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id } = req.params as { id: string };
      const validatedData = UpdateUserSchema.parse(req.body);
      const user = await this.userService.updateUser(id, validatedData);
      return reply.code(200).send({
        success: true,
        message: "User updated successfully",
        data: user,
      });
    } catch (error: any) {
      return reply.code(400).send({
        success: false,
        message: error.message || "Error updating user",
        error: error,
      });
    }
  };

  deleteUser = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id } = req.params as { id: string };
      await this.userService.deleteUser(id);
      return reply.code(200).send({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error: any) {
      return reply.code(404).send({
        success: false,
        message: error.message || "Error deleting user",
        error: error,
      });
    }
  };
}