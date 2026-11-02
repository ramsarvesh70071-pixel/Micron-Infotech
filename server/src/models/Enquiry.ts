import mongoose, { Document, Schema } from "mongoose";

export type EnquiryType = "enrollment" | "general" | "corporate";
export type EnquiryStatus = "new" | "contacted" | "in_progress" | "converted" | "closed";

export interface IEnquiry extends Document {
  name: string;
  email: string;
  phone: string;
  course?: string;
  mode?: string;
  branch?: string;
  comments?: string;
  type: EnquiryType;
  status: EnquiryStatus;
  companyName?: string;
  teamSize?: string;
  notes?: string;
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
}

const EnquirySchema = new Schema<IEnquiry>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    course: { type: String, default: "General Consultation" },
    mode: { type: String, default: "Classroom" },
    branch: { type: String, default: "BTM Layout" },
    comments: { type: String, default: "" },
    type: { 
      type: String, 
      enum: ["enrollment", "general", "corporate"], 
      default: "enrollment" 
    },
    status: { 
      type: String, 
      enum: ["new", "contacted", "in_progress", "converted", "closed"], 
      default: "new" 
    },
    companyName: { type: String, default: "" },
    teamSize: { type: String, default: "" },
    notes: { type: String, default: "" },
    assignedTo: { type: String, default: "" }
  },
  { timestamps: true }
);

export const Enquiry = mongoose.model<IEnquiry>("Enquiry", EnquirySchema);
