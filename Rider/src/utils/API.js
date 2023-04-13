import axios from 'axios';
import React, {useState, useEffect, useRef} from 'react';
import {showResponseError} from './Constant';
// import AsyncStorage from '@react-native-community/async-storage';
// import Loading from './Loading';

const Client = (TOKEN = null) =>
  axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
    timeout: 3000,
    headers: {
      Accept: 'application/json',
      Authorization: TOKEN,
    },
  });

const useAxiosGet = async (url, payload, showLoader) => {
  try {
    const response = await Client().get('todos/w1');
    return {
      data: response.data,
      status: response.status,
      message: response.message,
      success: true,
    };
  } catch (error) {
    return {error: showResponseError(error), success: false};
  }
};

export {useAxiosGet};