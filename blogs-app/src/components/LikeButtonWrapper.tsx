'use client';

import LikeButton from "./LikeButton";

interface LikeButtonWrapperProps {
  postId: string;
  initialLikeCount: number;
  initialLikedByUser: boolean;
}

export default function LikeButtonWrapper({ 
  postId, 
  initialLikeCount, 
  initialLikedByUser 
}: LikeButtonWrapperProps) {
  return (
    <LikeButton 
      postId={postId}
      initialLikeCount={initialLikeCount}
      initialLikedByUser={initialLikedByUser}
    />
  );
}