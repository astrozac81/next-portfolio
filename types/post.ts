export interface Post {
    id: string;
    title: string;
    slug: string;
    date: string;
    excerpt: string;
    content: string;
    image?: string;
    readingTime: number;
    author: {
        name: string;
        image?: string;
    };
    tags?: string[];
} 