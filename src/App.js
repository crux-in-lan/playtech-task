/*libraries and APIs*/
import React, { Component } from 'react';

/*common for the whole application*/
import logo from './logo.svg';
import './App.css';

/*BooksPage*/
import PageFrame from './comPageFrame/PageFrame';
import BooksList from './comPageFrame/comBooksList/BooksList';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return(
      <PageFrame>
        <BooksList/>      
      </PageFrame>
    );
  } 
}

export default App;