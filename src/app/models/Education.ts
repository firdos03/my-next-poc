import mongoose, { Schema, Document } from "mongoose";

export interface EducationType extends Document {
  userId: string;
  degree: string;
  institution: string;
  startDate: Date;
  endDate: Date;
  fieldOfStudy?: string;
  grade?: string;
  description?: string;
}

const EducationSchema: Schema = new Schema(
  {
    userId: { type: String, required: true },
    degree: { type: String, required: true },
    institution: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    fieldOfStudy: { type: String },
    grade: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Education ||
  mongoose.model<EducationType>("Education", EducationSchema);
