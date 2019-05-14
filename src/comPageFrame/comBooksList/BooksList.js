import React from 'react';
import './css/BooksList.scss';
import Book from './comBook/Book';
const booksList = require('./BooksList.json');

const BooksList = (props) => {
	return (
			<div className="bookslist">
			{
				booksList.map(book => {
					return <Book key={book._id} id={book._id} title={book.title} author={book.authors[0]}/>
				})
			}
			</div>
	)
}

export default BooksList;