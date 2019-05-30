import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

// import { changePassword } from '../api'
// import messages from '../messages'

class CreateArticle extends Component {
  constructor () {
    super()

    this.state = {
      title: '',
      description: '',
      author: '',
      tags: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onCreateArticle = event => {
    event.preventDefault()

    // const { alert, history, user } = this.props
    //
    // changePassword(this.state, user)
    //   .then(() => alert(messages.changePasswordSuccess, 'success'))
    //   .then(() => history.push('/'))
    //   .catch(error => {
    //     console.error(error)
    //     this.setState({ oldPassword: '', newPassword: '' })
    //     alert(messages.changePasswordFailure, 'danger')
    //   })
  }

  render () {
    const { title, description, author, tags } = this.state

    return (
      <form className='auth-form' onSubmit={this.onCreateArticle}>
        <h3>Create Article</h3>

        <label htmlFor="title">Title</label>
        <input
          required
          name="title"
          value={title}
          type="text"
          placeholder="Title"
          onChange={this.handleChange}
        />
        <label htmlFor="description">Description</label>
        <textarea
          required
          name="description"
          value={description}
          type="text"
          placeholder="Description"
          onChange={this.handleChange}
        />
        <label htmlFor="author">Author</label>
        <input
          required
          name="author"
          value={author}
          type="text"
          placeholder="Author"
          onChange={this.handleChange}
        />
        <label htmlFor="newPassword">Tags</label>
        <input
          required
          name="tags"
          value={tags}
          type="text"
          placeholder="Tags"
          onChange={this.handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    )
  }
}

export default withRouter(CreateArticle)
