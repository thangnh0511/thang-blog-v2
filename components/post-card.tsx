import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

interface Post {
  _id: string;
  type: "blog" | "note"; 
  title_en: string;
  title_vi?: string;
  slug: string;
  mainImage?: string;
  _createdAt: string;
  createdDate?: string;
  shortDescription_en?: string;
  shortDescription_vi?: string;
  author?: {
    fullName?: string;
    avatar?: string;
  };
  category?: {
    name: string;
  };
  postType?: string[];
}

interface PostCardProps {
  post: Post;
  locale?: string;
}

export function PostCard({ post, locale = "en" }: PostCardProps) {
  const title = locale === "en" ? post.title_en : post.title_vi || post.title_en;
  const description = locale === "en" ? post.shortDescription_en : post.shortDescription_vi || post.shortDescription_en;
  const date = post.createdDate || post._createdAt;

  // Xác định URL dựa trên type
  const postUrl = `/${post.type}/${post.slug}`;

  return (
    <Card className="overflow-hidden border-2 border-gray-900 dark:border-white">
      <Link href={postUrl}>
        <div className="relative aspect-video overflow-hidden border-b-2 border-gray-900 dark:border-white">
          <Image
            src={post.mainImage || "/placeholder.svg?height=400&width=600"}
            alt={title}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
        </div>
      </Link>
      <CardHeader className="p-4 pb-2">
        <Link href={postUrl} className="hover:underline">
          <h3 className="text-xl font-bold line-clamp-2">{title}</h3>
        </Link>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        {description && <p className="text-muted-foreground line-clamp-2">{description}</p>}
      </CardContent>
      <CardFooter className="p-4 pt-0 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          {post.category && (
            <>
              <span className="text-sm font-mono">{post.category.name}</span>
              <span>|</span>
            </>
          )}
          <time dateTime={date} className="text-xs font-mono">{formatDate(date)}</time>
          {post.author?.fullName && (
            <>
              <span>|</span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono">{post.author.fullName}</span>
              </div>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

