import React from 'react';
import { Link } from 'react-router-dom';
export default class Header extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<header>
					<nav>
						<ul>
							<li><Link to='/' replace>Home</Link></li>
							<li><Link to='/roster' replace>Roster</Link></li>
							<li><Link to='/schedule' replace>Schedule</Link></li>
						</ul>
					</nav>
				</header>
			</div>
			);
	}
}
