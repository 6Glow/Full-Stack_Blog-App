'use server'

import { revalidatePath } from 'next/cache'
import {prisma} from './db'

export async function toggleLike(postId: string, userEmail: string) {
  try {
    const existingLike = await prisma.like.findUnique({
      where: {
        authorEmail_postId: {
          authorEmail: userEmail,
          postId: postId,
        },
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
    } else {
      await prisma.like.create({
        data: {
          authorEmail: userEmail,
          postId: postId,
        },
      });
    }

    // Обновляем все страницы, где отображаются посты
    revalidatePath('/blogs');
    revalidatePath(`/blogs/${postId}`);
    
    return !existingLike;
  } catch (error) {
    console.error('Error toggling like:', error);
    return null;
  }
} 