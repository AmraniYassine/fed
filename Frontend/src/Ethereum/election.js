import web3 from './web3';
import Election from './build/contracts/Election.json';

export default address => {
    return new web3.eth.Contract( Election.abi, address );  
};