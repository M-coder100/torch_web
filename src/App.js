import React, { useState } from 'react';
import './App.css';
import './index.css';
import Navbar from './components/Navbar';
import PrimarySideNav from './components/PrimarySideNav';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages';
import Home from './pages/home';
import Work from './pages/work';
import School from './pages/school';
import Settings from './pages/settings';
import Account from './pages/account';

function App() {
	// react hooks magic 🪄
	const [isSideNavOpen, setIsSideNavOpen] = useState(true);

	function toggleSideNav() {
		setIsSideNavOpen(!isSideNavOpen);
	}

	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path='/work' element={<>
					<PrimarySideNav toggleSideNavBtnPressed={toggleSideNav} open={isSideNavOpen} />
					<Work />
				</>} />
				<Route path='/' exact element={<Dashboard />} />
				<Route path='/home' element={<Home />} />
				<Route path='/work' element={<Work />} />
				<Route path='/school' element={<School />} />
				<Route path='/settings' element={<Settings />} />
				<Route path='/account' element={<Account />} />
			</Routes>
		</Router>
	);
}

export default App;
