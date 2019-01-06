import React, { Component } from 'react';
import './App.css';
import Jumbotron from './components/Jumbotron';

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <Jumbotron>
          <h1>Rueters News Scraper!</h1>
        </Jumbotron>
      </div>
    );
  }
}

export default App;
