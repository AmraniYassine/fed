const assert = require('assert');
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const eF = require('./build/contracts/ElectionFact.json');

const provider = new HDWalletProvider(
	['0x7d1903176e6003021cfb81497413101558cd576185f3a0aa74ac6404b595e194'],
	'http://localhost:7545'
);
const web3 = new Web3(provider);

const deploy = async () => {
	const accounts = await web3.eth.getAccounts();

	console.log('Attemping to deploy from account', accounts[0]);

	const result = await new web3.eth.Contract(JSON.parse(eF.abi))
		.deploy({ data: '0x' + eF.bytecode })
		.send({ gas: '3000000', from: accounts[0] });

	console.log('Contract deployed to: ', result.options.address);
};
deploy();
