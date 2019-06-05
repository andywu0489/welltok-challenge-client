import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../apiConfig'
import { Card, Button } from 'react-bootstrap'
import Accordion from 'react-bootstrap/Accordion'

class ShowArticles extends React.Component {
  constructor () {
    super()

    this.state = {
      articles: null
    }
  }

  componentDidMount () {
    axios({
      url: apiUrl + '/my-articles',
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
    if (this.state.articles && this.state.articles.data.articles.length === 0) {
      return <h4 className='message'>Please Enter an Article</h4>
    }

    return (
      <div>
        <div>
          {this.state.articles ? this.state.articles.data.articles.map(article => (
            <Accordion key={article._id}>
              <br/>
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    <h5>{article.title}</h5>
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <h6>Author: {article.author}</h6>
                    <h6>Tags: {article.tags}</h6>
                    <hr/>
                    <p>{article.description}</p>
                    <Button onClick={() => this.destroyArticle(article._id)}>Delete</Button>
                    <Link to={`/article/${article._id}/edit`}>
                      <Button className='edit'>Edit</Button>
                    </Link>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          )) : ''
          }
        </div>
      </div>
    )
  }
}

export default ShowArticles
