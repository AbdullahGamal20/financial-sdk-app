import React, { useState } from "react";
import { useAppContext } from "../context/MainContext";

const CostEntryForm: React.FC = () => {
  const { costEntries, addCostEntry } = useAppContext();
  const [form, setForm] = useState({
    category: "",
    amount: "",
    date: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.category || !form.amount || !form.date) return;
    addCostEntry({ ...form, amount: parseFloat(form.amount) });
    setForm({ category: "", amount: "", date: "", description: "" });
  };

  return (
    <div className="shadow-sm p-4 bg-white rounded-4 border border-secondary-subtle">
      <h4 className="text-primary-emphasis mb-4 text-center border-bottom pb-2">
        📊 Add a New Cost Entry
      </h4>

      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label fw-semibold">Category</label>
          <input
            className="form-control"
            placeholder="e.g., Marketing, Rent"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label fw-semibold">Amount ($)</label>
          <input
            className="form-control"
            type="number"
            placeholder="e.g., 150.00"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label fw-semibold">Date</label>
          <input
            className="form-control"
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label fw-semibold">Description</label>
          <input
            className="form-control"
            placeholder="Optional note..."
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        <div className="col-12 text-end">
          <button className="btn btn-success px-4">➕ Add Entry</button>
        </div>
      </form>

      {costEntries.length > 0 && (
        <div className="mt-5">
          <h5 className="text-secondary">🗂 Stored Entries</h5>
          <ul className="list-group list-group-flush mt-2">
            {costEntries.map((entry) => (
              <li
                key={entry.id}
                className="list-group-item d-flex justify-content-between align-items-start bg-light-subtle rounded shadow-sm my-2"
              >
                <div>
                  <strong>{entry.category}</strong> <br />
                  <small className="text-muted">{entry.description}</small>
                </div>
                <div className="text-end">
                  <span className="badge bg-primary-subtle text-dark me-2">
                    ${entry.amount}
                  </span>
                  <span className="badge bg-warning-subtle text-dark">
                    {entry.date}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CostEntryForm;
