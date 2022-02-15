import Cookies from "js-cookie";
import web3 from '../Ethereum/web3'
import Election_Factory from '../Ethereum/election_factory'
import axios from "axios";
import Election from '../Ethereum/election'
import { Grid, Table, Button, Form, Image, Header, Icon, Input, Menu, Modal, Sidebar, Container, Card } from 'semantic-ui-react';

const ElectionController = {}
ElectionController.create = async (election_name, election_description, loadingCallback, errorMessageCallback) =>
{ 
    loadingCallback(true);
    errorMessageCallback('')
    try {
        const email = Cookies.get('admin_email');
        const accounts = await web3.eth.getAccounts();
        const bool = await Election_Factory.methods
            .createElection(email, election_name, election_description)
            .send({ from: accounts[0] });

        if (bool) {
            const summary = await Election_Factory.methods.getDeployedElection(email).call();
            Cookies.set('address', summary[0]);
            document.location.href = "/election/dashboard"
        }
    } catch (err) {
        errorMessageCallback(err);
    }
}

ElectionController.getAllVoters = async (setVoterCount, setVoters, setCandidates, setElection_name, setElection_desc, setGraphEmail, setGraphVotes, returnGraph) =>
{
    const graphEmail = [];
    const graphVotes = [];
    const voters = await (await axios.get(`http://localhost:3000/voter/all/${Cookies.get('address')}`)).data;
    try {
        const add = Cookies.get('address');
        console.log(add)
        const election = Election(add);
        const summary = await election.methods.getElectionDetails().call();
        console.log(summary)
        const numberOfVoters = await election.methods.getNumOfVoters().call();
        setVoters(voters.data.length);
        setVoterCount(numberOfVoters)
        const candidates = await election.methods.getNumOfCandidates().call();
        setCandidates(candidates);
        setElection_name(summary[0]);
        setElection_desc(summary[1]);
        console.log("hello")
        for (let i = 0; i < candidates; i++) {
            const tp = await election.methods.getCandidate(i).call();
            graphEmail.push(tp[0]);
            graphVotes.push(tp[3]);
        }
        setGraphEmail(graphEmail);
        setGraphVotes(graphVotes)
        console.log(graphEmail);
        console.log(graphVotes);
    } catch (err) {
        console.log(err.message);
        alert('Redirecting you to login page...');
        document.location.href = "/admin-login"
    }
}

ElectionController.getAllCandidates = async (setCandidates, setElection_name, setElection_desc, setItems) =>
{
    try {
        const address = Cookies.get('address');
        const election = Election(address);
        const summary = await election.methods.getElectionDetails().call();
        setElection_name(summary[0]);
        setElection_desc(summary[1]);
        const candidateCount = await election.methods.getNumOfCandidates().call();
        if(candidateCount == 0)
            alert("Register a candidate first!");
        let candidates = [];
        for(let i=0 ; i<candidateCount; i++) {
            candidates.push(await election.methods.getCandidate(i).call());
        }
        let i=-1;
        const items = candidates.map(candidate => {
            i++;
            console.log(candidate);
            return {
            header: candidate[0],
            description: candidate[1],
            extra: (
                <div>
                    <Icon name='pie graph' iconPostion='left'/>  
                    {candidate[3].toString()}  
                </div>
            ) 
        };
        
    });
    setItems(items) 
    } catch(err) {
        console.log(err.message);
        alert("Redirecting you to login page...");
        document.location.href = "/admin-login"
    }
}

ElectionController.addCandidate = async (cand_name, cand_desc, email, setLoading, election_name) =>
{
        setLoading(true)
        const accounts = await web3.eth.getAccounts();
        
        try {           
            const address = Cookies.get('address');
            const election = Election(address);

            election.methods.addCandidate(cand_name,cand_desc,'', email).send({
                from: accounts[0]}, (error, transactionHash) => {}
            );       
        
            alert("Added!");
        } catch (err) {
            alert(err);
        }
        //ajax script below
        const sendEmail = axios.post('http://localhost:3000/candidate/register', {email: email, election_name: election_name})
        alert(sendEmail.message)
        setLoading(false)
}

ElectionController.addVoter = async (email, election_address, election_name, election_desc) =>
{
    const registered = await(await axios.post(
        'http://localhost:3000/voter/register', 
        {email: email, election_address: election_address, election_name: election_name, election_description: election_desc})).data;
        alert(registered.message);
}
ElectionController.getRegisteredVoters = async (setElection_name, setElection_desc, setVoterEmails, setVoterIds, setItems) =>
{
    const voters = await (await axios.get(`http://localhost:3000/voter/all/${Cookies.get('address')}`)).data;
    const email = [];
    const id = []
    for(let voter of voters.data)
    {
        email.push(voter.email);
        id.push(voter.id); 
    }
    setVoterEmails(email);
    setVoterIds(id);
    try {
        const address = Cookies.get('address');
        const election = Election(address);
        const summary = await election.methods.getElectionDetails().call();
        setElection_name(summary[0]);
        setElection_desc(summary[1]);

        } catch(err) {
            console.log(err.message);
            alert("Redirecting you to login page...");
            document.location.href = "/admin-login"
        }
        let ea = [];
        ea = email;
        let ia = [];
        ia = id;            
        
        let i=-1;
        const items = id.map((ia,index) => {
            i++;
            return {
              header: email[i],
              description: (
                <div>                
                  <br />
                  
                  <Button negative basic id={ia} value={ia} 
                  onClick={() => {ElectionController.deleteVoter(email[index])}}
                  >Delete</Button>
                </div>
              )
            };
        });
        setItems(items);
}

ElectionController.deleteVoter = async (email) =>
{
    const deleted = await (await axios.delete(`http://localhost:3000/voter/${Cookies.get('address')}/${email}`)).data;
    alert(deleted.message);
}

ElectionController.getCandidatesToVote = async (setElection_name, setElection_desc, setItems) =>
{
    try {                               
        const add = Cookies.get('address');
        console.log(add)
        const election = Election(add);
        const summary = await election.methods.getElectionDetails().call();
        setElection_desc(summary[1])
        setElection_name(summary[0])           
        
        const candidatesCount = await election.methods.getNumOfCandidates().call();
        console.log(candidatesCount)
        let candidates = [];
        for(let i=0 ; i<candidatesCount; i++) {
            candidates.push(await election.methods.getCandidate(i).call());
        }
        console.log(candidates)
        let i=-1;
        console.log(candidates)
        const items = candidates.map(candidate => {
        i++;
        return {
          header: candidate[0],
          description: candidate[1],
          extra: (
              <div>
                <Icon name='pie graph' size='big' iconPostion='left'/>  
                {candidate[3].toString()}  
                <Button style={{float: 'left', backgroundColor: "#D0924B"}} 
                onClick={() => {ElectionController.vote(i)}} 
                primary>Vote!</Button>
            </div>
          ) 
        }});
        setItems(items);
        console.log(items)
    } catch(err) {
        console.log(err.message);
        alert("Session expired. Redirecting you to login page...");
        document.location.href = "/voter-login"
    }
}

ElectionController.vote = async (id) =>
{
    const accounts = await web3.eth.getAccounts();
    const address = Cookies.get('address');
    const election = Election(address);
    await election.methods.vote(id,Cookies.get('voter_email')).send({from: accounts[0]});
    alert("Voted!")    
}

ElectionController.endElection = async (election_name, setLoading) =>
{
	try {
		setLoading(true);
		const add = Cookies.get('address');
		const election = Election(add);
		const candidate = await election.methods.winnerCandidate().call();
		const cand = await election.methods.getCandidate(candidate).call();
        const sentEmails = await (await axios.post('http://localhost:3000/voter/resultMail', 
        {election_address: Cookies.get('address'), election_name: election_name, winner_candidate: cand[0], candidate_email: cand[4]})).data;
        alert(sentEmails.message)
		setLoading(false);
        document.location.href = "/admin-login"
		} catch (err) {
			console.log(err.message);
		}
}

export default ElectionController;