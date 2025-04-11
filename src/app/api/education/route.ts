import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/app/lib/db";
import Education from "@/app/models/Education";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret";
const getUserIdFromToken = (req: NextRequest): string | null => {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.split(" ")[1];

  if (!token) return null;

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    return decoded?.id || decoded?.userId || null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export async function POST(req: NextRequest) {
  await connectDB();

  const userId = getUserIdFromToken(req);
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const {
    degree,
    institution,
    startDate,
    endDate,
    fieldOfStudy,
    grade,
    description,
  } = body;

  if (!degree || !institution || !startDate || !endDate) {
    return NextResponse.json(
      { error: "Required fields missing" },
      { status: 400 }
    );
  }

  try {
    const education = await Education.create({
      userId,
      degree,
      institution,
      startDate,
      endDate,
      fieldOfStudy,
      grade,
      description,
    });

    return NextResponse.json({ message: "Education added", education });
  } catch (err) {
    console.error("POST error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  await connectDB();

  const userId = getUserIdFromToken(req);
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const educations = await Education.find({ userId }).sort({ startDate: -1 });
    return NextResponse.json({ educations });
  } catch (err) {
    console.error("GET error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
