'use client';

import { useSession } from 'next-auth/react';
import { FC, useState } from 'react';
import axios from 'axios';

interface LikeButtonProps {
  postId: string;
  initialLikeCount: number;
  initialLikedByUser: boolean;
}

const LikeButton: FC<LikeButtonProps> = ({
  postId,
  initialLikeCount,
  initialLikedByUser ,
}) => {
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [isLiked, setIsLiked] = useState(initialLikedByUser );
  const { data: session } = useSession();

  const handleLike = async () => {
    if (!session?.user) return;

    try {
      const response = await axios.post(`/api/likes`, { postId });
      if (response.data.liked) {
        setLikeCount((prev) => prev + 1);
        setIsLiked(true);
      } else {
        setLikeCount((prev) => prev - 1);
        setIsLiked(false);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={!session?.user}
      className={`flex items-center space-x-2 ${
        isLiked ? 'text-blue-500' : 'text-gray-500'
      } ${!session?.user ? 'cursor-not-allowed opacity-50' : 'hover:text-blue-600'}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill={isLiked ? 'currentColor' : 'none'}
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
      <span>{likeCount}</span>
    </button>
  );
};

export default LikeButton;