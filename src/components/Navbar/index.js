import React from 'react';
import {
	Nav,
	NavLink,
	NavMenu,
	DashboardIcon,
	HomeIcon,
	WorkIcon,
	SchoolIcon,
	SettingsIcon,
	AccountIcon,
	styleIcon,
	NavDevider,
	Logo,
} from './NavbarElements';


const Dashboard = styleIcon(DashboardIcon);
const Home = styleIcon(HomeIcon);
const Work = styleIcon(WorkIcon);
const School = styleIcon(SchoolIcon);
const Settings = styleIcon(SettingsIcon);
const Account = styleIcon(AccountIcon);

const Navbar = () => {
	return (
		<>
			<Nav>
				<NavMenu>
					<Logo />
					<NavDevider />
					<NavLink to='/' activestyle="true">
						<Dashboard />
					</NavLink>
					<NavLink to='/home' activestyle="true">
						<Home />
					</NavLink>
					<NavLink to='/work' activestyle="true">
						<Work />
					</NavLink>
					<NavLink to='/school' activestyle="true">
						<School />
					</NavLink>
				</NavMenu>
				<NavMenu>
					<NavLink to='/settings' activestyle="true">
						<Settings />
					</NavLink>
					<NavLink to='/account' activestyle="true">
						<Account />
					</NavLink>
				</NavMenu>
			</Nav>
		</>
	);
};


export default Navbar;
