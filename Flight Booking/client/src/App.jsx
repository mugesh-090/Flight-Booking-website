import './App.css';
import Navbar from './components/Navbar.jsx';
import LandingPage from './pages/LandingPage.jsx';
import Authenticate from './pages/Authenticate.jsx';
import Bookings from './pages/Bookings.jsx';
import Admin from './pages/Admin.jsx';
import AllUsers from './pages/AllUsers.jsx';
import AllBookings from './pages/AllBookings.jsx';
import AllFlights from './pages/AllFlights.jsx';
import NewFlight from './pages/NewFlight.jsx';
import {Routes, Route} from 'react-router-dom'
import LoginProtector from './RouteProtectors/LoginProtector.jsx';
import AuthProtector from './RouteProtectors/AuthProtector.jsx';
import BookFlight from './pages/BookFlight.jsx';
import EditFlight from './pages/EditFlight.jsx';
import FlightAdmin from './pages/FlightAdmin.jsx';
import FlightBookings from './pages/FlightBookings.jsx';
import Flights from './pages/Flights.jsx';

function App() {
  return (
  <div className="App">
    <Navbar/>
    <Routes>
      <Route exact path = '' element={<LandingPage/>}/>
      <Route path='/auth' element={<LoginProtector><Authenticate/></LoginProtector>}/>
      <Route path='/book-Flight/:id' element={<AuthProtector><BookFlight/></AuthProtector>}/>
      <Route path='/bookings' element={<AuthProtector><Bookings/></AuthProtector>}/>
      <Route path='/admin' element={<AuthProtector><Admin/></AuthProtector>}/>
      <Route path='/all-users' element={<AuthProtector><AllUsers/></AuthProtector>}/>
      <Route path='/all-bookings' element={<AuthProtector><AllBookings/></AuthProtector>}/>
      <Route path='/all-flights' element={<AuthProtector><AllFlights/></AuthProtector>}/>
      <Route path='/flight-admin' element={<AuthProtector><FlightAdmin/></AuthProtector>}/>
      <Route path='/flight-bookings' element={<AuthProtector><FlightBookings/></AuthProtector>}/>
      <Route path='/flights' element={<AuthProtector><Flights/></AuthProtector>}/>
      <Route path='/new-flight' element={<AuthProtector><NewFlight/></AuthProtector>}/>
      <Route path='/edit-flight/:id' element={<AuthProtector><EditFlight/></AuthProtector>}/>
    </Routes>

  </div>
  );
}

export default App;
