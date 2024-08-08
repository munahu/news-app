import Layout from "@/app/components/Layout";
import { fetchArticles } from "@/app/actions";
import { notFound } from "next/navigation";
import Article from "@/app/components/Article";
import { CategoryName, categoryNames } from "@/app/categories";

export default async function Page({
  params,
}: {
  params: { category: CategoryName };
}) {
  const categoryName = params.category;
  if (categoryNames.includes(categoryName)) {
    const articles = await fetchArticles(categoryName, "20");

    return (
      <Layout heading={categoryName}>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {articles.map((article, index) => (
            <Article
              key={index}
              article={article}
              categoryName={categoryName}
            />
          ))}
        </ul>
      </Layout>
    );
  } else {
    notFound();
  }
}
