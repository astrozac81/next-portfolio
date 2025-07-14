"use client";

import { usePosts } from "@/hooks/use-posts";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { RelatedPosts } from "@/components/blog/related-posts";
import { SocialShare } from "@/components/blog/social-share";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { Comments } from "@/components/blog/comments";

interface PostPageProps {
  params: {
    slug: string;
  };
}

export default function PostPage({ params }: PostPageProps) {
  const { data: posts, isLoading, error } = usePosts();
  const post = posts?.find((p) => p.slug === params.slug);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !post) {
    notFound();
  }

  return (
    <>
      <ReadingProgress />
      <div className="container py-8">
        <div className="flex items-center mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="prose prose-lg dark:prose-invert"
          >
            {post.image && (
              <div className="aspect-video overflow-hidden rounded-lg mb-8">
                <img
                  src={post.image}
                  alt={post.title}
                  className="object-cover w-full h-full"
                />
              </div>
            )}

            <header className="space-y-4 mb-8">
              <h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  {post.author.image && (
                    <img
                      src={post.author.image}
                      alt={post.author.name}
                      className="w-6 h-6 rounded-full"
                    />
                  )}
                  <span>{post.author.name}</span>
                </div>
                <span>•</span>
                <time dateTime={post.date}>
                  {format(new Date(post.date), "MMMM d, yyyy")}
                </time>
                <span>•</span>
                <span>{post.readingTime} min read</span>
              </div>

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-sm bg-primary/10 text-primary rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <SocialShare
                url={`${window.location.origin}/blog/${post.slug}`}
                title={post.title}
              />
            </header>

            <div className="markdown-content">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
          </motion.article>

          <aside className="hidden lg:block">
            <TableOfContents content={post.content} />
          </aside>
        </div>

        {posts && <RelatedPosts currentPost={post} posts={posts} />}
        <Comments slug={post.slug} />
      </div>
    </>
  );
} 