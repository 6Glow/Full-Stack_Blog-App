import { prisma } from "@/lib/db";
import { getCurrentUser  } from "@/lib/session";
import LikeButtonWrapper from "@/components/LikeButtonWrapper";
import Comments from "@/components/comments";
import FormComment from "@/components/formComment";
import { FC } from 'react';

const BlogDetailPage: FC<{ params: { id: string } }> = async ({ params }) => {
  const user = await getCurrentUser ();
  const post = await prisma.post.findFirst({
    where: { id: params.id },
    include: { author: true, likes: true },
  });

  const likeCount = post?.likes.length ?? 0;
  const isLikedByUser  = post?.likes.some(like => like.authorEmail === user?.email) ?? false;

  return (
    <div className="max-w-4-xl mx-auto py-8">
      <h1 className="text-3xl font-bold">{post?.title}</h1>
      <p>Written by: {post?.author?.name}</p>
      <div className="mt-4">{post?.content}</div>
      
      <div className="mt-4">
        <LikeButtonWrapper
          postId={params.id}
          initialLikeCount={likeCount}
          initialLikedByUser ={isLikedByUser }
        />
      </div>

      <Comments postId={params.id}/>
      <FormComment postId={params.id}/>
    </div>
  );
};

export default BlogDetailPage;