import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import Voterlogin from './Pages/VoterLogin';
import Adminlogin from './Pages/AdminLogin';
import CreateElection from './Pages/CreateElection';
import AdminDashboard from './Pages/AdminDashboard';
import Candidatelist from './Pages/CandidateList';
import Voterlist from './Pages/VoterList';
import Votingpage from './Pages/VotingPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/voter-login" element={<Voterlogin />}/>
        <Route path="/admin-login" element={<Adminlogin />}/>
        <Route path="/election/create" element={<CreateElection />}/>
        <Route path="/election/dashboard" element={<AdminDashboard />}/>
        <Route path="/election/candidates" element={<Candidatelist />}/>
        <Route path="/election/voters" element={<Voterlist />}/>
        <Route path="/election/vote" element={<Votingpage />}/>
      </Routes>
    </div>
  );
}

export default App;
