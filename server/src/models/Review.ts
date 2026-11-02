import mongoose, { Document, Schema } from "mongoose";

export interface IReview extends Document {
  name: string;
  role: string;
  company: string;
  rating: number;
  reviewText: string;
  course: string;
  avatar?: string;
  hike?: string;
  packageLpa?: string;
  isApproved: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5, default: 5 },
    reviewText: { type: String, required: true },
    course: { type: String, required: true },
    avatar: { type: String, default: "" },
    hike: { type: String, default: "" },
    packageLpa: { type: String, default: "" },
    isApproved: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const Review = mongoose.model<IReview>("Review", ReviewSchema);
