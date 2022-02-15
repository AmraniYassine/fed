import React from 'react';
import { Menu } from 'semantic-ui-react';
import Cookies from 'js-cookie';

const Header = props => {
	return (
		<div className="header" style={{ZIndex: "10"}}>
			<Menu secondary style={{ maxHeight: '50px' }}>
				<Menu.Item
					name="E-voting"
					style={{ color: '#D0924B', verticalAlign: 'middle', fontFamily: 'Freestyle Script', fontSize: '40px', paddingLeft: '42%', paddingTop: '4%' }}
				/>
				<Menu.Menu position="right">
					<Menu.Item icon="user" />
					<Menu.Item style={{ paddingRight: '10px' }}>
						{Cookies.get('admin_email') || Cookies.get('voter_email')}
					</Menu.Item>
				</Menu.Menu>
			</Menu>
			<hr />
			{props.children}
		</div>
	);
};

export default Header;
