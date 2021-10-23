// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.5.0;


contract Account {
    
    string public name = "Account";
    uint public usersCount = 0;

    struct User {
        uint id;
        address payable owner;
        string centralDBID;
        uint[] transactions;
        uint[] ownedAssets;
        uint[] createdAssets;
    }

    mapping(uint => User) public Users;

    event UserCreated(
        uint id,
        address owner,
        string centralDBID,
        uint[] transactions,
        uint[] ownedAssets,
        uint[] createdAssets
    );

    event PaymentReceived(
        uint receiverId,
        uint amount
    );

    function createAccount(string memory _centralDBID) public {

        require(bytes(_centralDBID).length > 0);

        usersCount++;

        Users[usersCount] =  User(usersCount, msg.sender, _centralDBID, new uint[](0), new uint[](0), new uint[](0));

        emit UserCreated(usersCount, msg.sender, _centralDBID, new uint[](0), new uint[](0), new uint[](0));
    }

    function receivePayment(uint _receiverId) public payable {

        require(msg.value > 0);

        User memory _receiver = Users[_receiverId];

        address payable _receiverAddress = _receiver.owner;

        address(_receiverAddress).transfer(msg.value);

        emit PaymentReceived(_receiverId, msg.value);
    }
}