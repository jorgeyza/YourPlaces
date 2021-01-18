import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';

const { REACT_APP_GOOGLE_API_KEY } = process.env;

// Create the script tag, set the appropriate attributes
var script = document.createElement('script');
script.src = `https://maps.googleapis.com/maps/api/js?key=${REACT_APP_GOOGLE_API_KEY}`;
script.defer = true;

// Attach your callback function to the `window` object
window.initMap = function () {
  // JS API is loaded and available
};

// Append the 'script' element to 'head'
document.head.appendChild(script);

ReactDOM.render(<App />, document.getElementById('root'));
