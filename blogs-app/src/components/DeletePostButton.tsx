'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner'; 
export default function DeletePostButton({ postId }: { postId: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    
    if (!confirmDelete) return;

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/blogs/${postId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Уведомление об успешном удалении
        toast.success('Post deleted successfully!');
        // Перенаправление на страницу со всеми блогами после успешного удаления
        router.push('/blogs');
      } else {
        // Обработка ошибок
        const data = await response.json();
        console.error('Delete error:', data);
        toast.error(data.message || 'Failed to delete post'); // Уведомление об ошибке
      }
    } catch (error) {
      console.error('Delete post error:', error);
      toast.error('An unexpected error occurred'); // Уведомление об ошибке
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button 
      onClick={handleDelete} 
      disabled={isDeleting}
      className="text-red-500 hover:text-red-700 disabled:opacity-50"
    >
      <Trash2 className="w-6 h-6" />
    </button>
  );
}