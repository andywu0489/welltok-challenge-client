import React, { Component } from 'react'
import './App.scss'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'
import CreateArticle from './components/CreateArticle'
import ShowArticles from './components/ShowArticles'
import EditArticle from './components/EditArticle'
import AllArticles from './components/AllArticles'
import ShowMyArticle from './components/ShowMyArticle'

import Alert from 'react-bootstrap/Alert'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = (message, type) => {
    this.setState({ alerts: [...this.state.alerts, { message, type }] })
  }

  render () {
    const { alerts, user } = this.state

    return (
      <React.Fragment>
        <Header user={user} />
        {alerts.map((alert, index) => (
          <Alert key={index} dismissible variant={alert.type}>
            <Alert.Heading>
              {alert.message}
            </Alert.Heading>
          </Alert>
        ))}
        <main className="container">
          <Route exact path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route exact path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} exact path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/create-article' render={() => (
            <CreateArticle alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/show-articles' render={() => (
            <ShowArticles alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/article/:id/edit' render={({ match }) => (
            <EditArticle alert={this.alert} user={user} match={match}/>
          )} />
          <Route exact path='/' render={() => (
            <AllArticles/>
          )} />
          <AuthenticatedRoute user={user} exact path='/article/:id' render={({ match }) => (
            <ShowMyArticle alert={this.alert} user={user} match={match}/>
          )} />
        </main>
      </React.Fragment>
    )
  }
}

export default App
