import { AxiosResponse } from "axios"
import { GetServerSideProps } from "next"
import Head from "next/head"
import { fetchArticles } from "../../http"
import { IArticle, ICollectionResponse } from "../../types"
import qs from 'qs'
import { handleTitle } from "../../utils"
import Image from 'next/image'
import {dateFormate} from '../../utils'

interface IPropsTypes {
    article : {
        items : IArticle,
    }
}

const article = ({article } : IPropsTypes) => {
  return (
    <>
        <Head>
            <title>{handleTitle(article.items.attributes.slug)}</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="mt-12 grid grid-cols-3">
            <div className="col-span-2">
                <h1 className="text-3xl font-bold py-2"> {article.items.attributes.title} </h1>
                <div className="flex items-center my-4">
                    <div className="mt-2 flex items-center">
                        <Image src = {`${process.env.API_BASE_URL}${article.items.attributes.author.data.attributes.avatar.data.attributes.url}`} height= {40} width= {40} className="rounded-md"/>
                        <div className="ml-2">
                            <span className="font-bold"> {article.items.attributes.author.data.attributes.username}</span> on
                            <span className="text-gray-400 ml-2 text-sm">{dateFormate(article.items.attributes.createdAt)}</span>
                        </div>
                    </div >
                </div>
                <img src = {`${process.env.API_BASE_URL}${article.items.attributes.image.data.attributes.url}`} />
            </div>
            <div>
                <h1>Form</h1>
            </div>
        </div>
    </>
  )
}

export default article

export const getServerSideProps : GetServerSideProps = async ({query}) => {
    const options = {
        populate : ['image', 'author.avatar'],
        sort : ['id:desc'],
        filters : {
            slug: {
                $eq: query.article,
            },
        }
    }

    const queryString  = qs.stringify(options);
    const { data : articles } : AxiosResponse<ICollectionResponse<IArticle[]>> = await fetchArticles(queryString);
    return {
        props : {
            article : {
                items : articles.data[0]
            }
        }
    }
}

