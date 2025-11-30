import mongoose, { Schema, Document } from "mongoose";

export interface IGenre extends Document {
  name: string;
}

const GenreSchema = new Schema<IGenre>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxLength: 32,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export const GenreModel = mongoose.model<IGenre>("Genre", GenreSchema);
