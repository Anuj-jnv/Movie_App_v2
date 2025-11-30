import mongoose, { Schema, Document, Types } from "mongoose";

export interface IReview {
  name: string;
  rating: number;
  comment: string;
  user: Types.ObjectId;
}

export interface IMovie extends Document {
  name: string;
  image?: string;
  year: number;
  genre: Types.ObjectId;
  detail: string;
  cast: string[];
  reviews: IReview[];
  numReviews: number;
  createdAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const MovieSchema = new Schema<IMovie>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
    },

    year: {
      type: Number,
      required: true,
    },

    genre: {
      type: Schema.Types.ObjectId,
      ref: "Genre",
      required: true,
    },

    detail: {
      type: String,
      required: true,
    },

    cast: [
      {
        type: String,
      },
    ],

    reviews: [ReviewSchema],

    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const MovieModel = mongoose.model<IMovie>("Movie", MovieSchema);
