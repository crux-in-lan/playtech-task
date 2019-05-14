import React from 'react';
import './css/Book.scss';
const Book = (props) => {
	const {title, author} = props;
	return (
		<div className='book'>
			<div className='title'>{title}</div>
			<div className='author'>{author}</div>
		</div>
	)
}

export default Book;