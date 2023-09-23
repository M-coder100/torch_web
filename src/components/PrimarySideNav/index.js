import React from 'react';
import "./PrimarySideNav.css";
import { IoAddCircle, IoChevronBack, IoChevronForward, IoSearch } from 'react-icons/io5';

function PrimarySideNav({toggleSideNavBtnPressed, open}) {

	return (
		<nav className={"primarySideNav "+ (open ? "active" : "")}>
			<div className='inputPlaceholder'>
				<IoSearch />
				<input type='search' placeholder='Search'/>
			</div>
			<button><IoAddCircle /> New Note</button>
			<div className={"toggleSideNavBtn"} onClick={toggleSideNavBtnPressed()}>
				{open ? <IoChevronBack /> : <IoChevronForward />} 
			</div>
		</nav>
	)
}

export default PrimarySideNav;