import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/BookingDetail.css';

export default function BookingDetail() {
  const { id } = useParams(); // Grabs the ID from the URL
  const navigate = useNavigate();

  // Mock data for the specific booking
  const bookingData = {
    id: id,
    farmerName: 'Tiya Raghuvanshi',
    center: 'Haryana Regional Procurement Center',
    address: 'Plot 45, Sector 12, Gurugram, Haryana - 122001',
    date: 'September 12, 2026',
    time: '10:00 AM - 10:30 AM',
    crop: 'Wheat (Premium Grade)',
    estQuantity: '2500 kg',
    slotNumber: 'S-42',
    status: 'Confirmed'
  };

  return (
    <div className="detail-page">
      <button className="btn-back" onClick={() => navigate('/bookings')}>← Back to List</button>
      
      <div className="ticket-container">
        <div className="ticket-top">
          <div className="ticket-logo">🌾 KisanSlot</div>
          <div className="ticket-status">Confirmed ✅</div>
        </div>
        
        <div className="ticket-body">
          <div className="ticket-section">
            <label>Farmer Name</label>
            <p>{bookingData.farmerName}</p>
          </div>
          <div className="ticket-section">
            <label>Booking ID</label>
            <p>{bookingData.id}</p>
          </div>
          <div className="ticket-section">
            <label>Procurement Center</label>
            <p>{bookingData.center}</p>
            <span className="address">{bookingData.address}</span>
          </div>
          <div className="ticket-highlight">
            <div className="highlight-item">
              <label>Date & Time</label>
              <p>{bookingData.date} | {bookingData.time}</p>
            </div>
            <div className="highlight-item">
              <label>Slot Number</label>
              <p>{bookingData.slotNumber}</p>
            </div>
          </div>
          <div className="ticket-section">
            <label>Crop Details</label>
            <p>{bookingData.crop} ({bookingData.estQuantity})</p>
          </div>
        </div>
        <div className="ticket-footer">
          <p>Please arrive 15 mins before your slot.</p>
          <button className="btn-download" onClick={() => window.print()}>Download Pass ⬇️</button>
        </div>
      </div>
    </div>
  );
}