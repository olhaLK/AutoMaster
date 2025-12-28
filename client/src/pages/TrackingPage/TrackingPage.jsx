import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Modal from '../../components/layout/Modal/Modal.jsx';
import TestDriveForm from '../../components/forms/TestDriveForm/TestDriveForm.jsx';
import './TrackingPage.scss';
import OrderForm from '../../components/forms/OrderCarForm/OrderCarForm.jsx';



const TrackingPage = () => {
    const { user } = useSelector(state => state.auth);

    const [orders, setOrders] = useState([]);
    const [testDrives, setTestDrives] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [editingTestDrive, setEditingTestDrive] = useState(null);
    const [editingOrder, setEditingOrder] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const [ordersRes, tdsRes] = await Promise.all([
                axios.get('http://localhost:3000/api/orders'),
                axios.get('http://localhost:3000/api/test-drives')
            ]);

            const filteredOrders = user?.Role === 'Admin'
                ? ordersRes.data
                : ordersRes.data.filter(o => o.userId === user.id);

            const filteredTds = user?.Role === 'Admin'
                ? tdsRes.data
                : tdsRes.data.filter(t => t.userId === user.id);

            setOrders(Array.isArray(filteredOrders) ? filteredOrders : []);
            setTestDrives(Array.isArray(filteredTds) ? filteredTds : []);
        } catch (err) {
            console.error(err);
            setError('Failed to load tracking data');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [user]);


    const handleDeleteTestDrive = async (id) => {
        if (!window.confirm("Are you sure you want to delete this test drive?")) return;
        try {
            await axios.delete(`http://localhost:3000/api/test-drives/${id}`);
            setTestDrives(prev => prev.filter(t => t._id !== id));
        } catch (err) {
            console.error(err);
            alert('Failed to delete test drive');
        }
    }

    const handleEditTestDrive = (td) => {
        setEditingTestDrive(td);
        setEditingOrder(null);
        setModalOpen(true);
    }


    const handleDeleteOrder = async (id) => {
        if (!window.confirm("Are you sure you want to delete this order?")) return;
        try {
            await axios.delete(`http://localhost:3000/api/orders/${id}`);
            setOrders(prev => prev.filter(o => o._id !== id));
        } catch (err) {
            console.error(err);
            alert('Failed to delete order');
        }
    }

    const handleEditOrder = (order) => {
        setEditingOrder(order);
        setEditingTestDrive(null);
        setModalOpen(true);
    }

    const closeModal = () => {
        setEditingTestDrive(null);
        setEditingOrder(null);
        setModalOpen(false);
    }

    const handleFormSuccess = () => {
        fetchData();
        closeModal();
    }

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
                                <th>Progress</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {orders.map((o) => (
                                <tr key={o._id}>
                                    <td>{o.fullname || o.name || '—'}</td>
                                    <td className="muted">{o.progress}</td>
                                    <td>
                                        <button onClick={() => handleEditOrder(o)}>Edit</button>
                                        <button onClick={() => handleDeleteOrder(o._id)}>Delete</button>
                                    </td>
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
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {testDrives.map((t) => (
                                <tr key={t._id}>
                                    <td>{t.fullname || t.name || '—'}</td>
                                    <td>{t.preferredDate || t.date || '—'}</td>
                                    <td className="muted">{t.comment ? 'scheduled' : 'in process'}</td>
                                    <td>
                                        <button onClick={() => handleEditTestDrive(t)}>Edit</button>
                                        <button onClick={() => handleDeleteTestDrive(t._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}
                </section>

                <Modal isOpen={modalOpen} onClose={closeModal}>
                    {editingTestDrive && (
                        <TestDriveForm
                            testDrive={editingTestDrive}
                            onSuccess={handleFormSuccess}
                        />
                    )}
                    {editingOrder && (
                        <OrderForm
                            order={editingOrder}
                            onSuccess={handleFormSuccess}
                        />
                    )}
                </Modal>

            </div>
        </div>
    );
}

export default TrackingPage;
