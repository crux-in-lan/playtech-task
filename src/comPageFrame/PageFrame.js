import React from 'react';
import './css/PageFrame.scss';

const PageFrame = (props) => {
	return (
		<div className="pageframe">
			{
				props.children
			}
		</div>
	)
}

export default PageFrame;