import Api from '../Axios/api';




const ARTICLE_API = "articles"



export const fetchArticles = async () => {
    return await Api.get(ARTICLE_API);
}



export const fetchArticleById = async (article) => {
    return await Api.get(`${ARTICLE_API}/${article}`);
}


export const addArticle = async (article) => {
    return await Api.post(ARTICLE_API, article);
}

export const editArticle = (article) => {
    return Api.put(`${ARTICLE_API}/${article.id}`, article)
}

export const deleteArticle = (articleId) => {
    return Api.delete(`${ARTICLE_API}/${articleId}`)
}