import React from 'react';
import {
	Nav,
	NavLink,
	NavMenu,
	DashboardIcon,
	SettingsIcon,
	AccountIcon,
	styleIcon,
	NavDevider,
	Logo,
	AddIcon,
	AddButtonContainer
} from './NavbarElements';
import Database from '../../db.js';
import Popup from 'reactjs-popup';
import {AddCollectionPopup} from '../Popup/index.js';
import {IconMapper} from '../../iconMapper.js';

const db = new Database("db");

const Dashboard = styleIcon(DashboardIcon);
const Settings = styleIcon(SettingsIcon);
const Account = styleIcon(AccountIcon);
const AddButton = styleIcon(AddIcon);

const Navbar = () => {
	return (
		<Nav className='navbar'>
			<NavMenu>
				<Logo />
				<NavDevider />
				<NavLink to='/' activestyle="true">
					<Dashboard />
				</NavLink>
				<NavDevider />
				<div className='collectionNavLinkContainer'>
				{
					db.data.map(collection => {
						return (
							<NavLink to={`/collection/${collection.collectionIndex}`} activestyle="true" key={collection.collectionIndex} className="collectionNavLink">
								{styleIcon(IconMapper[collection.iconName.toLowerCase()])}
							</NavLink>
						)
					})
				}
				</div>
				<Popup trigger={
					<AddButtonContainer>
						<AddButton />
					</AddButtonContainer>
				} modal nested> 
					{ close => (<AddCollectionPopup close={close} />) }
				</Popup>

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
	);
};

export default Navbar;
