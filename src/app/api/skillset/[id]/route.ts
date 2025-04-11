import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/app/lib/db";
import SkillSet from "@/app/models/SkillSet";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret";

const getUserIdFromToken = (req: NextRequest): string | null => {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.split(" ")[1];
  if (!token) return null;

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    return decoded?.id || decoded?.userId || null;
  } catch (err) {
    console.log("JWT Error:", err);
    return null;
  }
};

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const userId = getUserIdFromToken(req);
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const skillId = params.id;

  try {
    const deleted = await SkillSet.findOneAndDelete({ _id: skillId, userId });
    if (!deleted) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Skill deleted", skill: deleted });
  } catch (err) {
    console.error("DELETE error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
