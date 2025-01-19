import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import LikeButtonWrapper from "@/components/LikeButtonWrapper";
import Comments from "@/components/comments";
import FormComment from "@/components/formComment";
import Link from 'next/link';
import { Trash2, Edit } from 'lucide-react';
import DeletePostButton from "@/components/DeletePostButton";

const BlogDetailPage = async ({ params }: { params: { id: string } }) => {
  const user = await getCurrentUser();
  const post = await prisma.post.findUnique({
    where: { id: params.id },
    include: { 
      author: true, 
      likes: true 
    },
  });

  if (!post) {
    return <div>Post not found</div>;
  }

  const likeCount = post.likes.length;
  const isLikedByUser = post.likes.some(like => like.authorEmail === user?.email);
  const isAuthor = post.authorEmail === user?.email;

  return (
    <div className="max-w-4xl mx-auto py-8 relative">
      {isAuthor && (
        <div className="absolute top-0 right-0 flex space-x-2">
          <Link 
            href={`/blogs/${post.id}/edit`} 
            className="text-blue-500 hover:text-blue-700"
          >
            <Edit className="w-6 h-6" />
          </Link>
          <DeletePostButton postId={post.id} />
        </div>
      )}
      
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="text-gray-600 mb-4">
        Written by: {post.author?.name}
      </div>
      
      <div className="prose max-w-full">{post.content}</div>
      
      <div className="mt-6">
        <LikeButtonWrapper
          postId={post.id}
          initialLikeCount={likeCount}
          initialLikedByUser={isLikedByUser}
        />
      </div>

      <Comments postId={post.id} />
      <FormComment postId={post.id} />
    </div>
  );
};

export default BlogDetailPage;