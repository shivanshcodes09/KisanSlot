import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { getAppText, isRtl } from '../i18n/appText';
import '../styles/BookingDetail.css';

export default function BookingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = getAppText(language);

  return <div className="detail-page" dir={isRtl(language)?'rtl':'ltr'}>
    <button className="btn-back" onClick={()=>navigate('/bookings')}>← {t.common.bookings}</button>
    <div className="ticket-container">
      <div className="ticket-top"><div className="ticket-logo">🌾 KisanSlot</div><div className="ticket-status">{t.dash.confirmed} ✅</div></div>
      <div className="ticket-body">
        <div className="ticket-section"><label>{t.common.farmerUser}</label><p>Tiya Raghuvanshi</p></div>
        <div className="ticket-section"><label>{t.detail.bookingId}</label><p>{id}</p></div>
        <div className="ticket-section"><label>{t.detail.center}</label><p>Haryana</p><span className="address">45, 12, Gurugram, Haryana - 122001</span></div>
        <div className="ticket-highlight"><div className="highlight-item"><label>{t.common.date} & {t.common.time}</label><p>12/09/2026 | 10:00 - 10:30</p></div><div className="highlight-item"><label>{t.detail.slot}</label><p>S-42</p></div></div>
        <div className="ticket-section"><label>{t.detail.crop}</label><p>{t.dash.wheat} (2500 kg)</p></div>
        <div className="ticket-section"><label>{t.detail.token}</label><p>KS-118</p></div>
      </div>
      <div className="ticket-footer"><button className="btn-download" onClick={()=>navigate('/queue')}>{t.detail.track} ➔</button></div>
    </div>
  </div>;
}
