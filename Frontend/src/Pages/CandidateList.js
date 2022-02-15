import React from 'react';
import { Grid, Table, Button, Form, Image, Header, Icon, Menu, Modal, Sidebar, Container, Card } from 'semantic-ui-react';
import Layout from '../Components/Layout';
import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import logo3 from '../static/logo3.png'
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import ElectionController from '../Controllers/ElectionController';

const Candidatelist = () => {

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
        ElectionController.getAllCandidates(setCandidates, setElection_name, setElection_desc, setItems);
    }, [])

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

    const onSubmit = async () =>
    {
        await ElectionController.addCandidate(cand_name, cand_desc, email, setLoading, election_name);
    }

    return (
        <div>
          <Helmet>
            <title>Candidate list!</title>
            <Icon rel="shortcut icon" type="image/x-icon" href={logo3} />
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
              <br />
              <br />
              <Grid.Column width={14} style={{ minHeight: '630px' }}>
                <Grid.Column style={{ float: 'left', width: '60%' }}>
                  <Header as='h2' color='black'>
                    Liste des Candidats 
              </Header>
                  <Container>                      
                      <table>
                      {renderTable()}
                      </table>                                        
                  </Container>
                </Grid.Column>
                <Grid.Column style={{ float: 'right', width: '30%' }}>
                <Container style={{marginLeft:'50px'}}>                      
                <Header as='h2' style={{width: '100%', color:'black', textAlign:'center'}} >                 
                        Inscrire Candidat
                       </Header>
                       <Card style={{width: '100%'}}>      
                       
                       <Form.Group size='large'style={{marginLeft: '15%',marginRight: '15%'}} >                       
                       <br/>
                       <Form.Input
                        label='Name:'
                        placeholder='Enter your name.'
                        style = {{backgroundColor: "#D0924B", textAlign:'center'}}
                        onChange={event => setCand_name(event.target.value)}
                        
                        
                    />        
                        <p>Description:</p>
                        <Form.Input as='TextArea'
                         label='Description:'                         
                         placeholder='Describe here.'
                         style={{width: '100%'}}
                         centered={true}
                         onChange={event => setCand_desc(event.target.value)}
                          />
                       <br/><br/>
                       <p>E-mail ID: </p>
                       <Form.Input fluid
                         id="email"
                         placeholder="Enter your e-mail"
                         onChange={event => setEmail(event.target.value)}
                       />
                       <br/>
                       <Button primary 
                       onClick={onSubmit} 
                       loading={loading} 
                       style={{Bottom: '10px',marginBottom: '10px', backgroundColor: "#D0924B"}}>Inscrire</Button>
                        </Form.Group>                                  
                      </Card> 
                    </Container>
                </Grid.Column>                
              </Grid.Column> 
            </Layout>
          </Grid.Row>
        </Grid>
      </div>
    );
}

export default Candidatelist;
