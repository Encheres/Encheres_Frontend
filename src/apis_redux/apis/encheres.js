import axios from 'axios';
const baseURL = "";
const devURL = "http://localhost:3001"
const ipfs_base_url = "https://ipfs.io/ipfs/";

const record =  axios.create({
    baseURL:devURL
})
const authRecord =(token) => axios.create({
    baseURL: devURL,
    headers: {'Authorization': 'Bearer '+ token}
  });


// contract address -> address of contract deployed on Kaliedo
// account -> address of metamask account that is sending the transaction
const Kaliedo_api = (contractAddress, account) => axios.create({
    baseURL: `https://thingproxy.freeboard.io/fetch/https://u0w0uw8pk4-u0nk78oaha-connect.us0-aws.kaleido.io/gateways/`,
    headers:{
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'Basic '+process.env.REACT_APP_KALEIDO_AUTH_TOKEN,
      'address': contractAddress,
      'kld-from':account
  }
})

export {authRecord, record, devURL, ipfs_base_url, Kaliedo_api}