const Account = artifacts.require('Account');

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Account', ([deployer, receiver, payer]) => {
    let account

    before(async () => {
        account = await Account.deployed()
    })

    describe('deployment', async () => {
        it('deploys successfully', async () => {
        const address = await account.address
        assert.notEqual(address, 0x0)
        assert.notEqual(address, '')
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
        })

        it('has a name', async () => {
            const name = await account.name()
            assert.equal(name, 'Account')
        })
    })

    describe('users', async () => {
        let result, usersCount, centralDBID = "abc123", owner = "0x54a9E30cD33A30F9A8a953983473f3C419521fBb";
        let createdAssets = [];

        before(async () => {
            result = await account.createAccount(centralDBID)
            usersCount = await account.usersCount()
        })

        it('creates user', async () => {
            // SUCESS
            assert.equal(usersCount, 4)
            const event = result.logs[0].args

            assert.equal(event.id.toNumber(), usersCount.toNumber(), 'id is correct')
            assert.equal(event.owner, owner, 'centeral Db Id is correct')
            assert.equal(event.centralDBID, centralDBID, 'centeral Db Id is correct')
            assert.equal(event.transactions.length, 0, 'has transactions array of length 0')
            assert.equal(event.ownedAssets.length, 0, 'has owned assets array of length 0')
            assert.equal(event.createdAssets.length, 0, 'has created assets array of length 0')

            // FAILURE: User must have centeral DB id
            await account.createAccount('').should.be.rejected
                
        })

        //check from Struct
        it('lists user', async () => {
            const user = await account.Users(owner)
            assert.equal(user.id.toNumber(), usersCount.toNumber(), 'Centeral DB ID is correct')
            assert.equal(user.centralDBID, centralDBID, 'Centeral DB ID is correct')
        })

        it('allows reception of payment', async () => {

            result = await account.receivePayment(owner, { from: payer, value: web3.utils.toWei('1', 'Ether') })

            // SUCCESS
            const event = result.logs[0].args
            assert.equal(event.receiver, owner, 'receiverId is correct')
            assert.equal(event.amount, '1000000000000000000', 'amount is correct')

        })

        it('allows account transactions update', async () => {

            result = await account.updateAccountTransactions(owner, 1000)

            // SUCCESS
            const event = result.logs[0].args
            assert.equal(event.owner, owner, 'receiverId is correct')
            assert.equal(event.transactionId, 1000, 'transactionId is correct')
            assert.equal(event.transactions.length, 1, 'transactions update is correct')

        })

        it('allows account owned assets insertion', async () => {

            result = await account.updateAccountOwnedAssets(owner, 1001, 1)

            // SUCCESS
            const event = result.logs[0].args
            assert.equal(event.owner, owner, 'receiverId is correct')
            assert.equal(event.assetId, 1001, 'assetId is correct')
            assert.equal(event.ownedAssets.length, 1, 'owned Assets update is correct')

        })

        it('allows account owned assets deletion', async () => {

            result = await account.updateAccountOwnedAssets(owner, 1001, 2)

            // SUCCESS
            const event = result.logs[0].args
            assert.equal(event.owner, owner, 'receiverId is correct')
            assert.equal(event.assetId, 1001, 'assetId is correct')
            assert.equal(event.ownedAssets.length, 0, 'owned Assets update is correct')

        })

        it('allows account created Assets update', async () => {

            result = await account.updateAccountCreatedAssets(owner, 1000)

            // SUCCESS
            const event = result.logs[0].args
            assert.equal(event.owner, owner, 'receiverId is correct')
            assert.equal(event.assetId, 1000, 'assetId is correct')
            assert.equal(event.createdAssets.length, 1, 'created Assets update is correct')

        })
        
    })


})