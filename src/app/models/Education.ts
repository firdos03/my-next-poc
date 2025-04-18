import { Schema, Document, models, model } from "mongoose";

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

const EducationSchema: Schema<EducationType> = new Schema(
  {
    userId: {
      type: String,
      ref: "User",
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
    institution: {
      type: String,
      required: true,
    },
    fieldOfStudy: {
      type: String,
      default: "",
    },
    grade: {
      type: String,
      default: "",
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default models.Education ||
  model<EducationType>("Education", EducationSchema);
