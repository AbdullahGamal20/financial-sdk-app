export interface CostEntry {
  id: number;
  category: string;
  amount: number;
  date: string;
  description: string;
}

export interface InvoiceItem {
  name: string;
  qty: number;
  price: number;
}

export interface Invoice {
  id: number;
  clientId: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
}
