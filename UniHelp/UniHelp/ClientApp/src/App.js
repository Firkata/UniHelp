import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { NewsFeed } from './components/NewsFeed';
import { CreatePost } from './components/CreatePost';
import { CreateUser } from './components/CreateUser';
import { Login } from './components/Login';
import { Logout } from './components/Logout';

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/newsfeed' component={NewsFeed} />
        <Route path='/createpost' component={CreatePost} />
        <Route path='/createuser' component={CreateUser} />
        <Route path='/login' component={Login} />
        <Route path='/logout' component={Logout} />
      </Layout>
    );
  }
}
