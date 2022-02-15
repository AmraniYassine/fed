const path = require("path");
const fs = require("fs-extra");
const solc = require("solc");

const buildPath = path.resolve(__dirname, 'build/contracts');
fs.removeSync(buildPath); //deletes the build folder

const contractPath = path.resolve(__dirname, 'contracts', 'Election.sol');
const source = fs.readFileSync(contractPath, 'utf-8');

const output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath); //checks if exists; if doesn't, create one

for(let contract in output) {
	fs.outputJsonSync(
		path.resolve(buildPath,contract.replace(':','') +  '.json'), 
		output[contract]
	);
}