import React from 'react';
import { Button, Form, Grid, Header, Icon, Segment } from 'semantic-ui-react';
import Cookies from 'js-cookie';
import { Helmet } from 'react-helmet';
import logo3 from '../static/logo3.png'
import { useState } from 'react';
import signin from '../Controllers/SignIn';
const Voterlogin = () => {

    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');

    const onSubmit = async () =>
    {
        await signin.voter(email,password)
    }
    return (
        <div>
			<Helmet>
				<title>Voter login</title>
				<Icon rel="shortcut icon" type="image/x-icon" href={logo3} />
			</Helmet>
			<div className="login-form">
                <style JSX>{`
                    .login-form {
                        width:100%;
                        height:100%;
                        position:absolute;
                        background: url('/static/blockchain.jpg') no-repeat;
                    } 
                `}</style>

                <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
                    <Grid.Column style={{ maxWidth: 380 }}>
                        <Form size="large">
                            <Segment>
                                <h1
									style={{
										color: '#D0924B',
										verticalAlign: 'middle',
										fontFamily: 'Freestyle Script',
										fontSize: '400%',
									}}
								>
									E-voting
								</h1>
                                <Header as="h2" color="black" textAlign="center" style={{ marginTop: 10 }}>
                                    Login Voteur
                                </Header>
                                <Form.Input
                                    fluid
                                    icon="user"
                                    iconPosition="left"
                                    placeholder="Email"
                                    style={{ padding: 5 }}
                                    id="signin_email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Form.Input
                                    style={{ padding: 5 }}
                                    fluid
                                    id="signin_password"
                                    icon="lock"
                                    iconPosition="left"
                                    placeholder="Password"
                                    type="password"
                                    onChange={(e) => setpassword(e.target.value)}
                                />

                                <Button color="blue" fluid size="large" style={{ marginBottom: 15 , backgroundColor: "#D0924B"}} onClick={onSubmit}>
                                    Se connecter
                                </Button>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
		    </div>
		</div>
    );
}

export default Voterlogin;
