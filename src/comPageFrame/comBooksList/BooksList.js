import React, {Component} from 'react';
import './css/BooksList.scss';
import Book from './comBook/Book';
const booksList = require('./BooksList.json');

class BooksList extends Component {

	constructor(props) {
		super(props);

		this.state = {
			currentList: [],
			elementsCount: 1,
			marginBottom: 0,
			marginTop: 0,
			scrollTop: 0,
			topElementIndex: 0,
			bottomElementIndex: 9
		}

		this.containerHeight = 170;
		this.elementHeight = 17;
	}

	calculateMarginBottomWithout(loadedElements) {
		return (booksList.length - loadedElements) * this.elementHeight;
	}
	
	handleScroll = (event) => {
		// console.log('Previous Scroll Position',this.state.scrollTop);
		// console.log('Next Scroll Position',event.currentTarget.scrollTop);

	    if(this.state.scrollTop > event.currentTarget.scrollTop) {
	      this.setState((prevState) => ({
	        scrollTop: prevState.scrollTop - this.elementHeight	        	        
	      }));
	      //Use curring and compose to make deleteLastAndAddPreviousElement function
	      this.deleteLastElement();
	    } else if(this.state.scrollTop < event.currentTarget.scrollTop) {
	      this.setState((prevState) => ({
	        scrollTop:prevState.scrollTop + this.elementHeight
	      }));
	      //Use curring and compose to make deleteFirstAndAddNextElement function
	      this.deleteFirstElement();
	    }
	}

	getFirstNListElements = (count) => {
		return booksList.slice(0,count);
	}	

	refCallbackContainerHeight = element => {
		if (element) {
		  this.containerHeight = element.getBoundingClientRect().height;
		}
	}

	refCallbackElementHeight = element => {
		if (element) {
		  this.elementHeight = element.getBoundingClientRect().height;
		}
	}

	calculateBooksCount = (containerHeiht,bookHeight) => {
		return Math.ceil(containerHeiht/bookHeight) + 1;
	}

	deleteFirstElement = () => {
		const newList = JSON.parse(JSON.stringify(this.state.currentList));
		newList.shift();
		this.setState((prevState) => ({
			currentList: newList,
			topElementIndex: prevState.topElementIndex + 1,
			marginTop: prevState.marginTop + this.elementHeight,			
		}),() => {
			this.addNextElement();
		});
	}

	deleteLastElement = () => {
		const newList = JSON.parse(JSON.stringify(this.state.currentList));
		newList.splice(-1,1);
		this.setState((prevState) => ({
			currentList: newList,
			bottomElementIndex: prevState.bottomElementIndex - 1,
			marginBottom: prevState.marginBottom + this.elementHeight
		}),() => {
			this.addPreviousElement();
		});
	}

	addPreviousElement = () => {
		
		const newList = [booksList[this.state.topElementIndex - 1],...JSON.parse(JSON.stringify(this.state.currentList))];
		this.setState((prevState) => ({
			currentList: newList,
			topElementIndex: prevState.topElementIndex - 1,
			marginTop: prevState.marginTop - this.elementHeight
		}));
	}

	addNextElement = () => {
		// console.log("Next element",booksList[this.state.bottomElementIndex + 1]);
		// console.log("Current element",booksList[this.state.bottomElementIndex]);
		const newList = [...JSON.parse(JSON.stringify(this.state.currentList)),booksList[this.state.bottomElementIndex + 1]];
		this.setState((prevState) => ({
			currentList: newList,
			bottomElementIndex: prevState.bottomElementIndex + 1,
			marginBottom: prevState.marginBottom - this.elementHeight
		}));
	}

	componentDidMount() {
		//bookLists event handlers 
		this.refs.booksList.addEventListener("scroll",this.handleScroll.bind(this));

		// console.log(booksList);
		const firstNListElements = this.getFirstNListElements(10);
		this.setState({
			marginBottom: this.calculateMarginBottomWithout(10),
			currentList: firstNListElements,
			topElementIndex: 0,
			bottomElementIndex: firstNListElements.length-1
		});
	}

	// shouldComponentUpdate() {
	// 	console.log(this.state.containerHeight, this.state.elementHeight);
	// }

	componentDidUpdate() {
		//Bind to the view
		this.refs.booksList.scrollTop = this.state.scrollTop;
	}

	shouldComponentUpdate(nextProps, nextState) {
		// if(this.state.elementsCount === nextState.elementsCount){
		// 	return false;
		// } else if {

		// }
		// console.log("currentState",this.state);
		// console.log("nextState",nextState);
		return true;
	}

	render() {
		let index = 0;
		return (
				<div ref="booksList" className="bookslist">
				{					
					this.state.currentList.map(book => {
						index++;
						// console.log('BOOKAAA',book);
						if(index===1) {
							return <Book  key={book._id} marginTop={this.state.marginTop} marginBottom={0} refCallbackElementHeight={this.refCallbackElementHeight} id={book._id} title={book.title.substring(0,20)} author={book.authors[0].substring(0,20)}/>
						}else if(index===this.state.currentList.length) {
							return <Book  key={book._id} marginTop={0} marginBottom={this.state.marginBottom} refCallbackElementHeight={this.refCallbackElementHeight} id={book._id} title={book.title.substring(0,20)} author={book.authors[0].substring(0,20)}/>
						} else {			
							return <Book  key={book._id} marginTop={0} marginBottom={0} refCallbackElementHeight={this.refCallbackElementHeight} id={book._id} title={book.title.substring(0,20)} author={book.authors[0].substring(0,20)}/>
						}
					})
				}
				</div>
		)
	}
}

export default BooksList;