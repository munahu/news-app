"use client";

import Image from "next/image";
import { ArticleStructure } from "@/app/actions";
import { useRouter } from "next/navigation";
import { CategoryName } from "@/app/categories";

interface Props {
  article: ArticleStructure;
  categoryName: CategoryName;
}

export default function Article({ article, categoryName }: Props) {
  const router = useRouter();
  const handleClick = () => {
    const domain = new URL(article.url).host.replace(/^www\./, "");
    const titleWords = article.title.split(" ");
    const truncatedTitleWords = (
      titleWords.length > 4 ? titleWords.splice(0, 4) : titleWords
    ).join(" ");
    const encodedTitle = encodeURIComponent(truncatedTitleWords);
    router.push(`/${categoryName}/${encodedTitle}&domain=${domain}`);
  };
  return (
    <li className="group cursor-pointer" onClick={() => handleClick()}>
      <Image
        alt={article.title}
        src={article.urlToImage}
        width={1200}
        height={550}
        className="h-full object-cover brightness-50 group-hover:brightness-100"
      />
    </li>
  );
}
