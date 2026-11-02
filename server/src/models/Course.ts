import mongoose, { Document, Schema } from "mongoose";

export interface ICourseModule {
  title: string;
  topics: string[];
}

export interface ICourse extends Document {
  title: string;
  slug: string;
  category: string;
  badge?: string;
  rating: number;
  reviewsCount: number;
  duration: string;
  mode: string;
  price?: number;
  image?: string;
  syllabus: ICourseModule[];
  highlights: string[];
  popular: boolean;
  active: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const CourseModuleSchema = new Schema<ICourseModule>({
  title: { type: String, required: true },
  topics: [{ type: String, required: true }]
}, { _id: false });

const CourseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: { type: String, required: true, trim: true },
    badge: { type: String, default: "" },
    rating: { type: Number, default: 4.8, min: 1, max: 5 },
    reviewsCount: { type: Number, default: 120 },
    duration: { type: String, required: true },
    mode: { type: String, default: "Classroom & Online" },
    price: { type: Number, default: 24999 },
    image: { type: String, default: "" },
    syllabus: [CourseModuleSchema],
    highlights: [{ type: String }],
    popular: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const Course = mongoose.model<ICourse>("Course", CourseSchema);
