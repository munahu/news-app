import { CategoryName, categoryNames } from "./categories";
import Link from "next/link";
import Image from "next/image";
import { fetchArticles } from "@/app/actions";

interface PreviewCategoryProps {
  categoryName: CategoryName;
}

async function PreviewCategory({ categoryName }: PreviewCategoryProps) {
  const articles = await fetchArticles(categoryName, "1");

  return (
    <li className="relative cursor-pointer group">
      {articles &&
        articles.map((article, index) => (
          <Link key={index} href={`/${categoryName}`}>
            {index === 0 && (
              <>
                <span className="absolute left-4 lg:left-7 bottom-3 text-white text-5xl md:text-6xl lg:text-7xl capitalize font-semibold -tracking-[0.04em] font-sans z-40 opacity-65 group-hover:opacity-100">
                  {categoryName}
                </span>
                <Image
                  alt={article.title}
                  src={article.urlToImage}
                  width={1200}
                  height={550}
                  className="h-full w-full object-cover brightness-50 group-hover:brightness-75 tracking-wider"
                  priority
                />
              </>
            )}
          </Link>
        ))}
    </li>
  );
}

export default async function Home() {
  return (
    <ul className="h-screen grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 grid-rows-6 sm:grid-rows-3 xl:grid-rows-2">
      {categoryNames.map((categoryName, index) => (
        <PreviewCategory key={index} categoryName={categoryName} />
      ))}
    </ul>
  );
}
