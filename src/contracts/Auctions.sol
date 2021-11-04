// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

contract Auctions{
    // for each nft item uploaded by user, we will create an auction
    uint public keysCount = 0;

    struct keyManager{
        uint nft_key_Id;
    }

    mapping(uint => keyManager) public keyManagerMap;


    struct Auction{
        // auction Owner Details
        address payable ownerAccount;
        address payable creatorAccount;
        
        // auction details
        uint256 auctionEndTime;
        uint auctionStartPrice; // initial price set by user.
        uint auctionCurrentBid; // current highest bid
        address payable auctionBuyer; // wallet address of current highest bidder
        uint royality; // amount of ether to be paid to the creator of the auction

        // helper variables
        bool auctionEnded;
        bool bidStarted;
    }
    // mapping of nft id to auction
    mapping(uint => Auction) public auctionMap;

    event AuctionDetails(
        address payable ownerAccount,
        uint256 auctionEndTime,
        uint auctionStartPrice,
        uint auctionCurrentBid,
        bool auctionEnded,
        bool bidStarted
    );

    event auctionCreated(
        uint nftId,
        uint256 auctionEndTime,
        uint auctionStartPrice
    );

    event bidCreated(
        uint nftId,
        uint auctionCurrentBid,
        address payable auctionBuyer
    );

    event auctionEnded(
        uint nftId,
        uint auctionCurrentBid,
        address payable auctionBuyer
    );

    function CreateAuction(uint _nftId, address payable _ownerAccount, uint256 _auctionEndTime, uint256 _auctionCreationTime, uint _auctionStartPrice, address payable _creatorAccount, uint _royality ) public payable{
        require(_nftId >= 0, "Invalid NFT ID");
        require(_auctionEndTime > _auctionCreationTime, "Invalid auction endtime. Your auction must end in future"); //  block.timestamp is a substitute for now/ current time
        require(_auctionStartPrice > 0, "Invalid auction start price. Your auction must start with a positive price");
        bool isIdPresent = false;
        for(uint i = 0; i < keysCount; i++){
            if(keyManagerMap[i].nft_key_Id == _nftId){
                isIdPresent = true;
                break;
            }
        }
        if(!isIdPresent){
            keyManagerMap[keysCount].nft_key_Id = _nftId;
            keysCount++;
        }
        auctionMap[_nftId].creatorAccount = _creatorAccount;
        auctionMap[_nftId].royality = _royality;
        auctionMap[_nftId].ownerAccount = _ownerAccount; // owner's account address
        // auctionMap[_nftId].ownerId = _ownerId; // owner's account id
        auctionMap[_nftId].auctionEndTime = _auctionEndTime;
        auctionMap[_nftId].auctionStartPrice = _auctionStartPrice;
        auctionMap[_nftId].auctionCurrentBid = 0;
        auctionMap[_nftId].bidStarted = false;
        auctionMap[_nftId].auctionEnded = false;
        emit auctionCreated(_nftId, _auctionEndTime, _auctionStartPrice);
    }

    function BidAuction(uint _nftId, uint _auctionCurrentBid, address payable _auctionBuyer, uint256 _bidTime) public payable{
        require(_nftId >= 0, "Invalid nftId");
        require(_auctionCurrentBid > 0, "Invalid bid amount");
        require(_auctionBuyer != address(0), "Invalid bidder wallet address"); // address(0) is a substitute for null address
        require(auctionMap[_nftId].auctionEnded == false, "Auction has ended");
        require(_bidTime<=auctionMap[_nftId].auctionEndTime, "Auction has ended");
        require(_auctionCurrentBid>=auctionMap[_nftId].auctionStartPrice, "Bid amount must be greater than start price");

        if(!auctionMap[_nftId].bidStarted){
            auctionMap[_nftId].auctionCurrentBid = _auctionCurrentBid;
            auctionMap[_nftId].auctionBuyer = _auctionBuyer;
            auctionMap[_nftId].bidStarted = true;
        }
        else{
            require(auctionMap[_nftId].auctionBuyer != _auctionBuyer, "You are already the highest bidder");
            require(auctionMap[_nftId].auctionCurrentBid < _auctionCurrentBid, "Your bid is lower than the current bid");
            address payable previousBidder = auctionMap[_nftId].auctionBuyer;
            previousBidder.transfer(auctionMap[_nftId].auctionCurrentBid);
            auctionMap[_nftId].auctionCurrentBid = _auctionCurrentBid;
            auctionMap[_nftId].auctionBuyer = _auctionBuyer;
        }
        emit bidCreated(_nftId, _auctionCurrentBid, _auctionBuyer);
    }

    function EndAuction(uint _nftId, uint256 _endTime) public payable{
        require(_nftId >= 0, "Invalid nftId");
        require(auctionMap[_nftId].auctionEnded == false, "Auction has already ended");
        require(_endTime>=auctionMap[_nftId].auctionEndTime, "Auction has not ended yet");
        auctionMap[_nftId].auctionEnded = true;
        if(auctionMap[_nftId].bidStarted){
            uint royality = auctionMap[_nftId].royality;
            auctionMap[_nftId].auctionBuyer.transfer(auctionMap[_nftId].auctionCurrentBid*(100-royality)/100); // transfer the highest bid amount to the auction creator
            auctionMap[_nftId].ownerAccount.transfer(auctionMap[_nftId].auctionCurrentBid*royality/100); // transfer the highest bid amount to the auction owner
            auctionMap[_nftId].ownerAccount = auctionMap[_nftId].auctionBuyer; // update the owner account to the highest bidder wallet address
            auctionMap[_nftId].auctionBuyer = payable(address(0)); // set the auction buyer to null address
            auctionMap[_nftId].bidStarted = false;
        }
        emit auctionEnded(_nftId,  auctionMap[_nftId].auctionCurrentBid, auctionMap[_nftId].ownerAccount);
    }

    function GetAuctionDetails(uint _nftId) public view returns(address payable, uint256, uint, uint, bool, bool, address payable){
        require(_nftId >= 0, "Invalid nftId");
        return (auctionMap[_nftId].ownerAccount, auctionMap[_nftId].auctionEndTime, auctionMap[_nftId].auctionStartPrice, auctionMap[_nftId].auctionCurrentBid, auctionMap[_nftId].auctionEnded, auctionMap[_nftId].bidStarted, auctionMap[_nftId].auctionBuyer);
    }

    function GetAvaliableAuctionsList() public view returns(uint[] memory){
        uint[] memory avaliableAuctions = new uint[](keysCount);
        uint index = 0;
        for(uint i = 0; i < keysCount; i++){
            uint nft_Id = keyManagerMap[i].nft_key_Id;
            if(auctionMap[nft_Id].auctionEnded == false){
                avaliableAuctions[index] = nft_Id;
                index++;
            }
        }
        return avaliableAuctions;
    }

}
