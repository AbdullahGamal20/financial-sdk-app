import React from "react";
import { useAppContext } from "../context/MainContext";

const DueReminder: React.FC = () => {
  const { invoices } = useAppContext();
  const today = new Date();
  today.setHours(0, 0, 0, 0); // normalize

  const overdue = invoices.filter((inv) => {
    const due = new Date(inv.dueDate);
    due.setHours(0, 0, 0, 0);
    return due < today;
  });

  return (
    <div className="p-4 bg-light border rounded-4 shadow-sm">
      <h4 className="text-success mb-3">⏰ Overdue Invoice Reminders</h4>
      {overdue.length === 0 ? (
        <div className="alert alert-success mb-0">
          ✅ No overdue invoices. All caught up!
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead className="table-warning">
              <tr>
                <th>#</th>
                <th>Client ID</th>
                <th>Due Date</th>
                <th>Contact</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {overdue.map((inv, index) => (
                <tr key={inv.id}>
                  <td>{index + 1}</td>
                  <td>
                    <strong>{inv.clientId}</strong>
                  </td>
                  <td>{inv.dueDate}</td>
                  <td>{inv.contact}</td>
                  <td>
                    <span className="badge bg-danger-subtle text-danger-emphasis">
                      Overdue
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DueReminder;
