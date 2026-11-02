import mongoose, { Document, Schema } from "mongoose";

export interface IBranch extends Document {
  name: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  googleMapsUrl?: string;
  timings: string;
  isHeadquarter: boolean;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BranchSchema = new Schema<IBranch>(
  {
    name: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    googleMapsUrl: { type: String, default: "" },
    timings: { type: String, default: "Mon - Sat: 8:00 AM - 8:30 PM | Sunday: 9:00 AM - 6:00 PM" },
    isHeadquarter: { type: Boolean, default: false },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const Branch = mongoose.model<IBranch>("Branch", BranchSchema);
