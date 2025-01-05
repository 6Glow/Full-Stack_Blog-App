import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const user = await getCurrentUser();

    if (!user?.email) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    const existingLike = await prisma.like.findUnique({
      where: {
        authorEmail_postId: {
          authorEmail: user.email,
          postId: params.postId,
        },
      },
    });

    if (existingLike) {
      // Если лайк существует - удаляем его
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
      return NextResponse.json({ liked: false });
    }

    // Если лайка нет - создаем новый
    await prisma.like.create({
      data: {
        authorEmail: user.email,
        postId: params.postId,
      },
    });

    return NextResponse.json({ liked: true });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
} 