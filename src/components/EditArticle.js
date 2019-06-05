import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../apiConfig'
import { Redirect } from 'react-router'
import { Button, Jumbotron } from 'react-bootstrap'
import { editArticle } from './api'
import messages from '../auth/messages'

class EditArticle extends Component {
  constructor () {
    super()

    this.state = {
      editedArticle: false,
      article: null,
      title: '',
      description: '',
      author: '',
      tags: ''
    }
  }

  componentDidMount () {
    const { user } = this.props
    axios({
      url: `${apiUrl}/articles/${this.props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then(response => this.setState(
        { article: response.data.article
        }))
      .catch()
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onEditArticle = event => {
    event.preventDefault()

    const { alert, history, user } = this.props

    editArticle(this.state.article._id, this.state.title, this.state.description, this.state.author, this.state.tags, user)
      .then(() => alert(messages.editArticleSuccess, 'success'))
      .then(() => history.push('/article/:id/edit'))
      .then(() => this.setState({
        title: '',
        description: '',
        author: '',
        tags: ''
      }))
      .then(() => this.setState({
        editedArticle: true
      }))
      .catch(error => {
        console.error(error)
        this.setState({
          title: '',
          description: '',
          author: '',
          tags: ''
        })
        alert(messages.editArticleFailure, 'danger')
      })
  }

  render () {
    if (this.state.editedArticle) {
      return <Redirect to={`/article/${this.state.article._id}`} />
    }

    return (
      <div>  { this.state.article
        ? <Jumbotron>
          <form className='auth-form' onSubmit={this.onEditArticle}>
            <h3>Edit Article</h3>
            <label htmlFor="title">Title</label>
            <input
              name="title"
              value={this.state.title}
              type="text"
              placeholder={`${this.state.article.title}`}
              onChange={this.handleChange}
            />
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              value={this.state.description}
              type="text"
              placeholder={`${this.state.article.description}`}
              onChange={this.handleChange}
            />
            <label htmlFor="author">Author</label>
            <input
              name="author"
              value={this.state.author}
              type="text"
              placeholder={`${this.state.article.author}`}
              onChange={this.handleChange}
            />
            <label htmlFor="tags">Tags</label>
            <input
              name="tags"
              value={this.state.tags}
              type="text"
              placeholder={`${this.state.article.tags}`}
              onChange={this.handleChange}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Jumbotron> : '' }
      </div>
    )
  }
}

export default withRouter(EditArticle)
