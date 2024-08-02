import Comments from "@/components/comments";
import FormComment from "@/components/formComment";
import prisma from "@/lib/db";

const BlogDetailPage =  () => {
  return (
    <div className="max-w-4-xl mx-auto py-8">
      <h1 className="text-3xl font-bold">Post one</h1>
      <p>Written by: Joe Doe</p>
      <div className="mt-4">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla, repellendus ut neque atque tempore alias magni fugiat voluptatum, nesciunt molestias maiores temporibus. Quisquam dicta assumenda ut adipisci recusandae animi saepe!

      </div>
      <Comments/>
      <FormComment />
    </div>
  )
}

export default BlogDetailPage;