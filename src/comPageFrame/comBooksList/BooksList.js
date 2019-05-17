import React, {Component} from 'react';
import './css/BooksList.scss';
import Book from './comBook/Book';
const booksList = require('./BooksList.json');

class BooksList extends Component {

	constructor(props) {
		super(props);

		this.state = {
			currentList: [],
			containerHeight: 0,			
			elementHeight: 0,
			elementsCount: 1,
			marginBottom: 0,
			marginTop: 0,
			scrollTop: 0,
			topElementIndex: 0,
			bottomElementIndex: 9			
		}

		this.componentUpdatedCount = 0;
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

	setElementHeight = (height) => {
		this.setState({elementHeight: height});
	}

	// refCallbackContainerHeight = element => {
	// 	if (element) {
	// 	  this.setState({containerHeight: element.getBoundingClientRect().height});
	// 	}
	// }

	// refCallbackElementHeight = element => {
	// 	console.log("refCallbackElementHeight");
	// 	if (element) {
	// 	  this.setState({elementHeight: element.getBoundingClientRect().height});
	// 	}
	// }

	calculateBooksCount = (containerHeiht,bookHeight) => {
		return Math.ceil(containerHeiht/bookHeight) + 1;
	}

	deleteFirstElement = () => {
		console.log('Delete first element');
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
		console.log('Delete last element');
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
		console.log('Add previous element');
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
		console.log('Add next element');
		// console.log("Next element",booksList[this.state.bottomElementIndex + 1]);
		// console.log("Current element",booksList[this.state.bottomElementIndex]);
		const newList = [...JSON.parse(JSON.stringify(this.state.currentList)),booksList[this.state.bottomElementIndex + 1]];
		this.setState((prevState) => ({
			currentList: newList,
			bottomElementIndex: prevState.bottomElementIndex + 1,
			marginBottom: prevState.marginBottom - prevState.elementHeight
		}));
	}

	calculateElementsCount = (containerHeight, elementHeight) => {
		return Math.ceil(containerHeight/elementHeight);
	}

	componentDidMount() {

		// console.log('componentDidMount');
		const firstElement = this.getFirstNListElements(1);	

		this.setState({
			containerHeight: this.refs.booksList.getBoundingClientRect().height,
			currentList: firstElement
		},() => {
			console.log("componentDidMount: ",this.componentUpdatedCount);
			// console.log('MyBook: ',);
			// console.log('The element height: ',this.state.elementHeight);
			const elementsCount = this.calculateElementsCount(this.state.containerHeight,this.state.elementHeight);
			const firstNListElements = this.getFirstNListElements(elementsCount);
			this.setState({
				marginBottom: this.calculateMarginBottomWithout(elementsCount),
				currentList: firstNListElements,
				topElementIndex: 0,
				bottomElementIndex: firstNListElements.length-1
			});	
		});		
		
		// this.setState({elementHeight: });
	}

	// shouldComponentUpdate() {
	// 	console.log(this.state.containerHeight, this.state.elementHeight);
	// }

	componentDidUpdate() {
		console.log("componentDidUpdate: ",this.componentUpdatedCount);
		this.refs.booksList.scrollTop = this.state.scrollTop;
		// console.log('Update Sequence: ',this.componentUpdatedCount);
		// if(this.componentUpdatedCount === 0) {
			// console.log('CCCVVCCCV');
			this.componentUpdatedCount++;
		// }
		// else if(this.componentUpdatedCount === 1) {			
			// console.log('componentDidMount booksList');
				
			// this.componentUpdatedCount++;
			// console.log('AAAAAAAA');
			// console.log('containerHeight',this.state.containerHeight);
			// console.log('elementHeight',this.state.elementHeight);
			// debugger;

		// } else {			
			// this.componentUpdatedCount++;
			
			// console.log('BBBBBBBB');
			// console.log('containerHeight',this.state.containerHeight);
			// console.log('elementHeight',this.state.elementHeight);
			// console.log(this.state.currentList);
			// debugger;
		// }		
		
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
				<div onScroll={this.handleScroll} ref="booksList" className="bookslist">
				{					
					this.state.currentList.map(book => {
						index++;
						// console.log('BOOKAAA',book);
						if(index===1) {
							return <Book key={book._id} marginTop={this.state.marginTop} marginBottom={0} setElementHeight={this.setElementHeight} id={book._id} title={book.title.substring(0,20)} author={book.authors[0].substring(0,20)}/>
						}else if(index===this.state.currentList.length) {
							return <Book  key={book._id} marginTop={0} marginBottom={this.state.marginBottom} setElementHeight={this.setElementHeight} id={book._id} title={book.title.substring(0,20)} author={book.authors[0].substring(0,20)}/>
						} else {			
							return <Book  key={book._id} marginTop={0} marginBottom={0} setElementHeight={this.setElementHeight} id={book._id} title={book.title.substring(0,20)} author={book.authors[0].substring(0,20)}/>
						}
					})
				}
				</div>
		)
	}
}

export default BooksList;