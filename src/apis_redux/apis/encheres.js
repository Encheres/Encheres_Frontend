import axios from 'axios';
const baseURL = "";
const devURL = "http://localhost:3001"
const ipfs_base_url = "https://ipfs.io/ipfs/";
const ai_model_api_url = "http://127.0.0.1:8000";
const record =  axios.create({
    baseURL:devURL
})
const authRecord =(token) => axios.create({
    baseURL: devURL,
    headers: {'Authorization': 'Bearer '+ token}
  });
export {authRecord, record, devURL, ipfs_base_url, ai_model_api_url}