import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../apiConfig'
import { Redirect } from 'react-router'

class ShowMyArticle extends React.Component {
  constructor () {
    super()

    this.state = {
      articles: null,
      shouldRedirect: false
    }
  }

  componentDidMount () {
    axios({
      url: `${apiUrl}/articles/${this.props.match.params.id}`,
      method: 'get',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(response => this.setState({ articles: response }))
      .then(() => console.log(this.state.articles))
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

      .then(() => this.setState(
        { shouldRedirect: true, redirectMessage: 'Successfully deleted article' }))
      .catch(() => this.setState({ shouldRedirect: true }))
  }

  render () {
    if (this.state.shouldRedirect) {
      return <Redirect to='/show-articles' />
    }
    return (
      <div>
        <div>
          {this.state.articles
            ? <div key={this.state.articles.data.article._id}>
              <h2>Title: {this.state.articles.data.article.title}</h2>
              <p>Description: {this.state.articles.data.article.description}</p>
              <p>Author: {this.state.articles.data.article.author}</p>
              <p>Tags: {this.state.articles.data.article.tags}</p>
              <button onClick={() => this.destroyArticle(this.state.articles.data.article._id)}>Delete</button>
              <Link to={`/article/${this.state.articles.data.article._id}/edit`}>
                <button>Edit</button>
              </Link>
            </div>
            : ''
          }
        </div>
      </div>
    )
  }
}

export default ShowMyArticle
