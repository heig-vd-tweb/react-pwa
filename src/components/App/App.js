import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import NewsList from '../NewsList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src="/images/logo.svg" className="App-logo" alt="logo" />
          <h1>React Hacker News</h1>
        </header>
        <main className="App-content">
          <NewsList />
        </main>
      </div>
    );
  }
}

export default connect()(App);
