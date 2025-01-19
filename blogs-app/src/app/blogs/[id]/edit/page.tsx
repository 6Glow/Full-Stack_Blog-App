import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { redirect } from 'next/navigation';
import EditPostForm from "@/components/EditPostForm";

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  
  const post = await prisma.post.findUnique({
    where: { id: params.id }
  });

  if (!post || post.authorEmail !== user?.email) {
    redirect('/blogs/');
  }

  return <EditPostForm post={post} />;
}