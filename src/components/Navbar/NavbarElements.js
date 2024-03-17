import { IoGrid, IoSettingsOutline, IoAccessibilityOutline, IoAddCircle } from 'react-icons/io5';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../imgs/torch.png';
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
	return <img src={logo} height={50} width={50} alt='Torch'
		style={{
			margin: "20px 15px 5px 15px",
		}}
	/>;
}

export const Nav = styled.nav`
	background: var(--backdropBg);
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	z-index: 12;
	backdrop-filter: blur(10px);
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
	
	&:hover {
		border: 1px dashed #ffffff2f;
	}
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
	export const AddButtonContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	// font-size: larger;
	background: #000;
	margin: 15px;
	border-radius: 100px;
	border: 5px inset #293FFF;
`


const [DashboardIcon, SettingsIcon, AccountIcon, AddIcon] = [IoGrid, IoSettingsOutline, IoAccessibilityOutline, IoAddCircle];

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

export { Logo, styleIcon, DashboardIcon, SettingsIcon, AccountIcon, AddIcon }