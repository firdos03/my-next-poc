import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import UserProfile from "@/app/models/UserProfile";
import jwt from "jsonwebtoken";

// Create or update user profile

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; // Replace with your real secret or load from env

export async function POST(req: NextRequest) {
  await connectDB();

  const authHeader = req.headers.get("authorization");
  const token = authHeader?.split(" ")[1];
  console.log("token", token);

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let decodedToken: any;
  try {
    decodedToken = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.error("JWT Verification Error:", err);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const userId = decodedToken?.id;

  if (!userId) {
    return NextResponse.json(
      { error: "Invalid token payload" },
      { status: 400 }
    );
  }

  const body = await req.json();
  const { fullName, profileImage, location, designation, mobileNumber } = body;

  if (!fullName) {
    return NextResponse.json(
      { error: "Full name is required" },
      { status: 400 }
    );
  }

  try {
    const updatedProfile = await UserProfile.findOneAndUpdate(
      { userId },
      {
        fullName,
        profileImage,
        location,
        designation,
        mobileNumber,
        userId,
      },
      { new: true, upsert: true }
    );

    return NextResponse.json({
      message: "Profile saved",
      profile: updatedProfile,
    });
  } catch (err) {
    console.error("Profile Save Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// Get user profile
export async function GET(req: NextRequest) {
  await connectDB();

  // const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.split(" ")[1];
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let decodedToken: any;
  try {
    decodedToken = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.error("JWT Verification Error:", err);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const userId = decodedToken?.id;

  try {
    const profile = await UserProfile.findOne({ userId });
    return NextResponse.json({ profile });
  } catch (err) {
    console.error("Profile Fetch Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
