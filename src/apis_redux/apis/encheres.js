import axios from 'axios';
const baseURL = "";
const devURL = "http://localhost:3001"
const ipfs_base_url = "https://ipfs.infura.io/ipfs/";
const record =  axios.create({
    baseURL:devURL
})
const authRecord =(token) => axios.create({
    baseURL: devURL,
    headers: {'Authorization': 'Bearer '+ token}
  });
export {authRecord, record, devURL, ipfs_base_url}