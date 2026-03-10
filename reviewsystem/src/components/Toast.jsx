import { useState, useEffect, useCallback } from "react";
import "./Toast.css";

/* ─── single toast item ─── */
function ToastItem({ toast, onClose }) {
    const [exiting, setExiting] = useState(false);

    useEffect(() => {
        if (toast.type === "confirm") return; // confirms don't auto-dismiss
        const timer = setTimeout(() => {
            setExiting(true);
            setTimeout(() => onClose(toast.id), 350);
        }, toast.duration || 3000);
        return () => clearTimeout(timer);
    }, [toast, onClose]);

    const handleClose = () => {
        setExiting(true);
        setTimeout(() => onClose(toast.id), 350);
    };

    const icon =
        toast.type === "success"
            ? "✔"
            : toast.type === "error"
                ? "✖"
                : toast.type === "warning"
                    ? "⚠"
                    : toast.type === "confirm"
                        ? "❓"
                        : "ℹ";

    return (
        <div className={`toast-item toast-${toast.type} ${exiting ? "toast-exit" : ""}`}>
            <span className="toast-icon">{icon}</span>
            <span className="toast-message">{toast.message}</span>

            {toast.type === "confirm" ? (
                <div className="toast-confirm-btns">
                    <button
                        className="toast-btn toast-btn-yes"
                        onClick={() => {
                            toast.onConfirm?.();
                            handleClose();
                        }}
                    >
                        Yes
                    </button>
                    <button
                        className="toast-btn toast-btn-no"
                        onClick={() => {
                            toast.onCancel?.();
                            handleClose();
                        }}
                    >
                        No
                    </button>
                </div>
            ) : (
                <button className="toast-close" onClick={handleClose}>
                    ×
                </button>
            )}
        </div>
    );
}

/* ─── container + hook ─── */
let _addToast = () => { };

export function ToastContainer() {
    const [toasts, setToasts] = useState([]);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    _addToast = useCallback(
        (toast) => {
            const id = Date.now() + Math.random();
            setToasts((prev) => [...prev, { ...toast, id }]);
        },
        []
    );

    return (
        <div className="toast-container">
            {toasts.map((t) => (
                <ToastItem key={t.id} toast={t} onClose={removeToast} />
            ))}
        </div>
    );
}

/* ─── public API ─── */
const toast = {
    success: (message, duration) =>
        _addToast({ type: "success", message, duration }),
    error: (message, duration) =>
        _addToast({ type: "error", message, duration }),
    warning: (message, duration) =>
        _addToast({ type: "warning", message, duration }),
    info: (message, duration) =>
        _addToast({ type: "info", message, duration }),
    confirm: (message, onConfirm, onCancel) =>
        _addToast({ type: "confirm", message, onConfirm, onCancel }),
};

export default toast;
