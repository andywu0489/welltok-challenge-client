import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../apiConfig'
import { Redirect } from 'react-router'
import { Button, Card } from 'react-bootstrap'
import Accordion from 'react-bootstrap/Accordion'

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
            ? <Accordion defaultActiveKey="0" key={this.state.articles.data.article._id}>
              <br/>
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    <h2>{this.state.articles.data.article.title}</h2>
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <h6>Author: {this.state.articles.data.article.author}</h6>
                    <h6>Tags: {this.state.articles.data.article.tags}</h6>
                    <hr/>
                    <p>{this.state.articles.data.article.description}</p>
                    <Button onClick={() => this.destroyArticle(this.state.articles.data.article._id)}>Delete</Button>
                    <Link to={`/article/${this.state.articles.data.article._id}/edit`}>
                      <Button className='edit'>Edit</Button>
                    </Link>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
            : ''
          }
        </div>
      </div>
    )
  }
}

export default ShowMyArticle
