import React from 'react';
import "./PrimarySideNav.css";
import { IoAddCircle, IoChevronBack, IoChevronForward, IoFilter, IoSearch, IoStar } from 'react-icons/io5';

function PrimarySideNav({toggleSideNavBtnPressed, open}) {

	return (
		<nav className={"primarySideNav "+ (open ? "active" : "")}>
			<div className='noteCollectionInputPlaceholder'>
				<IoSearch />
				<input type='search' placeholder='Search'/>
			</div>
			<button><IoAddCircle /> New Note</button>
			<div className='noteCollectionInfo'>
				<span>5 items</span>
				<span className='noteCollectionFilter'><IoFilter /> filter</span>
			</div>
			<div className='noteCollectionNotes'>
				<SideNavTask title="Important meeting at 9'o'clock" dateTime="Mon, July 18, 2023" starred color="#FF0000"/>
				<SideNavTask title="Excel files review needed" dateTime="Mon, July 18, 2023" color="#FF4EED"/>
				<SideNavTask title="New product launch" dateTime="Mon, July 18, 2023" color="#FFF500" active/>
				<SideNavTask title="PSA 12  9729172" dateTime="Mon, July 18, 2023" starred color="#5200FF"/>
				<SideNavTask title="Office friend party invitation" dateTime="Mon, July 18, 2023" color="#00FF38"/>
			</div>
			<div className={"toggleSideNavBtn"} onClick={toggleSideNavBtnPressed()}>
				{open ? <IoChevronBack /> : <IoChevronForward />} 
			</div>
		</nav>
	)
}

function SideNavTask({title, dateTime, starred, color, active, dataId}) {
	return (
		<div className={"noteCollectionNote"+`${active ? " active" : ""}`} title={title}>
			<h3 className='sherif'>{title}</h3>
			<div
			style={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: 'center'
			}}
			>
				<span>{dateTime}</span>
				{starred ? <IoStar /> : ""}
			</div>
			<div
			style={{
				height: "44px",
                width: "8px",
                borderRadius: "10px",
                background: color,
                display: "flex",
                position: "absolute",
                top: "50%",
				opacity: 0.7,
                transform: "translateY(-50%)",
                right: "calc(100% - 4px)",
			}}
			></div>
		</div>
	)
}
export default PrimarySideNav;