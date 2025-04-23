import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    fullName: { type: String, required: true },
    location: { type: String, required: true },
    designation: { type: String, required: true },
    mobileNumber: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.UserProfile ||
  mongoose.model("UserProfile", userProfileSchema);
