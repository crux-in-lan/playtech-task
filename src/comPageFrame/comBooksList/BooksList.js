import React, {Component} from 'react';
import './css/BooksList.scss';
import Book from './comBook/Book';
const booksList = require('./BooksList.json');

class BooksList extends Component {

	constructor(props) {
		super(props);

		this.state = {
			currentList: [],
			containerHeight: 340,			
			elementHeight: 34,
			elementsCount: 1,
			marginBottom: 0,
			marginTop: 0,
			scrollTop: 0,
			topElementIndex: 0,
			bottomElementIndex: 9
		}
	}

	calculateMarginBottomWithout(loadedElements) {
		return (booksList.length - loadedElements) * this.state.elementHeight;
	}
	
	handleScroll = (event) => {
		// console.log('Previous Scroll Position',this.state.scrollTop);
		// console.log('Next Scroll Position',event.currentTarget.scrollTop);

	    if(this.state.scrollTop > event.currentTarget.scrollTop) {
	      this.setState({
	        scrollTop: this.state.scrollTop - this.state.elementHeight	        	        
	      });
	      //Use curring and compose to make deleteLastAndAddPreviousElement function
	      this.deleteLastElement();
	    } else if(this.state.scrollTop < event.currentTarget.scrollTop) {
	      this.setState({
	        scrollTop:this.state.scrollTop + this.state.elementHeight
	      });
	      //Use curring and compose to make deleteFirstAndAddNextElement function
	      this.deleteFirstElement();
	    }
	}

	getFirstNListElements = (count) => {
		return booksList.slice(0,count);
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
		const newList = JSON.parse(JSON.stringify(this.state.currentList));
		newList.shift();
		this.setState({
			currentList: newList,
			topElementIndex: this.state.topElementIndex + 1,
			marginTop: this.state.marginTop + this.state.elementHeight,			
		},() => {
			this.addNextElement();
		});
	}

	deleteLastElement = () => {
		const newList = JSON.parse(JSON.stringify(this.state.currentList));
		newList.splice(-1,1);
		this.setState({
			currentList: newList,
			bottomElementIndex: this.state.bottomElementIndex - 1,
			marginBottom: this.state.marginBottom + this.state.elementHeight
		},() => {
			this.addPreviousElement();
		});
	}

	addPreviousElement = () => {
		// console.log("Previous element",booksList[this.state.topElementIndex - 1]);
		// console.log("Current element",booksList[this.state.topElementIndex]);
		const newList = [booksList[this.state.topElementIndex - 1],...JSON.parse(JSON.stringify(this.state.currentList))];
		this.setState({
			currentList: newList,
			topElementIndex: this.state.topElementIndex - 1,
			marginTop: this.state.marginTop - this.state.elementHeight
		});
	}

	addNextElement = () => {
		// console.log("Next element",booksList[this.state.bottomElementIndex + 1]);
		// console.log("Current element",booksList[this.state.bottomElementIndex]);
		const newList = [...JSON.parse(JSON.stringify(this.state.currentList)),booksList[this.state.bottomElementIndex + 1]];
		this.setState({
			currentList: newList,
			bottomElementIndex: this.state.bottomElementIndex + 1,
			marginBottom: this.state.marginBottom - this.state.elementHeight
		});
	}

	componentDidMount() {
		// console.log(booksList);
		const firstNListElements = this.getFirstNListElements(10);
		this.setState({marginBottom: this.calculateMarginBottomWithout(10)});
		this.setState({currentList: firstNListElements});	
		this.setState({
			topElementIndex: 0,
			bottomElementIndex: firstNListElements.length-1
		});
	}

	// shouldComponentUpdate() {
	// 	console.log(this.state.containerHeight, this.state.elementHeight);
	// }

	componentDidUpdate() {
		this.refs.elem.scrollTop = this.state.scrollTop;
		// console.log('topElementIndex',this.state.topElementIndex);
		// console.log('bottomElementIndex',this.state.bottomElementIndex);
		// console.log(this.state.scrollTop);
		// console.log("AAA");
		// this.setState({elementsCount:this.calculateBooksCount(this.state.containerHeight,this.state.elementHeight)});
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
				<div onScroll={this.handleScroll} ref="elem" className="bookslist">
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