import mongoose, { Document, Schema } from "mongoose";

export type TicketPriority = "Low" | "Normal" | "High" | "Urgent";
export type TicketStatus = "Open" | "In Progress" | "Resolved" | "Closed";

export interface ISupportTicket extends Document {
  ticketNumber: string;
  name: string;
  email: string;
  phone?: string;
  studentId?: string;
  category: string;
  priority: TicketPriority;
  description: string;
  status: TicketStatus;
  responseNotes?: string;
  resolvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const SupportTicketSchema = new Schema<ISupportTicket>(
  {
    ticketNumber: { type: String, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, default: "" },
    studentId: { type: String, default: "" },
    category: { type: String, default: "Batch Timing & Schedule" },
    priority: { 
      type: String, 
      enum: ["Low", "Normal", "High", "Urgent"], 
      default: "Normal" 
    },
    description: { type: String, required: true },
    status: { 
      type: String, 
      enum: ["Open", "In Progress", "Resolved", "Closed"], 
      default: "Open" 
    },
    responseNotes: { type: String, default: "" },
    resolvedAt: { type: Date }
  },
  { timestamps: true }
);

export const SupportTicket = mongoose.model<ISupportTicket>("SupportTicket", SupportTicketSchema);
