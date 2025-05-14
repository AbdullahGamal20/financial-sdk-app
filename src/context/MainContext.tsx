import React, { createContext, useContext, useState, ReactNode } from "react";

export interface CostEntry {
  id: string;
  category: string;
  amount: number;
  date: string;
  description: string;
}

export interface InvoiceItem {
  name: string;
  quantity: number;
  unitPrice: number;
}

export interface Invoice {
  id: string;
  clientId: string;
  items: InvoiceItem[];
  tax: number;
  discount: number;
  dueDate: string;
  contact: string;
}

interface AppContextProps {
  costEntries: CostEntry[];
  addCostEntry: (entry: Omit<CostEntry, "id">) => void;
  invoices: Invoice[];
  addInvoice: (invoice: Omit<Invoice, "id">) => void;
  editInvoice: (id: string, updated: Partial<Invoice>) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [costEntries, setCostEntries] = useState<CostEntry[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  const addCostEntry = (entry: Omit<CostEntry, "id">) => {
    const newEntry: CostEntry = { ...entry, id: crypto.randomUUID() };
    setCostEntries((prev) => [...prev, newEntry]);
  };

  const addInvoice = (invoice: Omit<Invoice, "id">) => {
    const newInvoice: Invoice = { ...invoice, id: crypto.randomUUID() };
    setInvoices((prev) => [...prev, newInvoice]);
  };

  const editInvoice = (id: string, updated: Partial<Invoice>) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, ...updated } : inv))
    );
  };

  return (
    <AppContext.Provider
      value={{ costEntries, addCostEntry, invoices, addInvoice, editInvoice }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useAppContext must be used within an AppProvider");
  return context;
};
