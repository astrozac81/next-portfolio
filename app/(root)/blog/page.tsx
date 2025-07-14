"use client";

import { usePosts } from "@/hooks/use-posts";
import { Post } from "@/types/post";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function Blog() {
    const { data: posts, isLoading, error } = usePosts();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <p className="text-muted-foreground">Failed to load posts. Please try again later.</p>
            </div>
        );
    }

    if (!posts || posts.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <p className="text-muted-foreground">No posts found.</p>
            </div>
        );
    }

    return (
        <div className="container py-8 space-y-8">
            <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">Blog</h1>
                <p className="text-muted-foreground">
                    Thoughts, ideas, and insights about technology, development, and more.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post: Post) => (
                    <motion.article
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
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
                                    <h2 className="text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">
                                        {post.title}
                                    </h2>
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
        </div>
    );
}


