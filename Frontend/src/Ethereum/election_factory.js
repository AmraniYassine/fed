import web3 from './web3';
import ElectionFactory from './build/contracts/ElectionFact.json';

const myInstance = {};

try {
    myInstance.instance = new web3.eth.Contract( ElectionFactory.abi, '0x0ed274DD2FF93580bA853675E14ace4376e5E4bB' );
    
} catch (error) {
    console.log(error)
}

export default myInstance.instance;
