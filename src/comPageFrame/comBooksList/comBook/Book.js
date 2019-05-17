import React,{Component} from 'react';
import './css/Book.scss';
class Book extends Component {
	constructor(props){
		super(props);		
	}

	// componentDidUpdate() {
	// 	console.log(this.state.height);
	// }

	componentDidMount() {
		// console.log('componentDidMount book');
		// console.log('Book height',this.refs.book.getBoundingClientRect().height);
		this.props.setElementHeight(this.refs.book.getBoundingClientRect().height);
	}

	render() {
		const {title, author, refCallbackElementHeight} = this.props;
		return (
			<div style={{marginTop:this.props.marginTop,marginBottom:this.props.marginBottom}} ref='book' className='book'>
				<div className='title'>{title}</div>
				<div className='author'>{author}</div>
			</div>
		)
	}
}

export default Book;