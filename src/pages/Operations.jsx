import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const centerSeed = [
  { id: 1, name: 'Gurugram Procurement Centre', queue: 14, avg: 6, active: 2, total: 3, status: 'Operational' },
  { id: 2, name: 'Pataudi Procurement Centre', queue: 31, avg: 7, active: 2, total: 2, status: 'High Load' },
  { id: 3, name: 'Sohna Procurement Centre', queue: 8, avg: 5, active: 1, total: 2, status: 'Operational' },
];

export default function Operations() {
  const navigate = useNavigate();
  const [centers, setCenters] = useState(centerSeed);
  const [myToken] = useState(118);
  const [serving, setServing] = useState(111);
  const selected = centers[0];

  const farmersAhead = Math.max(myToken - serving - 1, 0);
  const eta = farmersAhead * selected.avg;
  const recommendedLeave = eta > 30 ? `Leave in about ${Math.max(eta - 20, 10)} min` : 'You can leave now';

  const traffic = useMemo(() => {
    if (eta <= 30) return { label: 'LOW LOAD', icon: '🟢' };
    if (eta <= 60) return { label: 'MODERATE', icon: '🟡' };
    return { label: 'HIGH LOAD', icon: '🔴' };
  }, [eta]);

  const advanceQueue = () => setServing((v) => Math.min(v + 1, myToken));
  const togglePause = () => {
    setCenters((prev) => prev.map((c, i) => i === 0 ? { ...c, status: c.status === 'Paused' ? 'Operational' : 'Paused' } : c));
  };

  const card = { background: '#fff', border: '1px solid #e8ece8', borderRadius: 18, padding: 22, boxShadow: '0 10px 25px rgba(27,77,46,.07)' };
  const small = { fontSize: 13, color: '#6b7b72', marginBottom: 6 };
  const value = { fontSize: 28, fontWeight: 800, color: '#1B4D2E' };

  return (
    <div style={{ minHeight: '100vh', background: '#f7faf7', fontFamily: 'Segoe UI, sans-serif', color: '#24352c' }}>
      <div style={{ background: '#1B4D2E', color: 'white', padding: '18px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 15, flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontSize: 24, fontWeight: 900 }}>KisanSlot Live Operations</div>
          <div style={{ opacity: .8, fontSize: 13 }}>Real-time mandi visibility after slot booking</div>
        </div>
        <button onClick={() => navigate('/dashboard')} style={{ border: 0, borderRadius: 10, padding: '10px 16px', fontWeight: 700, cursor: 'pointer' }}>← Dashboard</button>
      </div>

      <main style={{ width: '90%', maxWidth: 1180, margin: '28px auto 60px' }}>
        <section style={{ ...card, background: 'linear-gradient(135deg,#1B4D2E,#2D7A3E)', color: 'white', marginBottom: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 13, opacity: .8 }}>YOUR LIVE TOKEN</div>
              <div style={{ fontSize: 48, fontWeight: 900 }}>KS-{myToken}</div>
              <div style={{ marginTop: 8 }}>{selected.name}</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(120px,1fr))', gap: 12 }}>
              <div style={{ background: 'rgba(255,255,255,.12)', padding: 14, borderRadius: 12 }}><div style={{ fontSize: 12, opacity: .8 }}>Now serving</div><b style={{ fontSize: 24 }}>KS-{serving}</b></div>
              <div style={{ background: 'rgba(255,255,255,.12)', padding: 14, borderRadius: 12 }}><div style={{ fontSize: 12, opacity: .8 }}>Farmers ahead</div><b style={{ fontSize: 24 }}>{farmersAhead}</b></div>
              <div style={{ background: 'rgba(255,255,255,.12)', padding: 14, borderRadius: 12 }}><div style={{ fontSize: 12, opacity: .8 }}>Estimated wait</div><b style={{ fontSize: 24 }}>{eta} min</b></div>
            </div>
          </div>
        </section>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 16, marginBottom: 22 }}>
          <div style={card}><div style={small}>Mandi traffic</div><div style={value}>{traffic.icon} {traffic.label}</div><div style={{ marginTop: 8, color: '#6b7b72' }}>Based on live queue and active counters.</div></div>
          <div style={card}><div style={small}>Smart arrival</div><div style={{ ...value, fontSize: 22 }}>{recommendedLeave}</div><div style={{ marginTop: 8, color: '#6b7b72' }}>Avoid reaching too early when the centre is delayed.</div></div>
          <div style={card}><div style={small}>Centre health</div><div style={{ ...value, fontSize: 22 }}>{selected.status === 'Paused' ? '⏸️ Paused' : '✅ Operational'}</div><div style={{ marginTop: 8, color: '#6b7b72' }}>{selected.active}/{selected.total} counters active</div></div>
          <div style={card}><div style={small}>Queue model</div><div style={{ ...value, fontSize: 22 }}>{selected.avg} min/farmer</div><div style={{ marginTop: 8, color: '#6b7b72' }}>ETA recalculates as each token completes.</div></div>
        </section>

        <section style={{ display: 'grid', gridTemplateColumns: '1.3fr .7fr', gap: 18, marginBottom: 22 }}>
          <div style={card}>
            <h2 style={{ marginTop: 0, color: '#1B4D2E' }}>Procurement Journey</h2>
            {['Slot Confirmed','Arrived at Centre','Live Queue','Quality Check','Weighing','Procurement Complete','Payment Initiated'].map((step, i) => (
              <div key={step} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '11px 0', borderBottom: i < 6 ? '1px solid #edf0ed' : 'none' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', display: 'grid', placeItems: 'center', fontWeight: 800, background: i < 2 ? '#dff3e4' : i === 2 ? '#fff1c7' : '#eef1ee', color: '#1B4D2E' }}>{i < 2 ? '✓' : i + 1}</div>
                <div style={{ fontWeight: i === 2 ? 800 : 600 }}>{step}</div>
                {i === 2 && <span style={{ marginLeft: 'auto', color: '#b7791f', fontSize: 13 }}>In progress</span>}
              </div>
            ))}
          </div>

          <div style={card}>
            <h2 style={{ marginTop: 0, color: '#1B4D2E' }}>Operator Demo</h2>
            <p style={{ color: '#6b7b72', lineHeight: 1.5 }}>Use these controls to demonstrate a live queue changing in front of judges.</p>
            <button onClick={advanceQueue} style={{ width: '100%', padding: 12, border: 0, borderRadius: 10, background: '#1B4D2E', color: 'white', fontWeight: 800, cursor: 'pointer', marginBottom: 10 }}>Call Next Farmer</button>
            <button onClick={togglePause} style={{ width: '100%', padding: 12, borderRadius: 10, background: '#fff', border: '1px solid #d8ded9', fontWeight: 800, cursor: 'pointer' }}>{selected.status === 'Paused' ? 'Resume Centre' : 'Simulate Breakdown'}</button>
            <div style={{ marginTop: 16, padding: 12, borderRadius: 10, background: selected.status === 'Paused' ? '#fff3e8' : '#f2f8f3', fontSize: 13 }}>
              {selected.status === 'Paused' ? '⚠️ Queue paused. In production, affected farmers would receive an SMS/app delay alert.' : 'Live system healthy. ETA updates when the queue advances.'}
            </div>
          </div>
        </section>

        <section style={card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 15, flexWrap: 'wrap', alignItems: 'end' }}>
            <div><h2 style={{ margin: 0, color: '#1B4D2E' }}>Nearby Centre Load</h2><p style={{ color: '#6b7b72' }}>KisanSlot can recommend a less-crowded eligible centre instead of forcing a fixed queue.</p></div>
            <span style={{ fontSize: 12, background: '#eef6ef', color: '#1B4D2E', padding: '7px 10px', borderRadius: 20, fontWeight: 700 }}>Dynamic Load Balancing</span>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12 }}>
              <thead><tr style={{ textAlign: 'left', color: '#6b7b72' }}><th style={{ padding: 10 }}>Centre</th><th>Queue</th><th>Est. wait</th><th>Status</th><th>Action</th></tr></thead>
              <tbody>{centers.map((c) => {
                const wait = Math.ceil((c.queue * c.avg) / Math.max(c.active,1));
                return <tr key={c.id} style={{ borderTop: '1px solid #edf0ed' }}><td style={{ padding: 12, fontWeight: 700 }}>{c.name}</td><td>{c.queue}</td><td>{wait} min</td><td>{c.status}</td><td>{c.id === 3 ? <button style={{ border: 0, background: '#F4D03F', color: '#1B4D2E', padding: '7px 10px', borderRadius: 8, fontWeight: 800, cursor: 'pointer' }}>Suggest</button> : '—'}</td></tr>
              })}</tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
