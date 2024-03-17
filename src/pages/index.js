import React from 'react';
import ".//styles/Dashboard.css";
import { IoAddCircle } from 'react-icons/io5';
import Database from '../db.js';
import Popup from 'reactjs-popup';
import {AddCollectionPopup} from "../components/Popup";

const Dashboard = () => {
	const db = new Database("db");
	return (
		<div className="main">
			<h1>Welcome to Torch 🔥</h1>
			{db.data.length ? (
				<p><b>Dashboard</b> In Progress...</p>
			):(
				<div className='getStarted show'>
					<p><b>New?</b> Start By Creating Your First Collection!!</p>
					<Popup trigger={
						<button><IoAddCircle /> New collection</button>
					} modal nested> 
						{ close => (<AddCollectionPopup close={close} />) }
					</Popup>
				</div>
			)}
		</div>
	);
};

export default Dashboard;