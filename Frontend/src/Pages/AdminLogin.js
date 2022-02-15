import React from "react";
import {
  Button,
  Divider,
  Transition,
  Form,
  Grid,
  Icon,
  Segment
} from "semantic-ui-react";
import logo3 from '../static/logo3.png'
import { useState } from "react";
//import web3 from "../Ethereum/web3";
//import Election_Factory from "../Ethereum/election_factory"; 
import Cookies from 'js-cookie';
import {Helmet} from 'react-helmet'
import signup from "../Controllers/SignUp";
import signin from "../Controllers/SignIn";

const Adminlogin = () => { 
    const [visible, setVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');

    const toggleVisibility = () =>
    {
        setVisible(!visible);
    }

    const adminSignup = async () =>
    {
        await signup.admin(email, password)
    }   
  
    const adminSignin = async () =>
    {
      await signin.admin(email, password) 
    }
    return (
        <div>
        
        <Helmet>
            <title>Admin Login</title>
            <Icon rel="shortcut icon" type="image/x-icon" href={logo3} />
        </Helmet>
        <div>
          <Button.Group style={{ marginLeft: "43%" }}>
            <Button
              primary
              content={visible ? "Se Connecter" : "S'inscrire"}
              onClick={() => {setEmail(""); setpassword(""); toggleVisibility()}}
              style= {{backgroundColor: "#D0924B", color: "white"}}
            />
          </Button.Group>
          <Divider style={{ zIndex: "-10" }} />
          <Grid className="grid1">
            <Grid.Row>
              <Grid.Column
                width={5}
                style={{ marginLeft: "33%", marginTop: "10%" }}
                verticalAlign="middle"
              >
                <Segment placeholder className="segment">
                  <Transition
                    visible={!visible}
                    animation="scale"
                    duration={300}
                  >
                    <Form size="large">
                      <h3 style={{ textAlign: "center" }}>Se Connecter</h3>
                      <Form.Input
                        fluid
                        id="signin_email"
                        icon="user"
                        iconPosition="left"
                        placeholder="Email"
                        style={{ padding: 5 }}
                        onChange={(e) =>{setEmail(e.target.value);}}
                      />
                      <Form.Input
                        style={{ padding: 5 }}
                        fluid
                        id="signin_password"
                        icon="lock"
                        iconPosition="left"
                        placeholder="Password"
                        type="password"
                        onChange={(e) =>{setpassword(e.target.value);}}
                      />

                      <Button
                        onClick={adminSignin}
                        color="blue"
                        fluid
                        size="large"
                        style={{ marginBottom: 15, backgroundColor: "#D0924B", color: "white" }}
                      >
                        Se Connecter
                      </Button>
                    </Form>
                  </Transition>

                  <Transition
                    visible={visible}
                    animation="scale"
                    duration={300}
                  >
                    <Form size="large">
                      <h3 style={{ textAlign: "center" }}>S'inscrire</h3>
                      <Form.Input
                        fluid
                        id="signup_email"
                        icon="user"
                        iconPosition="left"
                        placeholder="Email"
                        style={{ padding: 5 }}
                        onChange={(e) =>{setEmail(e.target.value);}}
                      />
                      <Form.Input
                        style={{ padding: 5 }}
                        fluid
                        id="signup_password"
                        icon="lock"
                        iconPosition="left"
                        placeholder="Password"
                        type="password"
                        onChange={(e) =>{setpassword(e.target.value);}}
                      />
                      <Button
                        onClick={adminSignup}
                        fluid
                        size="large"
                        style={{ marginBottom: 15 , backgroundColor: "#D0924B", color: "White"}}
                      >
                        S'inscrire
                      </Button>                      
                    </Form>
                  </Transition>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    );
}

export default Adminlogin;
