import axios from 'axios';
const baseURL = "";
const devURL = "http://localhost:3001"
const record =  axios.create({
    baseURL:devURL
})
const authRecord =(token) => axios.create({
    baseURL: devURL,
    headers: {'Authorization': 'Bearer '+ token}
  });
export {authRecord, record}