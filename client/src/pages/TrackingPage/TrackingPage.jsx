import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './TrackingPage.scss';

const ORDER_STATUSES = ['pending', 'approved', 'paid', 'cancelled'];
const TEST_DRIVE_STATUSES = ['pending', 'confirmed', 'cancelled'];

const TrackingPage = () => {
    const { user } = useSelector(state => state.auth);
    const isAdmin = user?.Role === 'Admin';

    const [orders, setOrders] = useState([]);
    const [testDrives, setTestDrives] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [orderStatuses, setOrderStatuses] = useState({});
    const [testDriveStatuses, setTestDriveStatuses] = useState({});

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            const [ordersRes, tdsRes] = await Promise.all([
                axios.get('http://localhost:3000/api/orders'),
                axios.get('http://localhost:3000/api/test-drives'),
            ]);

            const allOrders = Array.isArray(ordersRes.data) ? ordersRes.data : [];
            const allTds = Array.isArray(tdsRes.data) ? tdsRes.data : [];

            const filteredOrders = isAdmin ? allOrders : allOrders.filter(o => o.userId === user?.id);
            const filteredTds = isAdmin ? allTds : allTds.filter(t => t.userId === user?.id);

            setOrders(filteredOrders);
            setTestDrives(filteredTds);

            setOrderStatuses(
                filteredOrders.reduce((acc, o) => {
                    acc[o._id] = o.status || 'pending';
                    return acc;
                }, {})
            );

            setTestDriveStatuses(
                filteredTds.reduce((acc, t) => {
                    acc[t._id] = t.status || 'pending';
                    return acc;
                }, {})
            );

        } catch (err) {
            console.error(err);
            setError('Failed to load tracking data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [user?.id, isAdmin]);

    const handleDeleteTestDrive = async (id) => {
        if (!window.confirm("Are you sure you want to delete this test drive?")) return;
        try {
            await axios.delete(`http://localhost:3000/api/test-drives/${id}`);
            setTestDrives(prev => prev.filter(t => t._id !== id));
        } catch (err) {
            console.error(err);
            alert('Failed to delete test drive');
        }
    };

    const handleDeleteOrder = async (id) => {
        if (!window.confirm("Are you sure you want to delete this order?")) return;
        try {
            await axios.delete(`http://localhost:3000/api/orders/${id}`);
            setOrders(prev => prev.filter(o => o._id !== id));
        } catch (err) {
            console.error(err);
            alert('Failed to delete order');
        }
    };

    const updateOrderStatus = async (id) => {
        try {
            await axios.patch(`http://localhost:3000/api/orders/${id}`, {
                status: orderStatuses[id],
            });
            fetchData();
        } catch (err) {
            console.error(err);
            alert('Failed to update order status');
        }
    };

    const updateTestDriveStatus = async (id) => {
        try {
            await axios.patch(`http://localhost:3000/api/test-drives/${id}`, {
                status: testDriveStatuses[id],
            });
            fetchData();
        } catch (err) {
            console.error(err);
            alert('Failed to update test drive status');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="tracking-page">
            <div className="content-wrap">

                <section className="orders-section">
                    <h2>Orders</h2>

                    {orders.length === 0 ? (
                        <p>No orders yet</p>
                    ) : (
                        <table className="simple-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Status</th>
                                    {isAdmin && <th>Actions</th>}
                                </tr>
                            </thead>

                            <tbody>
                                {orders.map((o) => (
                                    <tr key={o._id}>
                                        <td>{o.fullname || o.name || '—'}</td>

                                        <td>
                                            {isAdmin ? (
                                                <select
                                                    value={orderStatuses[o._id] || 'pending'}
                                                    onChange={(e) =>
                                                        setOrderStatuses(prev => ({
                                                            ...prev,
                                                            [o._id]: e.target.value,
                                                        }))
                                                    }
                                                >
                                                    {ORDER_STATUSES.map(s => (
                                                        <option key={s} value={s}>{s}</option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <span className="muted">{o.status || 'pending'}</span>
                                            )}
                                        </td>

                                        {isAdmin && (
                                            <td>
                                                <button onClick={() => updateOrderStatus(o._id)}>Save</button>
                                                <button onClick={() => handleDeleteOrder(o._id)}>Delete</button>
                                            </td>
                                        )}
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
                                    <th>Status</th>
                                    {isAdmin && <th>Actions</th>}
                                </tr>
                            </thead>

                            <tbody>
                                {testDrives.map((t) => (
                                    <tr key={t._id}>
                                        <td>{t.fullname || t.name || '—'}</td>
                                        <td>{t.preferredDate || t.date || '—'}</td>

                                        <td>
                                            {isAdmin ? (
                                                <select
                                                    value={testDriveStatuses[t._id] || 'pending'}
                                                    onChange={(e) =>
                                                        setTestDriveStatuses(prev => ({
                                                            ...prev,
                                                            [t._id]: e.target.value,
                                                        }))
                                                    }
                                                >
                                                    {TEST_DRIVE_STATUSES.map(s => (
                                                        <option key={s} value={s}>{s}</option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <span className="muted">{t.status || 'pending'}</span>
                                            )}
                                        </td>

                                        {isAdmin && (
                                            <td>
                                                <button onClick={() => updateTestDriveStatus(t._id)}>Save</button>
                                                <button onClick={() => handleDeleteTestDrive(t._id)}>Delete</button>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </section>

            </div>
        </div>
    );
}

export default TrackingPage;
