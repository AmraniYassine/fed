import React from 'react';
import { Grid, Step, Icon, Menu, Sidebar, Container, Modal, Card, Header, Button, Item } from 'semantic-ui-react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import Layout from '../Components/Layout';
import {Helmet} from 'react-helmet'
import logo3 from '../static/logo3.png'
import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chartjs-plugin-annotation';

import { BarController, BarElement, CategoryScale, Chart, LinearScale } from 'chart.js';
import ElectionController from '../Controllers/ElectionController';

Chart.register(BarController, CategoryScale, LinearScale, BarElement)

const AdminDashboard = () => {


    const [election_address, setElection_address] = useState(Cookies.get('address'));
    const [election_name, setElection_name] = useState('');
    const [election_desc, setElection_desc] = useState('');
    const [voters, setVoters] = useState(0);
    const [candidates, setCandidates] = useState(0);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [voterCount, setVoterCount] = useState(0);
    const [graphEmail, setGraphEmail] = useState([]);
    const [graphVotes, setGraphVotes] = useState([]);

    useEffect( async () =>
    {
        ElectionController.getAllVoters(setVoterCount, setVoters, setCandidates, setElection_name, setElection_desc, setGraphEmail, setGraphVotes, returnGraph);
    }, [voters, candidates])

    const data = {
        labels: graphEmail,
        datasets: [
            {
                label: 'Vote Counts',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 2,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: graphVotes,
            },
        ],
    };

    const options = {
        maintainAspectRatio: true,
        responsive: true,
        
    };

    const getElectionDetails = () => {

		return (
			<div style={{ marginLeft: '43%', marginBottom: '2%', marginTop: '2%', float: 'left' }}>
				<Header as="h2">
					<Icon name="address card" />
					<Header.Content>
						{election_name}
						<Header.Subheader>{election_desc}</Header.Subheader>
					</Header.Content>
				</Header>
			</div>
		);
	};
    const returnGraph = () => {return (
    <Bar data={data} 
        width={120} 
        height={50} 
        options={options} 
        />)}
    const CardExampleGroupProps = () => {return (<Card.Group></Card.Group>)}

    const signOut = () =>
    {
        Cookies.remove('address');
		Cookies.remove('company_email');
		Cookies.remove('company_id');
		alert('Logging out.');
		document.location.href = "/";
    }

    const endElection = async () =>
    {
        await ElectionController.endElection(election_name, setLoading);
    }

    return (
        <div>
				<Helmet>
					<title>Dashboard</title>
					<link rel="shortcut icon" type="image/x-icon" href={logo3} />
				</Helmet>
				<Grid>
					<Grid.Row>
						<Grid.Column width={2}>
                            <Sidebar.Pushable>
                                <Sidebar
                                    as={Menu}
                                    animation="overlay"
                                    icon="labeled"
                                    inverted
                                    vertical
                                    visible
                                    width="thin"
                                    style={{ backgroundColor: 'white', borderWidth: '10px' }}
                                >
                                    <Menu.Item style={{ color: 'grey' }}>
                                        <h2>MENU</h2>
                                        <hr />
                                    </Menu.Item>
                                    <Link to='/election/dashboard'>
                                        
                                            <Menu.Item style={{ color: 'grey', fontColor: 'grey' }}>
                                                <Icon name="dashboard" />
                                                Dashboard
                                            </Menu.Item>
                                        
                                    </Link>
                                    <Link to='/election/candidates'>
                                        
                                            <Menu.Item style={{ color: 'grey' }}>
                                                <Icon name="user outline" />
                                                Candidate List
                                            </Menu.Item>
                                        
                                    </Link>
                                    <Link to="/election/voters">
                                        
                                            <Menu.Item style={{ color: 'grey' }}>
                                                <Icon name="list" />
                                                Voter List
                                            </Menu.Item>
                                        
                                    </Link>
                                    <hr />
                                    <Button
                                        onClick={signOut}
									    negative
                                        size="tiny"
								    >
                                        <Menu.Item style={{ color: 'white' , width: '90%'}}>      
                                            Se Déconnecter
                                        </Menu.Item>
								</Button>
                                </Sidebar>
                            </Sidebar.Pushable>    
                        </Grid.Column>

						<Layout>
							<Grid.Column width={16}>
								{getElectionDetails()}
								<Button
									negative
									style={{ float: 'right', marginTop: '2%' }}
									onClick={endElection}
									loading={loading}
								>
									End election
								</Button>
								<Step.Group style={{ minWidth: 1130, minHeight: 90 }}>
									<Step icon="users" title="Voters" 
                                    description={voters} 
                                    />
									<Step icon="user outline" title="Candidates" 
                                    description={candidates} 
                                    />
									<Step
										icon="chart bar outline"
										title="Total Votes"
										description={voterCount}
									/>
								</Step.Group>
								{CardExampleGroupProps()}

								<Grid.Column>
									<br />
									<div className="he" style={{height: "100%", maxHeight: "100%"}}>
                                        {returnGraph()}
									</div>
								</Grid.Column>
							</Grid.Column>
						</Layout>
					</Grid.Row>
				</Grid>
			</div>
    );
}

export default AdminDashboard;
