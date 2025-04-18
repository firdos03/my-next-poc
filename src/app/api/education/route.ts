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
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    const educations = Array.isArray(body) ? body : [body];

    const invalidEntry = educations.find(
      (edu) => !edu.degree || !edu.institution || !edu.startDate || !edu.endDate
    );

    if (invalidEntry) {
      return NextResponse.json(
        { error: "Required fields missing in one or more entries" },
        { status: 400 }
      );
    }

    const entriesToInsert = educations.map((edu) => ({
      userId,
      degree: edu.degree,
      institution: edu.institution,
      startDate: edu.startDate,
      endDate: edu.endDate,
      fieldOfStudy: edu.fieldOfStudy || "",
      grade: edu.grade || "",
      description: edu.description || "",
    }));

    const savedEducations = await Education.insertMany(entriesToInsert);

    return NextResponse.json(
      { message: "Education entries added successfully", savedEducations },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST error:", error);
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
