import React,{Component} from 'react';
import './css/Book.scss';

class FirstBook extends Component {
	constructor(props){
		super(props);		
	}

	// componentDidUpdate() {
	// 	console.log(this.state.height);
	// }

	componentDidMount() {
		this.props.setElementHeight(this.refs.firstBook.getBoundingClientRect().height);
		this.props.setCalculated(true);
	}

	render() {
		const {title, author, marginTop, marginBottom} = this.props;
		return (
			<div style={{marginTop: marginTop,marginBottom: marginBottom}} ref='firstBook' className='book'>
				<div className='title'>{title}</div>
				<div className='author'>{author}</div>
			</div>
		)
	}
}

export default FirstBook;