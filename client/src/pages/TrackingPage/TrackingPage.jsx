import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TrackingPage.scss';

const TrackingPage = () => {
  const [orders, setOrders] = useState([]);
  const [testDrives, setTestDrives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [ordersRes, tdsRes] = await Promise.all([
          axios.get('http://localhost:3000/api/orders'),
          axios.get('http://localhost:3000/api/test-drives')
        ]);
        setOrders(Array.isArray(ordersRes.data) ? ordersRes.data : []);
        setTestDrives(Array.isArray(tdsRes.data) ? tdsRes.data : []);
      } catch (err) {
        console.error(err);
        setError('Failed to load tracking data');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="tracking-page">
      <div className="content-wrap">
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}

        <section className="orders-section">
          <h2>Orders</h2>
          {orders.length === 0 ? (
            <p>No orders yet</p>
          ) : (
            <table className="simple-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Progress</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o._id}>
                    <td>{o.fullname || o.name || '—'}</td>
                    <td className="muted">{o.progress}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        <section className="testdrives-section">
          <h2>Test drives</h2>
          {testDrives.length === 0 ? (
            <p>No test drives yet</p>
          ) : (
            <table className="simple-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Progress</th>
                </tr>
              </thead>
              <tbody>
                {testDrives.map((t) => (
                  <tr key={t._id}>
                    <td>{t.fullname || t.name || '—'}</td>
                    <td>{t.preferredDate || t.date || '—'}</td>
                    <td className="muted">{t.comment ? 'scheduled' : 'in process'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </div>
  )
}

export default TrackingPage