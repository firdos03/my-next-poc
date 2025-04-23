import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/app/lib/db";
import Experience from "@/app/models/Experience";

const JWT_SECRET = process.env.JWT_SECRET || "";

export async function POST(req: NextRequest) {
  await connectDB();

  const authHeader = req.headers.get("authorization");
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.log(err);
    
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const userId =
    typeof decodedToken === "object" && decodedToken !== null
      ? (decodedToken as jwt.JwtPayload).id ||
        (decodedToken as jwt.JwtPayload).sub
      : undefined;

  if (!userId) {
    return NextResponse.json(
      { error: "User ID missing in token" },
      { status: 401 }
    );
  }

  const body = await req.json();

  // Normalize to an array
  const experiences = Array.isArray(body) ? body : [body];

  const invalidEntry = experiences.find(
    (exp) => !exp.company || !exp.jobTitle || !exp.startDate
  );
  if (invalidEntry) {
    return NextResponse.json(
      {
        error: "Each experience must include company, jobTitle, and startDate",
      },
      { status: 400 }
    );
  }

  try {
    const experienceData = experiences.map((exp) => ({
      userId,
      company: exp.company,
      jobTitle: exp.jobTitle,
      location: exp.location,
      startDate: exp.startDate,
      endDate: exp.endDate,
      currentlyWorking: exp.currentlyWorking || false,
      description: exp.description,
    }));

    const createdExperiences = await Experience.insertMany(experienceData);

    return NextResponse.json({
      message: `${createdExperiences.length} experience(s) created`,
      experiences: createdExperiences,
    });
  } catch (err) {
    console.error("Bulk experience creation error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");  

  try {
    const experiences = userId
      ? await Experience.find({ userId })
      : await Experience.find();

    return NextResponse.json({ experiences });
  } catch (err) {
    console.error("Get experience error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
