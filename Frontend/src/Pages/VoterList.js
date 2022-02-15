import React, { Component } from 'react';
import { Grid, Header, Button, Form, Input, Icon, Menu, Modal, Sidebar, Container, Card } from 'semantic-ui-react';
import Layout from '../Components/Layout';
import Cookies from 'js-cookie';
import {Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import {Helmet} from 'react-helmet';
import ElectionController from '../Controllers/ElectionController';

const Voterlist = () => {

    const [election_address, setElection_address] = useState(Cookies.get('address'));
    const [election_name, setElection_name] = useState('');
    const [election_desc, setElection_desc] = useState('');
    const [voterEmails, setVoterEmails] = useState([]);
    const [voterIds, setVoterIds] = useState([]);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([]);
    const [email, setEmail] = useState('');

    useEffect( async () =>
    {
        await ElectionController.getRegisteredVoters(setElection_name,setElection_desc,setVoterEmails, setVoterIds,setItems);
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

    const register = async () =>
    {
        ElectionController.addVoter(email,election_address,election_name,election_desc);
    }
    return (
        <div>
          <Helmet>
            <title>Voting list</title>
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
              <br />
              <br />
              <Grid.Column width={14} style={{ minHeight: '630px' }}>
                <Grid.Column style={{ float: 'left', width: '60%' }}>
                  <Header as='h2' color='black'>
                    Voter List
              </Header>
                  <Container>                      
                      <table>
                      {renderTable()}
                      </table>                                        
                  </Container>
                </Grid.Column>
                <Grid.Column style={{ float: 'right', width: '30%' }}>
                  <Container style={{}}>
                    <Header as='h2' color='black'>
                      Inscrire Voteur
                       </Header>
                    <Card style={{ width: '100%' }}>
                      <br/>
                      <Form.Group size='large' style={{ marginLeft: '15%', marginRight: '15%' }} >
                        <Form.Input
						style={{marginTop: '10px'}}
                          fluid
                          id='register_voter_email'
                          label='Email:'
                          placeholder='Enter your email.'
                          textAlign='center'
                          onChange={(e) => {setEmail(e.target.value)}}
                        />

                        <br /><br />
                        <Button primary style={{ Bottom: '10px', marginBottom: '15px', backgroundColor: "#D0924B"}} 
                        onClick={register}
                        >Inscrire</Button>
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

export default Voterlist;
