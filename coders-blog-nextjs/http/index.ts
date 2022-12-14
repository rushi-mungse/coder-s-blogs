import axios from "axios";

const api = axios.create({
  baseURL : process.env.API_BASE_URL,
  headers : {
    Authorization : `Bearer ${process.env.AUTHORIZATION_KEY}`,
  },
});

export const fetchCategories = async () => api.get('/api/categories');
 
export const fetchArticles = async (queryString : string) => api.get(`/api/articles?${queryString}`);