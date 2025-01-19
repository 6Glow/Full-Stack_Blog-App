import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user?.email) {
      return NextResponse.json({ message: "Not Authenticated" }, { status: 401 });
    }

    const { title, content } = await req.json();

    // Валидация входных данных
    if (!title || !content) {
      return NextResponse.json(
        { message: "Title and content are required" }, 
        { status: 400 }
      );
    }

    const newPost = await prisma.post.create({
      data: {
        title, 
        content, 
        authorEmail: user.email
      }
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('Post creation error:', error);
    return NextResponse.json(
      { 
        message: "Something went wrong", 
        error: error instanceof Error ? error.message : String(error)
      }, 
      { status: 500 }
    );
  }
}