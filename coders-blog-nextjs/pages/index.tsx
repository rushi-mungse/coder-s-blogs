import Head from "next/head";
import { fetchArticles, fetchCategories } from "../http";
import { ICategory, ICollectionResponse,IArticle } from "../types";
import { AxiosResponse } from "axios";
import { GetServerSideProps, NextPage } from "next";
import Tabs from "../components/Tabs";
import qs from 'qs'
import ArticlesList from "../components/ArticlesList";

interface IPropType {
  categories : {
    items : ICategory[],
  },
  articles : {
    items : IArticle[],
  }
}

const Home: NextPage<IPropType> = ({categories, articles}) => {
  return (
    <div className="pb-24">
      <Head>
        <title>Coders Blog's</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Tabs categories = {categories.items}/>
      <ArticlesList articles={articles.items}/>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const options = {
    populate : ['image','author.avatar'],
    sort : ['id:desc']
  }
  const queryString = qs.stringify(options);

  const { data: categories }: AxiosResponse<ICollectionResponse<ICategory[]>> =  await fetchCategories();
  const { data: articles }: AxiosResponse<ICollectionResponse<IArticle[]>> =  await fetchArticles(queryString);

  return {
    props: {
      categories: {
        items: categories.data,
      },
      articles : {
        items : articles.data,
      }
    },
  };
};

export default Home;
