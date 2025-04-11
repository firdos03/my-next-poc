import { Schema, Document, model, models } from "mongoose";

export interface IExperience extends Document {
  userId: string;
  company: string;
  jobTitle: string;
  location?: string;
  startDate: Date;
  endDate?: Date;
  currentlyWorking: boolean;
  description?: string;
}

const ExperienceSchema: Schema<IExperience> = new Schema(
  {
    userId: {
      type: String,
      ref: "User",
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    currentlyWorking: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Experience ||
  model<IExperience>("Experience", ExperienceSchema);
