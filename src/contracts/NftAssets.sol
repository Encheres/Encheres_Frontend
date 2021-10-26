// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import './Accounts.sol';

contract NftAsset is ERC721 {
    
    uint public assetsCount = 0;

    struct Asset {
        uint tokenId;
        address creator;
        string assetFileHash;
        string name;
        string description;
        uint[] categories;
        string royality;
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

}