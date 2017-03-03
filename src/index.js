// Ici on code notre App
import React from 'react';
import { render } from 'react-dom';

//Import des css 
import './style/css/bootstrap.css'
import './index.css'

//JS PERSO 
import { sampleText } from './sampleText'

import marked from 'marked'; 

class App extends React.Component {


	state = {
		text: sampleText 
	}
	//Lorsque le component se charge
	componentWillMount() {
		const localStorageText = localStorage.getItem('text');
		//console.log(localStorageText);

		if(localStorageText) {
			this.setState({text : localStorageText})
		}
	}
	//Lorsque le component se met à jours 
	componentWillUpdate(nextProps, nextState) {
		localStorage.setItem('text' , nextState.text) ;
	}	

	editText = (event) => {
		const text = event.target.value ; 
		this.setState( { text });
	}

	renderText = (text) => {
		const renderText = marked(text, {sanitize:true});
		return { __html : renderText };
	}

	render() {   
		return (
				 
				<div className="container">
					<div className="row">
						<div className="col-sm-6"> 
							<textarea 
							rows="35" 
							className="form-control" 
							value={this.state.text}
							onChange={ (e) => this.editText(e)}
							> 
							</textarea>
							
						</div>		
						<div className="col-sm-6">
							<div dangerouslySetInnerHTML={this.renderText(this.state.text)}>

							</div>

						</div>					
					</div>
				</div>

			)
	}
}

render(
	<App />,
	document.getElementById('root')
);