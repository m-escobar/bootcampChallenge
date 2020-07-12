import axios from 'axios';
import {} from 'dotenv/config';

//Define a URL base da origem para consumo do servico
export default axios.create({
  
  baseURL: process.env.REACT_APP_BASEURL,
  headers: {
    'Content-type': 'application/json',
  },
});
