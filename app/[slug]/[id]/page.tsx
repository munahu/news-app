"use client";

import { ArticleStructure } from "@/app/actions";
import Layout from "@/app/components/Layout";
import Image from "next/image";
import { notFound } from "next/navigation";

interface MobileTextLayoutProps {
  title: string;
  urlToImage: string;
  description: string;
  url: string;
}

export default function Page({
  params,
}: {
  params: { id: string; slug: string };
}) {
  const storedViewedArticles = String(localStorage.getItem("articles"));
  const viewedArticles = JSON.parse(storedViewedArticles);
  const article: ArticleStructure = viewedArticles.find(
    (article: ArticleStructure) => article.id === params.id
  );

  if (article.id === params.id) {
    return (
      <>
        <Image
          alt={article.title}
          src={article.urlToImage}
          width={1200}
          height={550}
          className="h-full object-cover blur-[300px] dark:brightness-50 absolute -z-10 opacity-15 dark:opacity-100"
        />
        <Layout heading={params.slug}>
          <div className="relative">
            <MobileTextLayout
              title={article.title}
              description={article.description}
              urlToImage={article.urlToImage}
              url={article.url}
            />
            <div className="hidden md:flex mt-16 absolute z-10">
              <div className="w-2/3 mr-12 lg:w-1/2">
                <h2 className="text-4xl mb-6 font-semibold -tracking-[1.5px]">
                  {article.title}
                </h2>
                <p className="text-xl font-light -tracking-[0.3px] mb-12">
                  {article.description}
                </p>
                <a
                  href={article.url}
                  target="_blank"
                  className="flex items-center justify-center w-fit px-5 py-3 rounded-3xl text-sm font-light -tracking-[0.3px] bg-lightBlack dark:bg-white text-white dark:text-darkBlack"
                >
                  <span className="mr-1">Read full article</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                    />
                  </svg>
                </a>
              </div>
              <Image
                alt={article.title}
                src={article.urlToImage}
                width={1200}
                height={550}
                className="object-cover w-1/3 lg:w-1/2"
              />
            </div>
          </div>
        </Layout>
      </>
    );
  } else {
    notFound();
  }
}

function MobileTextLayout({
  title,
  urlToImage,
  description,
  url,
}: MobileTextLayoutProps) {
  return (
    <div className="md:hidden absolute mt-8 py-12 z-20">
      <h2 className="text-4xl font-semibold -tracking-[1.5px] mb-8">{title}</h2>
      <Image
        alt={title}
        src={urlToImage}
        width={1200}
        height={550}
        className="object-cover mb-6"
      />
      <p className="text-lg font-light -tracking-[0.3px] mb-12">
        {description}
      </p>
      <a
        href={url}
        target="_blank"
        className="flex items-center justify-center w-fit px-5 py-3 rounded-3xl text-sm font-light -tracking-[0.3px]  bg-lightBlack dark:bg-white text-white dark:text-darkBlack"
      >
        <span className="mr-1">Read full article</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
          />
        </svg>
      </a>
    </div>
  );
}
