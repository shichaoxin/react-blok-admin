import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';
import qs from 'qs';

/**
 * 请求参数的拦截
 */
axios.interceptors.request.use((config) => {
    const { method, data } = config;
    if (method.toLowerCase() === 'post' && typeof data === 'object') {
      config.data = qs.stringify(data);
    }
    let token = localStorage.getItem('token')
    if (token) {
      token = 'bearer ' + token.replace(/'|"/g, '') // 把token加入到默认请求参数中
  
      config.headers.common['Authorization'] = token
    }
    return config
  })



/**
 * 请求相应拦截
 */
axios.interceptors.response.use((res) => {
    return res.data;
})


ReactDOM.render( < App / > , document.getElementById('root'));


serviceWorker.unregister();