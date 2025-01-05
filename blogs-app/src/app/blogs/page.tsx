import { prisma } from "@/lib/db";
import Link from "next/link";
import { format } from 'date-fns';

const BlogsPage = async () => {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      author: true,
      likes: true,
    },
  });

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Blogs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {posts.map(post => (
          <Link 
            key={post.id} 
            href={`/blogs/${post.id}`} 
            className="bg-white p-4 rounded-md shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-bold mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-2">Written by: {post.author?.name}</p>
            <div className="text-sm text-gray-500">
              {format(new Date(post.createdAt), 'MMM d, yyyy')}
            </div>
            <div className="mt-2 text-blue-500">
              {post.likes.length} {post.likes.length === 1 ? 'like' : 'likes'}
            </div>
          </Link>
        ))}
      </div>
      {posts.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No blogs posted yet.</p>
      )}
    </div>
  );
};

export default BlogsPage;