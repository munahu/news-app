"use server";

import { unstable_noStore as noStore } from "next/cache";
import { categories, CategoryName } from "./categories";

export interface ArticleStructure {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  content: string;
}

export async function fetchArticles(
  categoryName: CategoryName,
  amount: string
) {
  const categoryDomains = categories.find(
    (category) => category.name === categoryName
  )?.domains;

  const response = await fetch(
    `https://newsapi.org/v2/everything?domains=${categoryDomains}&language=en&apiKey=${process.env.NEWS_API_KEY}&pageSize=${amount}`
  );

  const data = await response.json();

  noStore();

  const articles: ArticleStructure[] = data.articles;

  const filteredArticles = articles.filter(
    (article) =>
      article.title &&
      article.description &&
      article.url &&
      article.urlToImage &&
      article.content
  );

  return filteredArticles;
}

export async function fetchArticle(title: string, domain: string) {
  const response = await fetch(
    `https://newsapi.org/v2/everything?q=${encodeURIComponent(
      title
    )}&domains=${domain}&searchIn=title&apiKey=${
      process.env.NEWS_API_KEY
    }&pageSize=1`
  );
  const data = await response.json();

  const article: ArticleStructure = data.articles[0];

  return article;
}
