import React from 'react';
import { Link } from 'react-router-dom';
import logo3 from '../static/logo3.png'
import { useState } from 'react';
import {
	Button,
	Container,
	Header,
	Icon,
	Menu,
	Segment,
	Visibility,
} from 'semantic-ui-react';
import '../static/hometest.css';
import { Helmet } from 'react-helmet';
const HomePage = () => { 
    const [fixed, setFixed] = useState(false);
    const hideFixedMenu = () => this.setFixed(false);
	const showFixedMenu = () => this.setFixed(true);
    return (
        <Container>
            <Helmet>
					<title>HomePage</title>
					<Icon rel="shortcut icon" type="image/x-icon" href={logo3} />
				</Helmet>
				<Visibility once={false} onBottomPassed={showFixedMenu} onBottomPassedReverse={hideFixedMenu}>
					<Segment inverted textAlign="center" style={{ minHeight: 700, padding: '1em 0em' }} vertical>
						<Menu
							fixed={fixed ? 'top' : null}
							inverted={!fixed}
							pointing={!fixed}
							secondary={!fixed}
							size="large"
							className="menu"
						>
							<Container>
								<h1
									style={{
										color: '#D0924B',
										verticalAlign: 'middle',
										fontFamily: 'Freestyle Script',
										fontSize: '400%',
										paddingLeft: '42%',
									}}
								>
									E-voting
								</h1>
							</Container>
						</Menu>
                        <Container style={{ float: 'left', marginTop: '10%' }}>
                            <Header as="h4" style={{ color: 'grey' }}>
                                Register/ Sign in for the Admin
                            </Header>
                            <Link to ="/admin-login">
                                <Button primary size="huge" className='Button' style={{ color: 'white', backgroundColor: '#D0924B', cursor: "pointer" }}>
                                    <Icon name="left arrow" />
                                    Admin
                                </Button>
                            </Link>
                        </Container>
                        <Container style={{ float: 'right', marginTop: '10%' }}>
                            <Header as="h4" style={{ color: 'grey' }}>
                                {' '}
                                Sign in for Voters!
                            </Header>
                            <Link to="/voter-login">
                                <Button primary size="huge" className='Button' style={{ color: 'white', backgroundColor: '#D0924B', cursor: "pointer" }}>
                                    Voters
                                    <Icon name="right arrow" />
                                </Button>
                            </Link>
                        </Container>
					</Segment>
				</Visibility>
            
        </Container>
    );
}

export default HomePage;
