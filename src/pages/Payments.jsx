import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { getAppText, isRtl } from '../i18n/appText';
import '../styles/Payments.css';

export default function Payments() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = getAppText(language);
  const payments = [
    { id:1, date:'01/09/2026', base:'₹12,000', bonus:'₹2,500', total:'₹14,500', status:'paid' },
    { id:2, date:'20/08/2026', base:'₹10,000', bonus:'₹1,200', total:'₹11,200', status:'paid' },
    { id:3, date:'12/09/2026', base:'₹13,000', bonus:'₹0', total:'₹13,000', status:'pending' },
  ];
  return <div className="payments-page" dir={isRtl(language)?'rtl':'ltr'}>
    <nav className="page-nav"><button className="nav-back-btn" onClick={()=>navigate('/dashboard')}>← {t.common.back}</button></nav>
    <div className="payments-container">
      <div className="payment-header"><h1 className="page-title">{t.payments.title}</h1><div className="earnings-summary"><span>{t.payments.total}:</span><span className="total-amount">₹48,700</span></div></div>
      <div className="payments-table-wrapper"><table className="payments-table"><thead><tr className="table-head"><th>{t.common.date}</th><th>{t.payments.base}</th><th>{t.payments.bonus}</th><th>{t.payments.amount}</th><th>{t.common.status}</th><th>{t.common.action}</th></tr></thead><tbody>{payments.map(p=><tr key={p.id}><td>{p.date}</td><td>{p.base}</td><td>{p.bonus}</td><td className="amt-cell">{p.total}</td><td><span className={`payment-status ${p.status}`}>{p.status==='paid'?t.common.paid:t.common.pending}</span></td><td><button className="btn-download">{t.payments.download}</button></td></tr>)}</tbody></table></div>
    </div>
  </div>;
}
