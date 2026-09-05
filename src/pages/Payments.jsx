import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import '../styles/Payments.css';

export default function Payments({ userData }) {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = {
    en: { title: 'Payment History', back: 'Back to Dashboard', totalEarnings: 'Total Earnings', download: 'Download Receipt', date: 'Date', amount: 'Amount', status: 'Status' },
    hi: { title: 'भुगतान इतिहास', back: 'डैशबोर्ड पर वापस जाएं', totalEarnings: 'कुल कमाई', download: 'रसीद डाउनलोड करें', date: 'तारीख', amount: 'रकम', status: 'स्थिति' },
  }[language] || { title: 'Payment History', back: 'Back to Dashboard', totalEarnings: 'Total Earnings', download: 'Download Receipt', date: 'Date', amount: 'Amount', status: 'Status' };

  const payments = [
    { id: 1, date: 'Sept 1, 2026', base: '₹12,000', bonus: '₹2,500', total: '₹14,500', status: 'Paid' },
    { id: 2, date: 'Aug 20, 2026', base: '₹10,000', bonus: '₹1,200', total: '₹11,200', status: 'Paid' },
    { id: 3, date: 'Sept 12, 2026', base: '₹13,000', bonus: '₹0', total: '₹13,000', status: 'Pending' },
  ];

  return (
    <div className="payments-page">
      <nav className="page-nav">
        <button className="nav-back-btn" onClick={() => navigate('/dashboard')}>← {t.back}</button>
      </nav>
      <div className="payments-container">
        <div className="payment-header">
          <h1 className="page-title">{t.title}</h1>
          <div className="earnings-summary">
            <span>{t.totalEarnings}:</span>
            <span className="total-amount">₹48,700</span>
          </div>
        </div>
        <div className="payments-table-wrapper">
          <table className="payments-table">
            <thead>
              <tr className="table-head">
                <th>{t.date}</th>
                <th>Base Price</th>
                <th>Govt Bonus</th>
                <th>{t.amount}</th>
                <th>{t.status}</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(p => (
                <tr key={p.id}>
                  <td>{p.date}</td>
                  <td>{p.base}</td>
                  <td>{p.bonus}</td>
                  <td className="amt-cell">{p.total}</td>
                  <td><span className={`payment-status ${p.status.toLowerCase()}`}>{p.status}</span></td>
                  <td><button className="btn-download">{t.download}</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}