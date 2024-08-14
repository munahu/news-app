"use server";

import { unstable_noStore as noStore } from "next/cache";
import { categories, CategoryName } from "./categories";
import OpenAI from "openai";

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

const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY });

export async function fetchRecommendedArticles(text: string, url: string) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `${text} Extract the three most important single-word keywords from the article to recommend related content. Format the result as a query.`,
      },
    ],
    model: "gpt-4o-mini",
  });

  const query = String(completion.choices[0].message.content);
  const words = query.split(" ").join(" OR ");
  const encodedQuery = encodeURIComponent(words);

  const articleDomain = new URL(url).hostname.replace(/^www\./, "");

  const response = await fetch(
    `https://newsapi.org/v2/everything?q=${encodedQuery}&excludeDomains=news.google.com,${articleDomain}&language=en&apiKey=${process.env.NEWS_API_KEY}&pageSize=5`
  );
  const data = await response.json();

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
