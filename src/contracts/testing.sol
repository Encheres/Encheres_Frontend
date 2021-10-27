pragma solidity ^0.5.0;

contract Testing {
    string public name = "";
    string public age = "";

    function setAge(string memory _age) public {
        age = _age;
    }

    function setName(string memory _name) public {
        name = _name;
    }

    function test() public returns (uint) {
        return 1;
    }
}
