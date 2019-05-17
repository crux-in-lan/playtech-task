import React, {Component} from 'react';
import './css/BooksList.scss';
import Book from './comBook/Book';
import FirstBook from './comBook/FirstBook';
import Deque from 'double-ended-queue';
import clone from 'clone';

const booksList = require('./BooksList.json');

class BooksList extends Component {

	constructor(props) {
		super(props);

		this.state = {
			currentList: new Deque(10),			
			marginBottom: 0,
			marginTop: 0,
			scrollTop: 0,
			calculated: false			
		}
		this.topElementIndex = 0;
		this.bottomElementIndex = 9;
		this.containerHeight = 1;
		this.elementHeight = 1;
		this.elementsCount = 1;
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

	setElementHeight = (height) => {
		this.elementHeight = height;
		// console.log('setElementHeight');		
	}

	setCalculated = (isCalculated) => {
		this.setState({calculated:isCalculated});
	}

	calculateBooksCount = (containerHeight,bookHeight) => {
		return Math.ceil(containerHeight/bookHeight) + 1;
	}

	deleteFirstElement = () => {
		const newDeque = clone(this.state.currentList);
		newDeque.shift();
		
		this.setState((prevState) => ({
			currentList: newDeque,			
			marginTop: prevState.marginTop + this.elementHeight,			
		}),() => {
			this.topElementIndex++;
			this.addNextElement();
		});
	}

	deleteLastElement = () => {
		const newDeque = clone(this.state.currentList);
		newDeque.pop();
		
		this.setState((prevState) => ({
			currentList: newDeque,			
			marginBottom: prevState.marginBottom + this.elementHeight
		}),() => {
			this.bottomElementIndex--;
			this.addPreviousElement();
		});
	}

	addPreviousElement = () => {		
		const newDeque = clone(this.state.currentList);
		newDeque.unshift(booksList[this.topElementIndex - 1]);
		
		this.setState((prevState) => ({
			currentList: newDeque,			
			marginTop: prevState.marginTop - this.elementHeight
		}),() => {
			this.topElementIndex--;
		});
	}

	addNextElement = () => {
		const newDeque = clone(this.state.currentList);
		newDeque.push(booksList[this.bottomElementIndex + 1]);	

		this.setState((prevState) => ({
			currentList: newDeque,			
			marginBottom: prevState.marginBottom - this.elementHeight
		}), () => {
			this.bottomElementIndex++;
		});
	}

	componentDidMount() {
		// console.log('componentDidMount');
		// console.log('elementHeight',this.elementHeight);
		//bookLists event handlers 
		this.refs.booksList.addEventListener("scroll",this.handleScroll.bind(this));

		//Initialise the container height
		this.containerHeight = this.refs.booksList.getBoundingClientRect().height;
		this.elementsCount = this.calculateBooksCount(this.containerHeight,this.elementHeight);
		this.topElementIndex = 0;
		this.bottomElementIndex = this.elementsCount - 1;

		// console.log('elementsCount',this.elementsCount);
		const firstNListElements = new Deque(this.getFirstNListElements(this.elementsCount));
		this.setState({
			marginBottom: this.calculateMarginBottomWithout(this.elementsCount),
			currentList: firstNListElements,
			bottomElementIndex: firstNListElements.length-1
		});
		// console.log('componentDidMount2');
	}

	componentDidUpdate() {
		//Bind to the view
		this.refs.booksList.scrollTop = this.state.scrollTop;

		// console.log('componentDidUpdate');
	}

	shouldComponentUpdate(nextProps,nextState) {
		// console.log('shouldComponentUpdate');
		// console.log('currState', this.state);
		// console.log('nextState', nextState);
		return true;
	}


	render() {
		let index = 0;
		const currentListClone = clone(this.state.currentList);
		
		return (
				<div ref="booksList" className="bookslist">
				{					
					!this.state.calculated ?
					<FirstBook  key={booksList[0]._id} setCalculated={this.setCalculated} setElementHeight={this.setElementHeight} marginTop={0} marginBottom={0} id={booksList[0]._id} title={booksList[0].title.substring(0,20)} author={booksList[0].authors[0].substring(0,20)}/>
					:
					currentListClone.toArray().map(book => {
						index++;
						// console.log('BOOKAAA',book);
						if(index===1) {
							return <Book  key={book._id} marginTop={this.state.marginTop} marginBottom={0} id={book._id} title={book.title.substring(0,20)} author={book.authors[0].substring(0,20)}/>
						}else if(index===this.state.currentList.length) {
							return <Book  key={book._id} marginTop={0} marginBottom={this.state.marginBottom} id={book._id} title={book.title.substring(0,20)} author={book.authors[0].substring(0,20)}/>
						} else {			
							return <Book  key={book._id} marginTop={0} marginBottom={0} id={book._id} title={book.title.substring(0,20)} author={book.authors[0].substring(0,20)}/>
						}
					})
				}
				</div>
		)
		
	}
}

export default BooksList;