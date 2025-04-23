import connectDB from "@/app/lib/db";
import Education from "@/app/models/Education";
import Experience from "@/app/models/Experience";
import SkillSet from "@/app/models/SkillSet";
import UserProfile from "@/app/models/UserProfile";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const userId: any = searchParams.get("userId");
  const objectId = new mongoose.Types.ObjectId(userId);

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const [profile, experiences, education, skills] = await Promise.all([
      UserProfile.findOne({ userId: objectId }).lean(),
      Experience.find({ userId: objectId }).lean(),
      Education.find({ userId: objectId }).lean(),
      SkillSet.find({ userId: objectId }).lean(),
    ]);

    return NextResponse.json({
      profile,
      experiences,
      education,
      skills,
    });
  } catch (err) {
    console.error("Error fetching full profile:", err);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
