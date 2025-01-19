'use client';

import { FormData } from '@/types/blog';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';
import ReactTextareaAutosize from 'react-textarea-autosize';
import { toast } from 'sonner';

const inputClass =
  'w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300';

const FormNewPost = () => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '',
  });
  const { data } = useSession();
  const router = useRouter();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Валидация входных данных
    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error('Title and content are required');
      return;
    }

    try {
      const response = await axios.post('/api/blogs', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        toast.success('Post created successfully!');
        // Перенаправление на страницу со всеми блогами
        router.push('/blogs');
      } else {
        toast.error('Failed to create post');
      }
    } catch (error) {
      console.error('Post creation error:', error);
      toast.error('An unexpected error occurred');
    }
  };

  return (
    <form className='max-w-md mx-auto p-4' onSubmit={handleSubmit}>
      <div className='mb-4'>
        <input
          type='text'
          className={inputClass}
          placeholder='Enter the title'
          name='title'
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className='mb-4'>
        <ReactTextareaAutosize
          minRows={5}
          name='content'
          className={inputClass}
          placeholder='Enter the content'
          value={formData.content}
          onChange={handleChange}
          required
        />
      </div>
      <button
        disabled={!data?.user?.email}
        type='submit'
        className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-300 w-full disabled:bg-gray-400'
      >
        Submit
      </button>
    </form>
  );
};

export default FormNewPost;