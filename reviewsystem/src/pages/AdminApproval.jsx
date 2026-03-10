import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "./AdminApproval.css";
import toast from "../components/Toast";

function AdminApproval() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const res = await fetch(import.meta.env.VITE_API_URL + "/admin-requests");
            const data = await res.json();
            setRequests(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching requests:", error);
            setLoading(false);
        }
    };

    const handleApprove = async (id) => {
        try {
            const res = await fetch(import.meta.env.VITE_API_URL + "/approve-admin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });
            const data = await res.json();
            if (data.status === "success") {
                toast.success("Admin approved successfully!");
                fetchRequests();
            } else {
                toast.error("Failed to approve admin.");
            }
        } catch (error) {
            toast.error("Error approving admin.");
        }
    };

    const handleReject = async (id) => {
        try {
            const res = await fetch(import.meta.env.VITE_API_URL + "/reject-admin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });
            const data = await res.json();
            if (data.status === "success") {
                toast.success("Admin rejected.");
                fetchRequests();
            } else {
                toast.error("Failed to reject admin.");
            }
        } catch (error) {
            toast.error("Error rejecting admin.");
        }
    };

    return (
        <div className="admin-approval-page">
            <Navbar />
            <div className="admin-approval-container">
                <h1>Admin Registration Requests</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : requests.length === 0 ? (
                    <p className="no-requests">No pending admin requests.</p>
                ) : (
                    <div className="requests-list">
                        {requests.map((req) => (
                            <div key={req.id} className="request-card">
                                <div className="req-info">
                                    <h3>{req.name}</h3>
                                    <p>{req.email}</p>
                                </div>
                                <div className="req-actions">
                                    <button className="approve-btn" onClick={() => handleApprove(req.id)}>Approve</button>
                                    <button className="reject-btn" onClick={() => handleReject(req.id)}>Reject</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminApproval;
