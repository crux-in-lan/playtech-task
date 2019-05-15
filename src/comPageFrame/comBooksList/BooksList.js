import React, {Component} from 'react';
import './css/BooksList.scss';
import Book from './comBook/Book';
const booksList = require('./BooksList.json');

class BooksList extends Component {

	constructor(props) {
		super(props);

		this.state = {
			currentList: [],
			containerHeight: null,
			elementHeight: null,
			elementsCount: null
		}
	}
	
	getFirstListElement = () => {
		return booksList[0];
	}	

	refCallbackContainerHeight = element => {
		if (element) {
		  this.setState({containerHeight: element.getBoundingClientRect().height});
		}
	}

	refCallbackElementHeight = element => {
		if (element) {
		  this.setState({elementHeight: element.getBoundingClientRect().height});
		}
	}

	calculateBooksCount = (containerHeiht,bookHeight) => {
		return Math.ceil(containerHeiht/bookHeight) + 1;
	}

	deleteFirstElement = () => {

	}

	deleteLastElement = () => {

	}

	addPreiousElement = () => {

	}

	addNextElement = () => {

	}

	componentDidMount() {
		const firstListElement = this.getFirstListElement();
		this.setState({currentList: [firstListElement]});
	}

	// shouldComponentUpdate() {
	// 	console.log(this.state.containerHeight, this.state.elementHeight);
	// }

	componentDidUpdate() {
		// console.log("AAA");
		const elementsCount = this.calculateBooksCount(this.state.containerHeight,this.state.elementHeight);
	}

	shouldComponentUpdate() {
		
	}

	render() {
		return (
				<div ref={this.refCallbackContainerHeight} className="bookslist">
				{					
					this.state.currentList.map(book => {			
						return <Book  key={book._id} refCallbackElementHeight={this.refCallbackElementHeight} id={book._id} title={book.title.substring(0,20)} author={book.authors[0].substring(0,20)}/>
					})
				}
				</div>
		)
	}
}

export default BooksList;