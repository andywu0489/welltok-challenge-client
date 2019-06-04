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

export const editArticle = (id, title, description, author, tags, user) => {
  return axios({
    url: `${apiUrl}/articles/${id}`,
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      article: {
        title: title,
        description: description,
        author: author,
        tags: tags
      }
    }
  })
}
