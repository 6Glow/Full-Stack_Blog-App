import { prisma } from "@/lib/db";
import { getCurrentUser  } from "@/lib/session";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: { postId: string } }) {
  const user = await getCurrentUser ();
  const { title, content } = await req.json();

  if (!user?.email) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  const post = await prisma.post.findUnique({
    where: { id: params.postId },
  });

  if (!post || post.authorEmail !== user.email) {
    return NextResponse.json({ message: "Not authorized" }, { status: 403 });
  }

  const updatedPost = await prisma.post.update({
    where: { id: params.postId },
    data: { title, content },
  });

  return NextResponse.json(updatedPost, { status: 200 });
}

export async function DELETE(req: Request, { params }: { params: { postId: string } }) {
  const user = await getCurrentUser ();

  if (!user?.email) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  const post = await prisma.post.findUnique({
    where: { id: params.postId },
  });

  if (!post || post.authorEmail !== user.email) {
    return NextResponse.json({ message: "Not authorized" }, { status: 403 });
  }

  await prisma.post.delete({
    where: { id: params.postId },
  });

  return NextResponse.json({ message: "Post deleted" }, { status: 200 });
}