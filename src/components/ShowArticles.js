import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../apiConfig'

class ShowArticles extends React.Component {
  constructor () {
    super()

    this.state = {
      articles: null
    }
  }

  componentDidMount () {
    axios({
      url: apiUrl + '/articles',
      method: 'get',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(response => this.setState({ articles: response }))
      .then(() => console.log(this.state.articles.data.articles))
      .catch(console.error)
  }

  destroyArticle (id) {
    axios({
      url: `${apiUrl}/articles/${id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(() => this.componentDidMount())
      .then(() => this.setState(
        { shouldRedirect: true, redirectMessage: 'Successfully deleted article' }))
      .catch(() => this.setState({ shouldRedirect: true }))
  }

  render () {
    return (
      <div>
        <div>
          {this.state.articles ? this.state.articles.data.articles.map(article => (
            <div key={article._id}>
              <h2>Title: {article.title}</h2>
              <p>Description: {article.description}</p>
              <p>Author: {article.author}</p>
              <p>Tags: {article.tags}</p>
              <button onClick={() => this.destroyArticle(article._id)}>Delete</button>
              <Link to={'/edit-article'}>
                <button>Edit</button>
              </Link>
            </div>
          )) : ''
          }
        </div>
      </div>
    )
  }
}

export default ShowArticles
