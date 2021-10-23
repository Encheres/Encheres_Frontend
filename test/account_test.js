
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
        let result, usersCount, centralDBID = "28deiuy873dd", owner = "0x777F5C4E25f6F822157d339635DB167C8A84A44e"        ;

        before(async () => {
            result = await account.createAccount(centralDBID)
            usersCount = await account.usersCount()
        })

        it('creates user', async () => {
            // SUCESS
            assert.equal(usersCount, 1)
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
            const user = await account.Users(usersCount)
            assert.equal(user.id.toNumber(), usersCount.toNumber(), 'Centeral DB ID is correct')
            assert.equal(user.centralDBID, centralDBID, 'Centeral DB ID is correct')
        })

        it('allows reception of payment', async () => {

            result = await account.receivePayment(usersCount, { from: payer, value: web3.utils.toWei('1', 'Ether') })

            // SUCCESS
            const event = result.logs[0].args
            assert.equal(event.receiverId, 1, 'receiverId is correct')
            assert.equal(event.amount, '1000000000000000000', 'amount is correct')

            // FAILURE: Tries to pay a user that does not exist
            //await account.receivePayment(99, { from: payer, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;
        })
    })


})