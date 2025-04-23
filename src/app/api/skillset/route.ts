import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/app/lib/db";
import SkillSet from "@/app/models/SkillSet";

const JWT_SECRET = process.env.JWT_SECRET || "";

const getUserIdFromToken = (req: NextRequest): string | null => {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.split(" ")[1];

  if (!token) return null;

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    return decoded?.id || decoded?.userId || null;
  } catch (err) {
    console.error("JWT Error:", err);
    return null;
  }
};

export async function POST(req: NextRequest) {
  await connectDB();

  const body = await req.json();
  console.log("body", body);

  const { userId, skills } = body;

  if (!userId || !Array.isArray(skills) || skills.length === 0) {
    return NextResponse.json(
      { error: "userId and skills array are required" },
      { status: 400 }
    );
  }

  const skillsToInsert = skills.map((skill) => ({
    userId,
    name: skill.name,
    percentage: skill.percentage,
  }));

  try {
    const insertedSkills = await SkillSet.insertMany(skillsToInsert);
    console.log("insertedSkills---1", insertedSkills);

    return NextResponse.json({
      message: "Skills added successfully",
      skills: insertedSkills,
    });
  } catch (err) {
    console.error("POST error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  await connectDB();
  const userId = getUserIdFromToken(req);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const skills = await SkillSet.find({ userId }).sort({ createdAt: -1 });
    console.log("skills", skills);

    // You can return this directly, or map if you want to shape the object
    return NextResponse.json({ userId, skills });
  } catch (err) {
    console.error("GET error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
