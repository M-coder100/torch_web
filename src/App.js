import React, { useState } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import PrimarySideNav from './components/PrimarySideNav';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Dashboard from './pages';
import Settings from './pages/settings';
import Account from './pages/account';
import Editor from './components/Editor';
import ContextMenu from './components/ContextMenu';

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
				<Route path='/collection'>
					<Route path=':collectionIndex' element={
						<>
							<PrimarySideNav toggleSideNavBtnPressed={toggleSideNav} open={isSideNavOpen} />
							<Editor />
							<ContextMenu />
						</>
					}>
						<Route path=':noteIndex' element={""}/>
					</Route>
				</Route>
				<Route path='/' exact element={<Dashboard />} />
				<Route path='/settings' element={<Settings />} />
				<Route path='/account' element={<Account />} />
			</Routes>
		</Router>
	);
}

export default App;
