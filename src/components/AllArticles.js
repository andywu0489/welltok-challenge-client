import React from 'react'
import axios from 'axios'
import apiUrl from '../apiConfig'
import { Card, Button } from 'react-bootstrap'
import Accordion from 'react-bootstrap/Accordion'

class AllArticles extends React.Component {
  constructor () {
    super()

    this.state = {
      articles: null
    }
  }

  componentDidMount () {
    axios({
      url: apiUrl + '/all-articles',
      method: 'get'
    })
      .then(response => this.setState({ articles: response }))
      .catch(console.error)
  }

  render () {
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

export default AllArticles
