"use client";

import { Post } from "@/types/post";
import { format } from "date-fns";
import { motion } from "framer-motion";
import Link from "next/link";

interface RelatedPostsProps {
  currentPost: Post;
  posts: Post[];
}

export function RelatedPosts({ currentPost, posts }: RelatedPostsProps) {
  const relatedPosts = posts
    .filter((post) => {
      if (post.id === currentPost.id) return false;
      if (!post.tags || !currentPost.tags) return false;
      return post.tags.some((tag) => currentPost.tags?.includes(tag));
    })
    .slice(0, 3);

  if (relatedPosts.length === 0) return null;

  return (
    <section className="mt-16 pt-8 border-t">
      <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {relatedPosts.map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative rounded-lg border p-6 hover:border-primary/50 transition-colors"
          >
            <Link href={`/blog/${post.slug}`}>
              <div className="space-y-4">
                {post.image && (
                  <div className="aspect-video overflow-hidden rounded-lg">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="object-cover w-full h-full transition-transform group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <h3 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <time dateTime={post.date}>
                    {format(new Date(post.date), "MMM d, yyyy")}
                  </time>
                  <span>•</span>
                  <span>{post.readingTime} min read</span>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  );
} 