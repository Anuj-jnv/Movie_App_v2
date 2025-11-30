import { UserModel } from "../models/user.model.js";
import { CreateUserRequest, UpdateUserRequest } from "../schemas/user.schema.js";

export class UserService {
  async getAllUsers() {
    try {
      return await UserModel.find({}).select("-password");
    } catch (error) {
      throw new Error(`Error fetching users: ${error}`);
    }
  }

  async getUserById(id: string) {
    try {
      const user = await UserModel.findById(id).select("-password");
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw new Error(`Error fetching user: ${error}`);
    }
  }

  async createUser(data: CreateUserRequest) {
    try {
      const existingUser = await UserModel.findOne({ email: data.email });
      if (existingUser) {
        throw new Error("Email already exists");
      }
      const user = await UserModel.create(data);
      const userObject = user.toObject();
      delete (userObject as Partial<typeof userObject>).password;
      return userObject;
    } catch (error) {
      throw new Error(`Error creating user: ${error}`);
    }
  }

 async updateUser(id: string, data: UpdateUserRequest) {
  try {
    // Check if email already exists for another user
    if (data.email) {
      const existingUser = await UserModel.findOne({
        email: data.email,
        _id: { $ne: id }
      });

      if (existingUser) {
        throw new Error("Email already exists");
      }
    }

    // Update user
    const user = await UserModel
      .findByIdAndUpdate(id, data, { new: true })
      .select("-password");

    if (!user) {
      throw new Error("User not found");
    }

    return user;

  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(message);
  }
}


  async deleteUser(id: string) {
    try {
      const user = await UserModel.findByIdAndDelete(id);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw new Error(`Error deleting user: ${error}`);
    }
  }
}