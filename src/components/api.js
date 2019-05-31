import apiUrl from '../apiConfig'
import axios from 'axios'

export const createArticle = (article, user) => {
  return axios({
    url: apiUrl + '/articles',
    method: 'POST',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      article: {
        title: article.title,
        description: article.description,
        author: article.author,
        tags: article.tags
      }
    }
  })
}
