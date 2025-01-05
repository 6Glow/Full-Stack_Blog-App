import { prisma } from '@/lib/db';
import { format } from 'date-fns';
import { FC } from 'react';
import { getCurrentUser } from '@/lib/session';

interface CommentsProps {
  postId: string;
}

const Comments: FC<CommentsProps> = async ({ postId }) => {
  const currentUser = await getCurrentUser();
  const comments = await prisma.comment.findMany({
    where: {
      postId,
    },
    include: {
      author: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold">Comments</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id} className="mb-4 bg-slate-300 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="text-blue-500 font-bold">
                  {comment.author?.name}
                </div>
                <div className="text-gray-500 text-sm">
                  {format(comment.createdAt, 'MMM d, yyyy')}
                </div>
              </div>
            </div>
            <p className="text-gray-700">{comment.text}</p>
          </li>
        ))}
      </ul>
      {comments.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No comments yet.</p>
      )}
    </div>
  );
};

export default Comments;