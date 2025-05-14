import React, { useState } from "react";

const TaxCalculator: React.FC = () => {
  const [subtotal, setSubtotal] = useState("");
  const [taxRate, setTaxRate] = useState("");
  const [total, setTotal] = useState<number | null>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    const sub = parseFloat(subtotal);
    const rate = parseFloat(taxRate);

    if (isNaN(sub) || isNaN(rate)) {
      setError("Please enter valid numbers for subtotal and tax rate.");
      setTotal(null);
      return;
    }

    setError("");
    const result = sub + (sub * rate) / 100;
    setTotal(result);
  };

  return (
    <div
      className="bg-white   p-4 rounded-4 shadow-sm"
      style={{ minWidth: "100%", margin: "0 auto" }}
    >
      <h4 className="text-success text-center mb-4">🧮 Tax Calculator</h4>

      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <label className="form-label fw-semibold">Subtotal ($)</label>
          <input
            type="number"
            className="form-control"
            placeholder="e.g. 1000"
            value={subtotal}
            onChange={(e) => setSubtotal(e.target.value)}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label fw-semibold">Tax Rate (%)</label>
          <input
            type="number"
            className="form-control"
            placeholder="e.g. 15"
            value={taxRate}
            onChange={(e) => setTaxRate(e.target.value)}
          />
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="text-end">
        <button className="btn btn-success px-4" onClick={calculate}>
          ✅ Calculate
        </button>
      </div>

      {total !== null && (
        <div className="alert alert-info mt-4">
          <h6 className="mb-2">Result</h6>
          <p className="mb-0">
            <strong>Total with tax:</strong> ${total.toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
};

export default TaxCalculator;
