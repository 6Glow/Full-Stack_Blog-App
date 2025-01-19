import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";


export async function GET(
  request: NextRequest, 
  { params }: { params: { postId: string } }
) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: params.postId },
      include: {
        author: true,
        comments: true,
        likes: true
      }
    });

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error('Get post error:', error);
    return NextResponse.json(
      { 
        message: "Internal Server Error", 
        error: error instanceof Error ? error.message : String(error)
      }, 
      { status: 500 }
    );
  }
}


export async function PUT(
  request: NextRequest, 
  { params }: { params: { postId: string } }
) {
  try {
    const user = await getCurrentUser();

    if (!user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, content } = body;


    if (!title || !content) {
      return NextResponse.json(
        { message: "Title and content are required" }, 
        { status: 400 }
      );
    }


    const existingPost = await prisma.post.findUnique({
      where: { id: params.postId }
    });

    if (!existingPost) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }


    if (existingPost.authorEmail !== user.email) {
      return NextResponse.json(
        { message: "Not authorized to edit this post" }, 
        { status: 403 }
      );
    }


    const updatedPost = await prisma.post.update({
      where: { id: params.postId },
      data: { title, content }
    });

    return NextResponse.json(updatedPost, { status: 200 });

  } catch (error) {
    console.error('Update post error:', error);
    return NextResponse.json(
      { 
        message: "Internal Server Error", 
        error: error instanceof Error ? error.message : String(error)
      }, 
      { status: 500 }
    );
  }
}


export async function DELETE(
  request: NextRequest, 
  { params }: { params: { postId: string } }
) {
  try {
    const user = await getCurrentUser();

    if (!user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }


    const existingPost = await prisma.post.findUnique({
      where: { id: params.postId }
    });

    if (!existingPost) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }


    if (existingPost.authorEmail !== user.email) {
      return NextResponse.json(
        { message: "Not authorized to delete this post" }, 
        { status: 403 }
      );
    }


    await prisma.post.delete({
      where: { id: params.postId }
    });

    return NextResponse.json(
      { message: "Post deleted successfully" }, 
      { status: 200 }
    );

  } catch (error) {
    console.error('Delete post error:', error);
    return NextResponse.json(
      { 
        message: "Internal Server Error", 
        error: error instanceof Error ? error.message : String(error)
      }, 
      { status: 500 }
    );
  }
}