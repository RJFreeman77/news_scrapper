import React, { Component } from 'react';
import Jumbotron from './components/Jumbotron';
import Body from './components/pages/Body';

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <Jumbotron>
          <h1>Rueters News Scraper!</h1>
        </Jumbotron>
        <Body />
      </div>
    );
  }
}

export default App;
