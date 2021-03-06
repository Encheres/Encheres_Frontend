// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;


contract Account {
    
    string public name = "Account";
    uint public usersCount = 0;

    struct User {
        uint id; // User ID
        address owner; // User Account Address
        string centralDBID; // UserID of MongoDB
        uint[] transactions; // transactions realted to user 
        uint[] ownedAssets; // list of asset ids owned by user
        uint[] createdAssets; // list of asset ids created by user
    }

    mapping(address => User) public Users;

    event UserCreated(
        uint id,
        address owner,
        string centralDBID,
        uint[] transactions,
        uint[] ownedAssets,
        uint[] createdAssets
    );

    event PaymentReceived(
        address receiver,
        uint amount
    );

    event TransactionsUpdated(
        address owner,
        uint transactionId,
        uint[] transactions
    );

    event OwnedAssetsUpdated(
        address owner,
        uint assetId,
        uint[] ownedAssets
    );

    event CreatedAssetsUpdated(
        address owner,
        uint assetId,
        uint[] createdAssets
    );

    function getAccountCreatedAssets(address _userAccountAddress) public view returns(uint[] memory, uint) {

        User storage user = Users[_userAccountAddress];
        uint[] memory createdAssets = user.createdAssets;
        return (createdAssets, createdAssets.length);
    }

    function getAccountOwnedAssets(address _userAccountAddress) public view returns(uint[] memory, uint) {

        User storage user = Users[_userAccountAddress];
        uint[] memory ownedAssets = user.ownedAssets;
        return (ownedAssets, ownedAssets.length);
    }

    function getAccountTransactions(address _userAccountAddress) public view returns(uint[] memory, uint) {

        User storage user = Users[_userAccountAddress];
        uint[] memory transactions = user.transactions;
        return (transactions, transactions.length);
    }

    function createAccount(string memory _centralDBID) public {

        require(bytes(_centralDBID).length > 0);

        usersCount++;

        Users[msg.sender] =  User(usersCount, msg.sender, _centralDBID, new uint[](0), new uint[](0), new uint[](0));

        emit UserCreated(usersCount, msg.sender, _centralDBID, new uint[](0), new uint[](0), new uint[](0));
    }

    function updateAccountTransactions(address _userAccountAddress, uint _transactionId) public {

        User storage user = Users[_userAccountAddress];

        user.transactions.push(_transactionId);

        emit TransactionsUpdated(_userAccountAddress, _transactionId, user.transactions);
    }

    function updateAccountCreatedAssets(address _userAccountAddress, uint _assetId) public {

        User storage user = Users[_userAccountAddress];

        user.createdAssets.push(_assetId);

        emit CreatedAssetsUpdated(_userAccountAddress, _assetId, user.createdAssets);
    }

    function updateAccountOwnedAssets(address _userAccountAddress, uint _assetId, uint _opType) public {

        User storage user = Users[_userAccountAddress];

        if(_opType == 1){
            user.ownedAssets.push(_assetId);
        }
        else if(_opType == 2){

            uint _assetPos = 0;

            // Finding position for required assetid in array
            for(uint i=0;i<user.ownedAssets.length;i++){

                if(_assetId == user.ownedAssets[i]){
                    _assetPos = i;
                    break;
                }
            }

            if(_assetPos == 0){
                emit OwnedAssetsUpdated(_userAccountAddress, _assetId, user.ownedAssets);
                return;
            }
            

            // Shifting elements to maintain the order after deletion.
            for(uint i=_assetPos;i<user.ownedAssets.length-1;i++){
                user.ownedAssets[i] = user.ownedAssets[i+1];
            }

            user.ownedAssets.pop();
        }

        emit OwnedAssetsUpdated(_userAccountAddress, _assetId, user.ownedAssets);
    }

    function receivePayment(address _receiverAccountAddress) public payable {

        require(msg.value > 0);

        payable(_receiverAccountAddress).transfer(msg.value);

        emit PaymentReceived(_receiverAccountAddress, msg.value);
    }
}