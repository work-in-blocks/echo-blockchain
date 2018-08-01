//import react into the bundle
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

//include jquery into the bundle and store its contents into the $ variable
//include bootstrap npm library into the bundle
import 'bootstrap';

//include your index.scss file into the bundle
import '../styles/index.scss';

import Web3 from 'web3';

import 'truffle-contract';

//import your own components
import Layout from './Layout.jsx';

import '../contracts/Echo.json';

//render your react application
ReactDOM.render(<Layout/>, document.querySelector('#app'))
;