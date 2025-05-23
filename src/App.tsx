import { useState } from "react";
import { AppProvider } from "./context/MainContext";
import CostEntryForm from "./components/CostEntryForm";
import InvoiceForm from "./components/InvoiceGenerator";
import InvoiceEditor from "./components/InvoiceEditor";
import DueReminder from "./components/InvoiceReminder";
import TaxCalculator from "./components/TaxCalculator";

const App = () => {
  const [activeTab, setActiveTab] = useState<string>("cost");

  const renderTab = () => {
    switch (activeTab) {
      case "cost":
        return <CostEntryForm />;
      case "invoice":
        return <InvoiceForm />;
      case "edit":
        return <InvoiceEditor />;
      case "reminder":
        return <DueReminder />;
      case "tax":
        return <TaxCalculator />;
      default:
        return null;
    }
  };

  return (
    <AppProvider>
      <div
        className="container py-5 "
        style={{ minWidth: "95vw", minHeight: "100vh" }}
      >
        <h2 className="text-center mb-4 text-success">Finance SDK Dashboard</h2>

        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "cost" ? "active" : ""}`}
              onClick={() => setActiveTab("cost")}
            >
              Cost Entry
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "invoice" ? "active" : ""}`}
              onClick={() => setActiveTab("invoice")}
            >
              Generate Invoice
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "edit" ? "active" : ""}`}
              onClick={() => setActiveTab("edit")}
            >
              Edit Invoice
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "reminder" ? "active" : ""}`}
              onClick={() => setActiveTab("reminder")}
            >
              Due Reminders
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "tax" ? "active" : ""}`}
              onClick={() => setActiveTab("tax")}
            >
              Tax Calculator
            </button>
          </li>
        </ul>

        <div>{renderTab()}</div>
      </div>
    </AppProvider>
  );
};

export default App;
