import React from 'react';
import {
    Button,
    Divider,
    Transition,
    Header,
    Message,
    Form,
    Grid,
    Icon,
    Segment
  } from "semantic-ui-react";
  import logo3 from '../static/logo3.png'
  import { useState } from 'react';
import ElectionController from '../Controllers/ElectionController';
const CreateElection = () => {
    const [election_name, setElection_name] = useState('');
    const [loading, setLoading] = useState(false);
    const [election_description, setElection_description] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

	const createElection = async () =>
	{
		await ElectionController.create(election_description, election_name, setLoading, setErrorMessage);
	}
    return (
        <div className="login-form" style={{width: "100%", height: "100%"}}>

			<Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
				<Grid.Column style={{ maxWidth: 380 }}>
					<Form size="large">
						<Segment>
							<Header as="h2" color="black" textAlign="center" style={{ marginTop: 10 }}>
								Create an election!
							</Header>
							<Form.Input
								iconPosition="left"
								icon="address card outline"
								placeholder="Election Name"
								style={{ padding: 5 }}
								value={election_name}
								onChange={event => setElection_name(event.target.value )}
								required={true}
							/>
							<Form.Input
								as="TextArea"
								required={true}
								style={{
									maxHeight: '30px',
									maxWidth: '96%',
									marginBottom: '10px',
								}}
								fluid
								placeholder="Election Description"
								value={election_description}
								onChange={event => setElection_description(event.target.value )}
							/>

							<Button
								fluid
								size="large"
								style={{ marginBottom: 15, color: "White", backgroundColor:  "#D0924B"}}
								onClick={createElection}
								loading={loading}
							>
								Créer l'Election
							</Button>
							<Message icon info style={{backgroundColor:  "#fddebb", color: "#d4770d"}}>
								<Icon name="exclamation circle" />
								<Message.Header style={{color: "#d4770d"}}>NB: </Message.Header>
								<Message.Content>La Création d'une election peut prendre quelques minutes.</Message.Content>
							</Message>
						</Segment>
					</Form>
				</Grid.Column>
			</Grid>
		</div>
    );
}

export default CreateElection;
