import React, { useEffect, useRef, useState } from 'react';
import "./PrimarySideNav.css";
import { IoAddCircle, IoCheckmarkCircle, IoChevronBack, IoChevronForward, IoFilter, IoSearch, IoStar } from 'react-icons/io5';
import Database from '../../db.js';
import { useParams, useNavigate } from 'react-router-dom';

const db = new Database("db");

function PrimarySideNav({toggleSideNavBtnPressed, open}) {
	const { collectionIndex } = useParams();
	const notes = db.getCollectionData(collectionIndex)?.notes;
	const collectionNoteRef = useRef(null);
	
	return (
		<nav className={"primarySideNav "+ (open ? "active" : "")}>
			<div className='noteCollectionInputPlaceholder'>
				<IoSearch />
				<input type='search' placeholder='Search'/>
			</div>
			<button onClick={() => {
				db.createNewNote(collectionIndex);
				db.save();
                window.location.assign(`/collection/${collectionIndex}/${db.getCollectionData(collectionIndex).notes.length-1}`);
			}}><IoAddCircle /> New Note</button>
			<div className='noteCollectionInfo'>
				<span>{notes?.length} items</span>
				<span className='noteCollectionFilter'><IoFilter /> filter</span>
			</div>
			<div className='noteCollectionNotes' ref={collectionNoteRef}>
				{
					notes?.map(note => {
						return <SideNavTask title={note.heading} dateTime={note.lastEdited} starred={note.isStarred} checked={note.isChecked} color={note.color} key={note.noteIndex} index={note.noteIndex} notes_ref={collectionNoteRef}/>
					})
				}
			</div>
			<div className={"toggleSideNavBtn"} onClick={toggleSideNavBtnPressed}>
				{open ? <IoChevronBack /> : <IoChevronForward />} 
			</div>
		</nav>
	)
	function SideNavTask({title, dateTime, starred, checked, color, index, notes_ref}) {
		let navigate = useNavigate(); 
		const { collectionIndex, noteIndex } = useParams();
		const [isActive, setActive] = useState(false);
		const titleRef = useRef(null);
		useEffect(() => {
			if (noteIndex == index) {
				setActive(true);
				// titleRef.current.innerHTML = document.getElementById("header").innerHTML;
			} else if (!noteIndex && (db.getCollectionData(collectionIndex).lastNoteIndex == index)) {
				setActive(true);
				// titleRef.current.innerHTML = document.getElementById("header").innerHTML;
			} else {
				setActive(false);
			}
			titleRef.current.innerHTML = title;
		}, [collectionIndex, noteIndex, index])
		
		const handleClick = () => {
			navigate(`/collection/${collectionIndex}/${index}`); 
			db.getCollectionData(collectionIndex).lastNoteIndex = index;
			db.save();
		};
	
		return (
			<div 
				className={`noteCollectionNote ${isActive ? "active" : ""}`} 
				title={title} onClick={handleClick} 
				onContextMenu={(e) => {
					const note = e.currentTarget; 
					const notes = [...notes_ref.current.children]; 
					notes.forEach( noteElm => {
						noteElm.classList.remove("active");
					})
					note.classList.add("active");
					db.data[collectionIndex].lastNoteIndex = notes.indexOf(note);
					db.save();
					document.addEventListener("click", () => note.classList.remove("active"));
				}}
				data-note-index={index}
			>
				<h3 className='sherif' ref={titleRef}></h3>
				<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: 'center'
				}}
				>
					<span>{dateTime}</span>
					<div style={{display: "flex", gap: "5px"}}>
						{starred ? <IoStar className='star'/> : ""}
						{checked ? <IoCheckmarkCircle className='check'/> : ""}
					</div>
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
}

export default PrimarySideNav;