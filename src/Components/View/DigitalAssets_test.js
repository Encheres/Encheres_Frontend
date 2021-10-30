import React, { Component } from 'react';
import Web3 from 'web3';
import AuctionContract from '../../abis_2/Auctions.json';

class DigitalAsset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account_address: '',
            auction_contract:'',
        }
    }

    loadWeb3 = async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        }
        else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        }
        else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
        }
        // console.log(window.web3);
    }

    loadContract = async () => {
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts()
        this.setState({account_address: accounts[0]});
         
        const networkId = await web3.eth.net.getId();
        console.log(networkId);
        // const networkData = AuctionContract.networks[networkId]
        // const auction_contract = new web3.eth.Contract(AuctionContract.abi, networkData.address);
        // // console.log(auction_contract);
        // this.setState({
        //     auction_contract:auction_contract
        // }) 
    }
    
    createAuction = async () => {
        const { auction_contract } = this.state;
        const nft_id = 1;
        const auctionStartprice = 100;
        const accounts  = await window.web3.eth.getAccounts();
        const account = accounts[0];
        const end_time = Date.now() + 36000000;
        let data = {_nftId:nft_id, _ownerAccount:account, _ownerId:1,_auctionEndTime:end_time, _auctionStartPrice:auctionStartprice};

        if(auction_contract){
            // 
            const res = await auction_contract.methods.CreateAuction(data._nftId, data._ownerAccount, data._ownerId, 
                data._auctionEndTime, data._auctionStartPrice).send({from:account});
            console.log(res);
            // const res = await auction_contract.methods.CreateAuction();

        }
    }
    
    getAuctionDetails = async (nft_id) => {
        const { auction_contract } = this.state;
        if(auction_contract){
            const auction_details = await auction_contract.methods.GetAuctionDetails(nft_id).call();
            console.log(auction_details);
        }
    }
    getAuctionsList = async () => {
        const { auction_contract } = this.state;
        if(auction_contract){
            const auctions_list = await auction_contract.methods.GetAvaliableAuctionsList().call();
            console.log(auctions_list);
        }
    }

    bidAuction = async () => {
        const { auction_contract } = this.state;
        const nft_id = 1;
        const bid_price = 100;
        const bidder_id = 1;

        const { account_address } = this.state;
        if(auction_contract){
            const res = await auction_contract.methods.BidAuction(nft_id, bid_price, bidder_id, account_address).send({from:account_address});
            console.log(res);
        }
    }



    getData = async () => {
        const { auction_contract } = this.state;
        if(auction_contract){
            await this.createAuction();
        }
    }

    init = async () => {
        try{
            await this.loadWeb3();
            await this.loadContract();
            // await this.getData();
        }catch(error){
            console.log(error);
        }
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.init();
    }

    render(){
        return(
            <div>
                <button className='' onClick={this.handleSubmit}>Click Here</button>
            </div>
        )
    }
}

export default DigitalAsset;