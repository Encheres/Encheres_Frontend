const NftAsset = artifacts.require('NftAsset');

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('NftAsset', ([deployer, receiver, payer]) => {
    let nftAsset

    before(async () => {
        nftAsset = await NftAsset.deployed()
    })

    describe('deployment', async () => {
        it('deploys successfully', async () => {
        const address = await nftAsset.address
        assert.notEqual(address, 0x0)
        assert.notEqual(address, '')
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
        })
    })

    describe('nftassets', async () => {
        let result, assetsCount, creator = "0x54a9E30cD33A30F9A8a953983473f3C419521fBb";
        let categories = [0,1,2];
        let assetFileHash = "123", name = "abc123", description = "description", royality = '1';

        before(async () => {
            result = await nftAsset.mintNftAsset(name, assetFileHash, description, categories, royality);
            assetsCount = await nftAsset.assetsCount()
        })

        it('mints asset', async () => {
            // SUCESS
            assert.equal(assetsCount, 1)
            const event = result.logs[0].args

            assert.equal(event.tokenId.toNumber(), assetsCount.toNumber(), 'id is correct')
            assert.equal(event.creator, creator, 'creator is correct')
            assert.equal(event.assetFileHash, assetFileHash, 'assetFileHash is correct')
            assert.equal(event.name, name, 'name is correct')
            assert.equal(event.description, description, 'description is correct')
            assert.equal(event.categories.length, 3, 'has categories array of length 3')
            assert.equal(event.royality, '1', 'royality is correct')

            // FAILURE: User must have centeral DB id
            //await account.createAccount('').should.be.rejected
                
        })

        //check from Struct
        it('lists asset', async () => {
            const asset = await nftAsset.assets(assetsCount)
            console.log(asset)
            assert.equal(asset.tokenId.toNumber(), assetsCount.toNumber(), 'tokenId is correct')
            assert.equal(asset.name, name, 'name is correct')
            //assert.equal(asset.categories.length, 3, 'has categories array of length 3')
        })

    })


})