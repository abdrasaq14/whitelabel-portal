"use client";
import CreateBlog from "@/components/blog/CreateBlog";

function BlogPage({ params }: any) {
  const { id } = params || {};
  return <CreateBlog id={id} />;
}

export default BlogPage;
