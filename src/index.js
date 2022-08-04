import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./styles/main.css";
import WordContextProvider from './context/WordContext';

ReactDOM.render(
    <React.StrictMode>
		<WordContextProvider>
			<App />
		</WordContextProvider>	
  	</React.StrictMode>,
  	document.getElementById('root')
);

