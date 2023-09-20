import { IoGrid, IoHome, IoBriefcase, IoSchool, IoSettingsOutline, IoAccessibilityOutline } from 'react-icons/io5';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../torch.png';
import React from 'react';

// Nav
// NavLink
// Bars (x)
// NavMenu
// NavBtn (x)
// NavBtnLink (x)
// NavDevider
// Logo

function Logo() {
	return <img src={logo} height={50} width={50}
		style={{
			margin: "20px 15px 5px 15px",
		}}
	/>;
}
export { Logo }

export const Nav = styled.nav`
background: rgba(0, 0, 0, .75);
height: 100vh;
display: flex;
flex-direction: column;
justify-content: space-between;
z-index: 12;
`;

export const NavLink = styled(Link)`
	color: #fff;
	width: 50px;
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 10px;
	margin: 5px 15px 5px 15px;
	transition: background .5s ease;
	
	&.active {
		background: #293FFF;

	}
`;

export const NavMenu = styled.div`
	display: flex;
	flex-direction: column;
`;

export const NavDevider = styled.div`
	width: 100%;
	height: 1px;
	background: #fff;
	filter: opacity(.2);
	margin: 10px 0 10px 0px;
`



const [DashboardIcon, HomeIcon, WorkIcon, SchoolIcon, SettingsIcon, AccountIcon] = [IoGrid, IoHome, IoBriefcase, IoSchool, IoSettingsOutline, IoAccessibilityOutline];

const styleIcon = (Component) => {
	const StyledComponent = (props) => {
		const customStyles = {
			fontSize: "1.5em",
			boxSizing: "content-box",
			padding: "10px",
		};

		return <Component {...props} style={customStyles} />;
	};

	return StyledComponent;
};

export { styleIcon, DashboardIcon, HomeIcon, WorkIcon, SchoolIcon, SettingsIcon, AccountIcon }