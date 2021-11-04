// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import './Accounts.sol';

contract NftAsset is ERC721 {
    
    uint public assetsCount = 0;

    struct Asset {
        uint tokenId; // NFT asset ID
        address creator; // Creator of NFT 
        string assetFileHash; // NFT Asset file hash hosted on IPFS
        string name; // Unique name for NFT
        string description; // Description of NFT asset properties
        uint[] categories; // categories to which NFT belongs
        string royality; // royality for NFT creator
    }

    mapping (uint => Asset) public assets;

    mapping(string => bool) private _assetNameExists;

    Account account = new Account();

    constructor() ERC721("NftAsset", "NFTASSET") {
    }

    event NftAssetMinted(
        uint tokenId,
        address creator,
        string assetFileHash,
        string name,
        string description,
        uint[] categories,
        string royality
    );

    event OwnershipTransfered(
        address from,
        address to,
        uint tokenId
    );

    function mintNftAsset(string memory name_, string memory _assetFileHash,
        string memory _description, uint[] memory _categories, string memory _royality) public {

        // Check for uniqueness of asset name.
        require(!_assetNameExists[name_]);

        assetsCount++;

        // Adding this asset in CreatedAssets list for minter.
        account.updateAccountCreatedAssets(msg.sender, assetsCount);

        // Adding this asset in OwnedAssets list for minter.
        account.updateAccountOwnedAssets(msg.sender, assetsCount, 1);

        assets[assetsCount] = Asset(assetsCount, msg.sender, _assetFileHash, name_, _description, _categories, _royality);
        
        // safely minting new asset.
       _safeMint(msg.sender, assetsCount);

        // setting mapping for name_ to maintain uniqueness.
        _assetNameExists[name_] = true;

        emit NftAssetMinted(assetsCount, msg.sender, _assetFileHash, name_, _description, _categories, _royality);
    }

    function transferAssetOwnership(address _from, address _to, uint _tokenId) public {

        // Check for existence of token whose ownership transfer is requested.
        require(_exists(_tokenId));

        account.updateAccountOwnedAssets(_to, _tokenId, 1);

        account.updateAccountOwnedAssets(_from, _tokenId, 2);

        // transfering ownership from _from to _to.
        _transfer(_from, _to, _tokenId);

        emit OwnershipTransfered(_from, _to, _tokenId);
    }

    function getAssetCategories(uint _tokenId) public view returns(uint[] memory, uint){

        // Check for existence of token.
        require(_exists(_tokenId));

        Asset storage asset = assets[_tokenId];
        uint[] memory categories = asset.categories;
        return (categories, categories.length);
    }

    function getAccountCreatedAssets() public view returns (uint[] memory, uint) {
        return account.getAccountCreatedAssets(msg.sender);
    }

    function getAccountOwnedAssets() public view returns (uint[] memory, uint) {
        return account.getAccountOwnedAssets(msg.sender);
    }

    function getAssetDetails(uint _tokenId) public view returns (uint tokenId, string memory, string memory, string memory, string memory, uint[] memory){

        // Check for existence of token.
        require(_exists(_tokenId));
        Asset storage asset = assets[_tokenId];
        string memory name = asset.name;
        string memory description = asset.description;
        uint[] memory categories = asset.categories;
        string memory assetFileHash = asset.assetFileHash;
        string memory royality = asset.royality;
        return (_tokenId, name, description, assetFileHash, royality, categories);
    }

}