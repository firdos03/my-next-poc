import mongoose, { Schema, Document } from "mongoose";

export interface SkillType extends Document {
  userId: string;
  name: string;
  percentage: number;
}

const SkillSchema: Schema = new Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    percentage: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Skill ||
  mongoose.model<SkillType>("Skill", SkillSchema);
