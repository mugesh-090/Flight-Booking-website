import React, { useContext, useEffect, useState } from 'react';
import '../styles/LandingPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GeneralContext } from '../context/GeneralContext';

const LandingPage = () => {
  const [error, setError] = useState('');
  const [checkBox, setCheckBox] = useState(false);
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('userType') === 'admin') {
      navigate('/admin');
    } else if (localStorage.getItem('userType') === 'flight-operator') {
      navigate('/flight-admin');
    }
  }, []);

  const [Flights, setFlights] = useState([]);

  const fetchFlights = async () => {
    if (checkBox) {
      if (departure && destination && departureDate && returnDate) {
        const today = new Date();
        const start = new Date(departureDate);
        const end = new Date(returnDate);

        if (start > today && end > start) {
          setError("");
          const res = await axios.get("http://localhost:6001/fetch-flights");
          setFlights(res.data);
        } else {
          setError("Please check the dates");
        }
      } else {
        setError("Please fill all the inputs");
      }
    } else {
      if (departure && destination && departureDate) {
        const today = new Date();
        const start = new Date(departureDate);

        if (start >= today) {
          setError("");
          const res = await axios.get("http://localhost:6001/fetch-flights");
          setFlights(res.data);
        } else {
          setError("Please check the dates");
        }
      } else {
        setError("Please fill all the inputs");
      }
    }
  };

  const { setTicketBookingDate } = useContext(GeneralContext);
  const userId = localStorage.getItem("userId");

  const handleTicketBooking = (id, origin, dest) => {
    if (userId) {
      if (origin === departure) {
        setTicketBookingDate(departureDate);
      } else {
        setTicketBookingDate(returnDate);
      }
      navigate(`/book-flight/${id}`);
    } else {
      navigate('/auth');
    }
  };

  // Filter flights for display
  const filteredFlights = checkBox
    ? Flights.filter(
        (f) =>
          (f.origin === departure && f.destination === destination) ||
          (f.origin === destination && f.destination === departure)
      )
    : Flights.filter((f) => f.origin === departure && f.destination === destination);

  return (
    <div className="landingPage">
      <div className="landingHero">

        <div className="landingHero-title">
          <h1 className="banner-h1">Embark on an Extraordinary Flight Booking Adventure!</h1>
          <p className="banner-p">
            Unleash your travel desires and book extraordinary Flight journeys...
          </p>
        </div>

        {/* Search Box */}
        <div className="Flight-search-container input-container mb-4">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexSwitchCheckDefault"
              onChange={(e) => setCheckBox(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
              Return journey
            </label>
          </div>

          <div className="Flight-search-container-body">

            <div className="form-floating">
              <select
                className="form-select form-select-sm mb-3"
                value={departure}
                onChange={(e) => setDeparture(e.target.value)}
              >
                <option value="" disabled>Select</option>
                <option value="Chennai">Chennai</option>
                <option value="Banglore">Banglore</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Indore">Indore</option>
                <option value="Delhi">Delhi</option>
                <option value="Pune">Pune</option>
                <option value="Trivendrum">Trivendrum</option>
                <option value="Bhopal">Bhopal</option>
                <option value="Kolkata">Kolkata</option>
                <option value="varanasi">varanasi</option>
                <option value="Jaipur">Jaipur</option>
              </select>
              <label>Departure City</label>
            </div>

            <div className="form-floating">
              <select
                className="form-select form-select-sm mb-3"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              >
                <option value="" disabled>Select</option>
                <option value="Chennai">Chennai</option>
                <option value="Banglore">Banglore</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Indore">Indore</option>
                <option value="Delhi">Delhi</option>
                <option value="Pune">Pune</option>
                <option value="Trivendrum">Trivendrum</option>
                <option value="Bhopal">Bhopal</option>
                <option value="Kolkata">Kolkata</option>
                <option value="varanasi">varanasi</option>
                <option value="Jaipur">Jaipur</option>
              </select>
              <label>Destination City</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="date"
                className="form-control"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
              />
              <label>Journey date</label>
            </div>

            {checkBox && (
              <div className="form-floating mb-3">
                <input
                  type="date"
                  className="form-control"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                />
                <label>Return date</label>
              </div>
            )}

            <button className="btn btn-warning" onClick={fetchFlights}>
              Search
            </button>
          </div>

          <p className="text-danger">{error}</p>
        </div>

        {/* Flight Results */}
        {Flights.length > 0 && (
          <div className="availableFlightsContainer">
            <h1>{filteredFlights.length > 0 ? "Available Flights" : "No Flights"}</h1>

            <div className="Flights">
              {filteredFlights.map((Flight) => (
                <div className="Flight" key={Flight._id}>
                  <div>
                    <p><b>{Flight.flightName}</b></p>
                    <p><b>Flight Number:</b> {Flight.flightId}</p>
                  </div>
                  <div>
                    <p><b>Start:</b> {Flight.origin}</p>
                    <p><b>Departure Time:</b> {Flight.departureTime}</p>
                  </div>
                  <div>
                    <p><b>Destination:</b> {Flight.destination}</p>
                    <p><b>Arrival Time:</b> {Flight.arrivalTime}</p>
                  </div>
                  <div>
                    <p><b>Starting Price:</b> {Flight.basePrice}</p>
                    <p><b>Available Seats:</b> {Flight.totalSeats}</p>
                  </div>
                  <button
                    className="button btn btn-primary"
                    onClick={() =>
                      handleTicketBooking(Flight._id, Flight.origin, Flight.destination)
                    }
                  >
                    Book Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
{/* 
      ABOUT SECTION */}
      <section id="about" className="section-about p-4">
        <div className="container">
          <h2 className="section-title">About Us</h2>
          <p className="section-description">Welcome to our Flight ticket booking app...</p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
