import mongoose, { Document, Schema } from "mongoose";

export type ApplicationType = "trainer" | "franchise";
export type ApplicationStatus = "new" | "reviewed" | "shortlisted" | "rejected" | "onboarded";

export interface IApplication extends Document {
  type: ApplicationType;
  name: string;
  email: string;
  phone: string;
  status: ApplicationStatus;
  
  // Trainer fields
  technology?: string;
  experience?: string;
  currentCompany?: string;
  mode?: string;
  linkedin?: string;
  message?: string;
  
  // Franchise fields
  city?: string;
  state?: string;
  capital?: string;
  space?: string;
  background?: string;
  
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ApplicationSchema = new Schema<IApplication>(
  {
    type: { 
      type: String, 
      enum: ["trainer", "franchise"], 
      required: true 
    },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    status: { 
      type: String, 
      enum: ["new", "reviewed", "shortlisted", "rejected", "onboarded"], 
      default: "new" 
    },
    
    // Trainer fields
    technology: { type: String, default: "" },
    experience: { type: String, default: "" },
    currentCompany: { type: String, default: "" },
    mode: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    message: { type: String, default: "" },
    
    // Franchise fields
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    capital: { type: String, default: "" },
    space: { type: String, default: "" },
    background: { type: String, default: "" },
    
    notes: { type: String, default: "" }
  },
  { timestamps: true }
);

export const Application = mongoose.model<IApplication>("Application", ApplicationSchema);
