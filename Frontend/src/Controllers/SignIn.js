import axios from "axios"
import web3 from '../Ethereum/web3'
import Election_Factory from "../Ethereum/election_factory";
import Cookies from "js-cookie";
const signin = {}


signin.admin = async (email, password) =>
{
    const result = await (await axios.post('http://localhost:3000/admin/signin', {email: email, password: password})).data;
    if(result.status === "success")
    {
        try {
            const accounts = await web3.eth.getAccounts()
            const summary = await Election_Factory.methods.getDeployedElection(email).call({ from: accounts[0] });
            if(summary[2] === "Create an election.")
            {
                document.location.href = "/election/create";
                Cookies.set('admin_email', email);
            }
            else {
                Cookies.set('address', summary[0]);
                Cookies.set('admin_email', email);
                document.location.href = "/election/dashboard";
            }
        } catch (error) {
            console.log(error)
        }
    }
    else
    {
        alert(result.message)
    }
}
signin.voter = async (email, password) =>
{
    const result = await (await axios.post('http://localhost:3000/voter/signin', {email: email, password: password})).data;
    if(result.status === "success")
    {
        Cookies.set('voter_email', result.data.email)
        Cookies.set('address', result.data.election_address);
        document.location.href = "/election/vote";
    }
    else
    {
        alert(result.message)
    }
}

export default signin