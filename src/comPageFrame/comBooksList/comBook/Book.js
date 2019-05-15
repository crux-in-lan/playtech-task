import React,{Component} from 'react';
import './css/Book.scss';
class Book extends Component {
	constructor(props){
		super(props);		
	}

	// componentDidUpdate() {
	// 	console.log(this.state.height);
	// }

	render() {
		const {title, author, refCallbackElementHeight} = this.props;
		return (
			<div ref={refCallbackElementHeight} className='book'>
				<div className='title'>{title}</div>
				<div className='author'>{author}</div>
			</div>
		)
	}
}

export default Book;