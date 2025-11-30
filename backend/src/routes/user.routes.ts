import { FastifyInstance } from "fastify";
import { UserController } from "../controllers/user.controller.js";

export async function userRoutes(app: FastifyInstance) {
  const userController = new UserController();

  app.post("/users", userController.createUser);

  app.get("/users", userController.getAllUsers);

  app.get("/users/:id", userController.getUserById);

  app.put("/users/:id", userController.updateUser);

  app.delete("/users/:id", userController.deleteUser);
}