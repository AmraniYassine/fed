import React from 'react';
import { Grid, Button, Header, Icon, Image, Menu, Sidebar, Container, Card } from 'semantic-ui-react';
import Layout from '../Components/Layout';
import Cookies from 'js-cookie';
import {Helmet} from 'react-helmet';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ElectionController from '../Controllers/ElectionController';

const Votingpage = () => {

    const [election_address, setElection_address] = useState(Cookies.get('address'));
    const [election_name, setElection_name] = useState('');
    const [election_desc, setElection_desc] = useState('');
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([]);
    const [cand_desc, setCand_desc] = useState('');
    const [cand_name, setCand_name] = useState('');
    const [email, setEmail] = useState('');

    useEffect( async () =>
    {
        await ElectionController.getCandidatesToVote(setElection_name, setElection_desc, setItems);
    }, [])

    const renderTable = () => {
        return (<Card.Group items={items}/>)
    }


    const signOut = () =>
    {
        Cookies.remove('address');
		Cookies.remove('company_email');
		Cookies.remove('company_id');
		alert('Logging out.');
		document.location.href = "/";
    }

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

    return (
        <div> 
            <Helmet>
            <title>Vote</title>
            <link rel="shortcut icon" type="image/x-icon" href="../../static/logo3.png" />
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
              {getElectionDetails()}
              <Grid.Column style={{minHeight: '77vh',marginLeft: '10%'}}>
                <Container>
                       {renderTable()}
                    </Container>
              </Grid.Column>      
              </Layout>
            </Grid.Row>
          </Grid>
        </div>
    );
}

export default Votingpage;
