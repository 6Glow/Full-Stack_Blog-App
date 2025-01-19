'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Post {
  id: string;
  title: string;
  content: string;
}

export default function EditPostForm({ post }: { post: Post }) {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Логирование отправляемых данных
      console.log('Submitting update:', { 
        postId: post.id, 
        title, 
        content 
      });

      const response = await fetch(`/api/blogs/${post.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      // Логирование ответа
      console.log('Response status:', response.status);

      // Получение текста ответа для диагностики
      const responseText = await response.text();
      console.log('Raw response:', responseText);

      // Попытка парсинга JSON
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('JSON parsing error:', parseError);
        throw new Error(`Invalid server response: ${responseText}`);
      }

      // Проверка успешности запроса
      if (response.ok) {
        // Перенаправление на страницу поста
        router.push(`/blogs/`);
        router.refresh();
      } else {
        // Обработка ошибок от сервера
        const errorMessage = data.message || 'Failed to update post';
        setError(errorMessage);
        alert(errorMessage);
      }
    } catch (error) {
      // Расширенная обработка ошибок
      console.error('Detailed update error:', error);
      
      if (error instanceof Error) {
        setError(error.message);
        alert(`Error: ${error.message}`);
      } else {
        setError('An unexpected error occurred');
        alert('An unexpected error occurred');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto py-8">
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          value ={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          rows={10}
          required
        />
      </div>
      
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 text-gray-600 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Updating...' : 'Update Post'}
        </button>
      </div>
    </form>
  );
}