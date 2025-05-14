import React, { useState, useMemo } from "react";
import { useAppContext } from "../context/MainContext";

const InvoiceForm: React.FC = () => {
  const { addInvoice, invoices } = useAppContext();
  const [clientId, setClientId] = useState("");
  const [contact, setContact] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [tax, setTax] = useState("");
  const [discount, setDiscount] = useState("");
  const [items, setItems] = useState([
    { name: "", quantity: "", unitPrice: "" },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientId || !dueDate || !contact) return;
    addInvoice({
      clientId,
      contact,
      dueDate,
      tax: parseFloat(tax),
      discount: parseFloat(discount),
      items: items.map((i) => ({
        ...i,
        quantity: Number(i.quantity),
        unitPrice: Number(i.unitPrice),
      })),
    });
    setClientId("");
    setDueDate("");
    setContact("");
    setTax("");
    setDiscount("");
    setItems([{ name: "", quantity: "", unitPrice: "" }]);
  };

  // 🧮 Live total calculation
  const { subtotal, taxAmount, discountAmount, total } = useMemo(() => {
    const subtotal = items.reduce((sum, i) => {
      const qty = parseFloat(i.quantity) || 0;
      const price = parseFloat(i.unitPrice) || 0;
      return sum + qty * price;
    }, 0);
    const taxRate = parseFloat(tax) || 0;
    const discountRate = parseFloat(discount) || 0;
    const taxAmount = subtotal * (taxRate / 100);
    const discountAmount = subtotal * (discountRate / 100);
    const total = subtotal + taxAmount - discountAmount;
    return { subtotal, taxAmount, discountAmount, total };
  }, [items, tax, discount]);

  return (
    <div className="p-4 bg-white border rounded-4 shadow-sm">
      <h4 className="text-success text-center border-bottom pb-2 mb-4">
        🧾 Create Invoice
      </h4>

      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label fw-semibold">Client ID</label>
          <input
            className="form-control"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold">Contact</label>
          <input
            className="form-control"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold">Due Date</label>
          <input
            type="date"
            className="form-control"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <label className="form-label fw-semibold">Tax %</label>
          <input
            className="form-control"
            value={tax}
            onChange={(e) => setTax(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <label className="form-label fw-semibold">Discount %</label>
          <input
            className="form-control"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
        </div>

        <div className="col-12 mt-3">
          <h6 className="text-primary">🧺 Invoice Items</h6>
          {items.map((item, idx) => (
            <div key={idx} className="row g-2 mb-2 align-items-center">
              <div className="col-md-4">
                <input
                  className="form-control"
                  placeholder="Item"
                  value={item.name}
                  onChange={(e) => {
                    const updated = [...items];
                    updated[idx].name = e.target.value;
                    setItems(updated);
                  }}
                />
              </div>
              <div className="col-md-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Quantity"
                  value={item.quantity}
                  onChange={(e) => {
                    const updated = [...items];
                    updated[idx].quantity = e.target.value;
                    setItems(updated);
                  }}
                />
              </div>
              <div className="col-md-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Unit Price"
                  value={item.unitPrice}
                  onChange={(e) => {
                    const updated = [...items];
                    updated[idx].unitPrice = e.target.value;
                    setItems(updated);
                  }}
                />
              </div>
            </div>
          ))}

          <div className="text-end">
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm mt-2"
              onClick={() =>
                setItems([...items, { name: "", quantity: "", unitPrice: "" }])
              }
            >
              ➕ Add Another Item
            </button>
          </div>
        </div>

        {/* 💰 Live Totals */}
        <div className="col-12">
          <div className="bg-light p-3 rounded mt-3">
            <h6 className="mb-2">💰 Invoice Summary</h6>
            <p className="mb-1">
              Subtotal: <strong>${subtotal.toFixed(2)}</strong>
            </p>
            <p className="mb-1">
              Tax: <strong>${taxAmount.toFixed(2)}</strong>
            </p>
            <p className="mb-1">
              Discount: <strong>${discountAmount.toFixed(2)}</strong>
            </p>
            <p className="fw-bold fs-5 text-success">
              Total: ${total.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="col-12 text-end">
          <button type="submit" className="btn btn-success px-4">
            ✅ Submit Invoice
          </button>
        </div>
      </form>

      {invoices.length > 0 && (
        <div className="mt-5">
          <h6 className="text-secondary mb-3">📜 All Invoices</h6>
          <div className="table-responsive">
            <table className="table table-bordered table-striped table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Invoice ID</th>
                  <th>Client ID</th>
                  <th>Items</th>
                  <th>Contact</th>
                  <th>Due Date</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv, index) => {
                  const total = inv.items.reduce(
                    (sum, item) => sum + item.quantity * item.unitPrice,
                    0
                  );
                  const taxAmount = total * (inv.tax / 100);
                  const discountAmount = total * (inv.discount / 100);
                  const finalTotal = total + taxAmount - discountAmount;

                  return (
                    <tr key={inv.id}>
                      <td>{index + 1}</td>
                      <td>{inv.clientId}</td>
                      <td>{inv.items.length}</td>
                      <td>
                        <span className="badge bg-warning-subtle text-dark">
                          {inv.contact}
                        </span>
                      </td>
                      <td>
                        <span className="badge bg-warning-subtle text-dark">
                          {inv.dueDate}
                        </span>
                      </td>
                      <td className="text-success fw-bold">
                        ${finalTotal.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceForm;
