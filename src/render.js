import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom"

export let rerenderEntireTree = (state, addPost, updateNewPostText) => {
	ReactDOM.render(
  		<React.StrictMode>
    		<BrowserRouter>
    			<App state={state} addPost={addPost} updateNewPostText={updateNewPostText}/>
    		</BrowserRouter>	
  		</React.StrictMode>,
  		document.getElementById('root')
	)
}