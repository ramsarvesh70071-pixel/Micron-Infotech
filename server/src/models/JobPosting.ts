import mongoose, { Document, Schema } from "mongoose";

export type JobStatus = "active" | "review" | "filled" | "expired";

export interface IJobPosting extends Document {
  companyName: string;
  recruiterName: string;
  officialEmail: string;
  phone: string;
  jobTitle: string;
  openings: string;
  experience: string;
  ctcRange: string;
  skills: string;
  location: string;
  description: string;
  status: JobStatus;
  createdAt: Date;
  updatedAt: Date;
}

const JobPostingSchema = new Schema<IJobPosting>(
  {
    companyName: { type: String, required: true, trim: true },
    recruiterName: { type: String, required: true, trim: true },
    officialEmail: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    jobTitle: { type: String, required: true, trim: true },
    openings: { type: String, default: "1-3 Positions" },
    experience: { type: String, default: "Freshers (0 - 1 Year)" },
    ctcRange: { type: String, default: "4 - 7 LPA" },
    skills: { type: String, required: true },
    location: { type: String, default: "Bangalore" },
    description: { type: String, default: "" },
    status: { 
      type: String, 
      enum: ["active", "review", "filled", "expired"], 
      default: "review" 
    }
  },
  { timestamps: true }
);

export const JobPosting = mongoose.model<IJobPosting>("JobPosting", JobPostingSchema);
