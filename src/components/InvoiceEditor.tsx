import React, { useState } from "react";
import { useAppContext } from "../context/MainContext";

const InvoiceEditor: React.FC = () => {
  const { invoices, editInvoice } = useAppContext();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    clientId: "",
    contact: "",
    dueDate: "",
    tax: "",
    discount: "",
    items: [{ name: "", quantity: "", unitPrice: "" }],
  });

  const startEdit = (id: string) => {
    const invoice = invoices.find((inv) => inv.id === id);
    if (!invoice) return;

    setEditingId(id);
    setForm({
      clientId: invoice.clientId,
      contact: invoice.contact,
      dueDate: invoice.dueDate,
      tax: invoice.tax.toString(),
      discount: invoice.discount.toString(),
      items: invoice.items.map((item) => ({
        name: item.name,
        quantity: item.quantity.toString(),
        unitPrice: item.unitPrice.toString(),
      })),
    });
  };

  const handleItemChange = (index: number, field: string, value: string) => {
    const updatedItems = [...form.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
    };
    setForm({ ...form, items: updatedItems });
  };

  const handleAddItem = () => {
    setForm({
      ...form,
      items: [...form.items, { name: "", quantity: "", unitPrice: "" }],
    });
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;

    editInvoice(editingId, {
      clientId: form.clientId,
      contact: form.contact,
      dueDate: form.dueDate,
      tax: parseFloat(form.tax),
      discount: parseFloat(form.discount),
      items: form.items.map((i) => ({
        name: i.name,
        quantity: Number(i.quantity),
        unitPrice: Number(i.unitPrice),
      })),
    });

    setEditingId(null);
    setForm({
      clientId: "",
      contact: "",
      dueDate: "",
      tax: "",
      discount: "",
      items: [{ name: "", quantity: "", unitPrice: "" }],
    });
  };

  return (
    <div className="container-fluid p-4 bg-white rounded-4 shadow-sm">
      <h4 className="text-success text-center border-bottom pb-2 mb-4">
        🛠️ Invoice Editor
      </h4>

      {editingId && (
        <form className="row g-3 mb-5" onSubmit={handleUpdate}>
          <h6 className="text-success">
            Editing Invoice ID: <code>{editingId}</code>
          </h6>

          <div className="col-md-4">
            <label className="form-label">Client ID</label>
            <input
              className="form-control"
              value={form.clientId}
              onChange={(e) => setForm({ ...form, clientId: e.target.value })}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Contact</label>
            <input
              className="form-control"
              value={form.contact}
              onChange={(e) => setForm({ ...form, contact: e.target.value })}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Due Date</label>
            <input
              type="date"
              className="form-control"
              value={form.dueDate}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">Tax %</label>
            <input
              type="number"
              className="form-control"
              value={form.tax}
              onChange={(e) => setForm({ ...form, tax: e.target.value })}
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">Discount %</label>
            <input
              type="number"
              className="form-control"
              value={form.discount}
              onChange={(e) => setForm({ ...form, discount: e.target.value })}
            />
          </div>

          <div className="col-12 mt-3">
            <h6 className="text-primary">🧺 Invoice Items</h6>
            {form.items.map((item, idx) => (
              <div key={idx} className="row g-2 mb-2 align-items-center">
                <div className="col-md-4">
                  <input
                    className="form-control"
                    placeholder="Item Name"
                    value={item.name}
                    onChange={(e) =>
                      handleItemChange(idx, "name", e.target.value)
                    }
                  />
                </div>
                <div className="col-md-3">
                  <input
                    className="form-control"
                    type="number"
                    placeholder="Quantity"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(idx, "quantity", e.target.value)
                    }
                  />
                </div>
                <div className="col-md-3">
                  <input
                    className="form-control"
                    type="number"
                    placeholder="Unit Price"
                    value={item.unitPrice}
                    onChange={(e) =>
                      handleItemChange(idx, "unitPrice", e.target.value)
                    }
                  />
                </div>
              </div>
            ))}
            <div className="text-end">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={handleAddItem}
              >
                ➕ Add Item
              </button>
            </div>
          </div>

          <div className="col-12 text-end">
            <button type="submit" className="btn btn-primary mt-2">
              💾 Save Changes
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary ms-2 mt-2"
              onClick={() => setEditingId(null)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {invoices.length === 0 ? (
        <p className="text-muted">No invoices available.</p>
      ) : (
        <div className="table-responsive w-100">
          <table className="table table-bordered table-hover w-100 align-middle">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Client ID</th>
                <th>Contact</th>
                <th>Tax (%)</th>
                <th>Discount (%)</th>
                <th>Due Date</th>
                <th>Items</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv, index) => (
                <tr key={inv.id}>
                  <td>{index + 1}</td>
                  <td>{inv.clientId}</td>
                  <td>{inv.contact}</td>
                  <td>{inv.tax}%</td>
                  <td>{inv.discount}%</td>
                  <td>
                    <span className="badge bg-warning-subtle text-dark">
                      {inv.dueDate}
                    </span>
                  </td>
                  <td>
                    {inv.items.map((item, i) => (
                      <div key={i}>
                        {item.name} ({item.quantity} × ${item.unitPrice})
                      </div>
                    ))}
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => startEdit(inv.id)}
                    >
                      ✏️ Edit
                    </button>
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

export default InvoiceEditor;
