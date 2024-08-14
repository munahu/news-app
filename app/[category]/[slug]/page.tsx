import {
  ArticleStructure,
  fetchArticle,
  fetchRecommendedArticles,
} from "@/app/actions";
import Layout from "@/app/components/Layout";
import Image from "next/image";
import { notFound } from "next/navigation";

interface MobileArticleLayoutProps {
  title: string;
  urlToImage: string;
  description: string;
  url: string;
  recommendedArticles: ArticleStructure[];
}

export default async function Page({
  params,
}: {
  params: { category: string; slug: string };
}) {
  const query = decodeURIComponent(params.slug).split("&domain=");
  const title = query[0];
  const domain = query[1];

  const article = await fetchArticle(title, domain);
  const recommendedArticles: ArticleStructure[] =
    await fetchRecommendedArticles(
      `${article.title} ${article.description}`,
      article.url
    );

  if (article) {
    return (
      <>
        <Image
          alt={article.title}
          src={article.urlToImage}
          width={1200}
          height={550}
          className="h-full object-cover blur-[300px] dark:brightness-50 absolute -z-10 opacity-15 dark:opacity-100"
        />
        <Layout heading={params.category}>
          <>
            <div className="relative">
              <MobileArticleLayout
                title={article.title}
                description={article.description}
                urlToImage={article.urlToImage}
                url={article.url}
                recommendedArticles={recommendedArticles}
              />
              <div className="hidden lg:flex mt-16">
                <div className="flex flex-col w-2/3 mr-12 lg:w-1/2">
                  <div>
                    <h2 className="text-4xl mb-6 font-semibold -tracking-[1.5px]">
                      {article.title}
                    </h2>
                    <p className="text-xl font-light -tracking-[0.3px] mb-12">
                      {article.description}
                    </p>
                    <ArticleLink url={article.url} type="primary" />
                  </div>
                  {recommendedArticles.length > 0 && (
                    <RecommendedArticles
                      recommendedArticles={recommendedArticles}
                    />
                  )}
                </div>
                <div className="relative w-1/3 lg:w-1/2 max-h-96 lg:sticky lg:top-20">
                  <Image
                    alt={article.title}
                    src={article.urlToImage}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </>
        </Layout>
      </>
    );
  } else {
    notFound();
  }
}

function MobileArticleLayout({
  title,
  urlToImage,
  description,
  url,
  recommendedArticles,
}: MobileArticleLayoutProps) {
  return (
    <div className="lg:hidden mt-8 py-12">
      <div>
        <h2 className="text-4xl font-semibold -tracking-[1.5px] mb-8">
          {title}
        </h2>
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
        <ArticleLink url={url} type="primary" />
      </div>
      {recommendedArticles.length > 0 && (
        <RecommendedArticles recommendedArticles={recommendedArticles} />
      )}
    </div>
  );
}

async function RecommendedArticles({
  recommendedArticles,
}: {
  recommendedArticles: ArticleStructure[];
}) {
  return (
    <div className="mt-32">
      <h2 className="text-xl mb-6 uppercase border-b border-black dark:border-white -tracking-[0.5px]">
        Recommended articles
      </h2>
      <ul>
        {recommendedArticles.map((article, index) => (
          <li key={index} className="mb-14">
            <div className="sm:flex">
              <Image
                alt={article.title}
                src={article.urlToImage}
                width={550}
                height={550}
                className="object-cover sm:w-1/2 lg:w-[45%]"
              />
              <div className="mt-4 sm:mt-0 sm:ml-5">
                <p className="text-2xl font-semibold leading-6 mb-3">
                  {article.title}
                </p>
                <p className="mb-8 dark:opacity-75 font-light text-sm">
                  {article.description}
                </p>
                <ArticleLink url={article.url} type="secondary" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ArticleLink({
  url,
  type,
}: {
  url: string;
  type: "primary" | "secondary";
}) {
  return (
    <a
      href={url}
      target="_blank"
      className={`flex items-center justify-center w-fit ${
        type === "primary"
          ? "px-5 py-3 rounded-3xl text-sm bg-lightBlack dark:bg-white text-white dark:text-darkBlack"
          : "border-b dark:border-white border-black text-xs"
      } font-light -tracking-[0.3px]`}
    >
      <span className="mr-1">Read full article</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={`${type === "primary" ? "w-4" : "w-3"} aspect-square`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
        />
      </svg>
    </a>
  );
}
