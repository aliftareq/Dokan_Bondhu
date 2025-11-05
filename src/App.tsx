import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Toaster } from "./components/ui/sonner";
import { Dashboard } from "./components/Dashboard";
import { InventoryView } from "./components/InventoryView";
import { CustomerLedger } from "./components/CustomerLedger";
import { TransactionsView } from "./components/TransactionsView";
import { LayoutDashboard, Package, Users, Receipt } from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  nameBn: string;
  quantity: number;
  unit: string;
  price: number;
  lastUpdated: Date;
}

export interface Customer {
  id: string;
  name: string;
  phone?: string;
  totalBaki: number;
  transactions: BakiTransaction[];
}

export interface BakiTransaction {
  id: string;
  date: Date;
  amount: number;
  type: 'credit' | 'payment';
  description: string;
}

export interface Transaction {
  id: string;
  date: Date;
  type: 'sale' | 'stock-in' | 'baki-sale' | 'baki-payment';
  productName?: string;
  quantity?: number;
  amount: number;
  customerName?: string;
  description: string;
}

// Helper function to convert numbers to Bengali
const englishToBengaliNumber = (num: number): string => {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().split('').map(digit => bengaliDigits[parseInt(digit)] || digit).join('');
};

// Helper function to get Bengali product name
const getBengaliProductName = (productName: string, products: Product[]): string => {
  const product = products.find(p => 
    p.name.toLowerCase().includes(productName.toLowerCase()) || 
    productName.toLowerCase().includes(p.name.toLowerCase().split(' ')[0])
  );
  return product ? product.nameBn : productName;
};

function App() {
  const [products, setProducts] = useState<Product[]>([
    { id: '1', name: 'Rice (Atta)', nameBn: 'আটা', quantity: 50, unit: 'kg', price: 55, lastUpdated: new Date() },
    { id: '2', name: 'Lentils (Dal)', nameBn: 'ডাল', quantity: 30, unit: 'kg', price: 120, lastUpdated: new Date() },
    { id: '3', name: 'Oil', nameBn: 'তেল', quantity: 20, unit: 'liter', price: 180, lastUpdated: new Date() },
    { id: '4', name: 'Sugar', nameBn: 'চিনি', quantity: 25, unit: 'kg', price: 65, lastUpdated: new Date() },
    { id: '5', name: 'Salt', nameBn: 'লবণ', quantity: 40, unit: 'kg', price: 30, lastUpdated: new Date() },
  ]);

  const [customers, setCustomers] = useState<Customer[]>([
    { 
      id: '1', 
      name: 'Rahim', 
      phone: '01712345678',
      totalBaki: 500, 
      transactions: [
        { id: 't1', date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), amount: 300, type: 'credit', description: 'মুদি দোকান থেকে কেনাকাটা' },
        { id: 't2', date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), amount: 200, type: 'credit', description: 'চাল এবং ডাল' },
      ]
    },
    { 
      id: '2', 
      name: 'Karim', 
      phone: '01898765432',
      totalBaki: 750,
      transactions: [
        { id: 't3', date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), amount: 1000, type: 'credit', description: 'মাসিক কেনাকাটা' },
        { id: 't4', date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), amount: -250, type: 'payment', description: 'আংশিক পরিশোধ' },
      ]
    },
  ]);

  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 'tx1', date: new Date(), type: 'sale', productName: 'Rice (Atta)', quantity: 2, amount: 110, description: 'আটা ২ কেজি বিক্রি হলো ১১০ টাকায়' },
    { id: 'tx2', date: new Date(), type: 'baki-sale', productName: 'Lentils (Dal)', quantity: 1, amount: 120, customerName: 'Rahim', description: 'রহিম ডাল ১ কেজি বাকিতে নিলো ১২০ টাকা' },
  ]);

  const processVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    const newTransaction: Transaction = {
      id: `tx${Date.now()}`,
      date: new Date(),
      type: 'sale',
      amount: 0,
      description: command,
    };

    // Parse Bengali commands for credit (baki)
    // Pattern: "Name + amount + baki"
    const bakiPattern = /(\w+)\s+(\d+)\s+taka\s+baki/i;
    const bakiMatch = command.match(bakiPattern);
    
    if (bakiMatch) {
      const customerName = bakiMatch[1];
      const amount = parseInt(bakiMatch[2]);
      
      // Update or create customer
      setCustomers(prev => {
        const existingCustomer = prev.find(c => c.name.toLowerCase() === customerName.toLowerCase());
        if (existingCustomer) {
          return prev.map(c => 
            c.id === existingCustomer.id 
              ? {
                  ...c,
                  totalBaki: c.totalBaki + amount,
                  transactions: [
                    ...c.transactions,
                    {
                      id: `bt${Date.now()}`,
                      date: new Date(),
                      amount: amount,
                      type: 'credit' as const,
                      description: command
                    }
                  ]
                }
              : c
          );
        } else {
          return [
            ...prev,
            {
              id: `c${Date.now()}`,
              name: customerName,
              totalBaki: amount,
              transactions: [
                {
                  id: `bt${Date.now()}`,
                  date: new Date(),
                  amount: amount,
                  type: 'credit' as const,
                  description: command
                }
              ]
            }
          ];
        }
      });

      newTransaction.type = 'baki-sale';
      newTransaction.amount = amount;
      newTransaction.customerName = customerName;
      newTransaction.description = `${customerName} ${englishToBengaliNumber(amount)} টাকা বাকিতে নিলো`;
      setTransactions(prev => [newTransaction, ...prev]);
      return;
    }

    // Parse payment commands
    const paymentPattern = /(\w+)\s+(\d+)\s+taka\s+(dilo|payment|paid)/i;
    const paymentMatch = command.match(paymentPattern);
    
    if (paymentMatch) {
      const customerName = paymentMatch[1];
      const amount = parseInt(paymentMatch[2]);
      
      setCustomers(prev => 
        prev.map(c => 
          c.name.toLowerCase() === customerName.toLowerCase()
            ? {
                ...c,
                totalBaki: c.totalBaki - amount,
                transactions: [
                  ...c.transactions,
                  {
                    id: `bt${Date.now()}`,
                    date: new Date(),
                    amount: -amount,
                    type: 'payment' as const,
                    description: command
                  }
                ]
              }
            : c
        )
      );

      newTransaction.type = 'baki-payment';
      newTransaction.amount = amount;
      newTransaction.customerName = customerName;
      newTransaction.description = `${customerName} ${englishToBengaliNumber(amount)} টাকা পরিশোধ করলো`;
      setTransactions(prev => [newTransaction, ...prev]);
      return;
    }

    // Parse sale commands
    // Pattern: "Product + quantity + unit + bikri/sale + price"
    const salePattern = /(\w+)\s+(\d+)\s+(kg|liter|piece)\s+(bikri|sale)/i;
    const saleMatch = command.match(salePattern);
    
    if (saleMatch) {
      const productName = saleMatch[1];
      const quantity = parseFloat(saleMatch[2]);
      const unit = saleMatch[3];
      
      // Find price in command
      const pricePattern = /(\d+)\s+taka/i;
      const priceMatch = command.match(pricePattern);
      const totalAmount = priceMatch ? parseInt(priceMatch[1]) : 0;

      // Update inventory
      setProducts(prev => 
        prev.map(p => {
          if (p.name.toLowerCase().includes(productName.toLowerCase()) || 
              p.nameBn.includes(productName) ||
              productName.toLowerCase().includes(p.name.toLowerCase().split(' ')[0])) {
            return {
              ...p,
              quantity: p.quantity - quantity,
              lastUpdated: new Date()
            };
          }
          return p;
        })
      );

      const bengaliProductName = getBengaliProductName(productName, products);
      newTransaction.type = 'sale';
      newTransaction.productName = productName;
      newTransaction.quantity = quantity;
      newTransaction.amount = totalAmount;
      newTransaction.description = `${bengaliProductName} ${englishToBengaliNumber(quantity)} ${unit === 'kg' ? 'কেজি' : unit === 'liter' ? 'লিটার' : 'পিস'} বিক্রি হলো ${englishToBengaliNumber(totalAmount)} টাকায়`;
      setTransactions(prev => [newTransaction, ...prev]);
      return;
    }

    // Parse stock-in commands
    const stockPattern = /(\w+)\s+(\d+)\s+(kg|liter|piece)\s+(stock|ashlo)/i;
    const stockMatch = command.match(stockPattern);
    
    if (stockMatch) {
      const productName = stockMatch[1];
      const quantity = parseFloat(stockMatch[2]);

      setProducts(prev => 
        prev.map(p => {
          if (p.name.toLowerCase().includes(productName.toLowerCase()) || 
              p.nameBn.includes(productName) ||
              productName.toLowerCase().includes(p.name.toLowerCase().split(' ')[0])) {
            return {
              ...p,
              quantity: p.quantity + quantity,
              lastUpdated: new Date()
            };
          }
          return p;
        })
      );

      const bengaliProductName = getBengaliProductName(productName, products);
      newTransaction.type = 'stock-in';
      newTransaction.productName = productName;
      newTransaction.quantity = quantity;
      newTransaction.amount = 0;
      newTransaction.description = `${bengaliProductName} ${englishToBengaliNumber(quantity)} ${stockMatch[3] === 'kg' ? 'কেজি' : stockMatch[3] === 'liter' ? 'লিটার' : 'পিস'} স্টক এসেছে`;
      setTransactions(prev => [newTransaction, ...prev]);
      return;
    }

    // Generic transaction if no pattern matched
    setTransactions(prev => [newTransaction, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-violet-50 pb-28">
      <div className="container mx-auto p-4 max-w-7xl">
        <header className="mb-6 text-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-blue-100">
          <h1 className="text-slate-900 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            Voice-AI Inventory & Sales System
          </h1>
          <p className="text-sm text-slate-600 mt-2">Simple • Smart • Efficient</p>
        </header>

        <Tabs defaultValue="dashboard" className="mt-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="inventory" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline">Inventory</span>
            </TabsTrigger>
            <TabsTrigger value="customers" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Customers</span>
            </TabsTrigger>
            <TabsTrigger value="transactions" className="flex items-center gap-2">
              <Receipt className="w-4 h-4" />
              <span className="hidden sm:inline">Records</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <Dashboard 
              products={products} 
              customers={customers} 
              transactions={transactions} 
            />
          </TabsContent>

          <TabsContent value="inventory">
            <InventoryView products={products} setProducts={setProducts} />
          </TabsContent>

          <TabsContent value="customers">
            <CustomerLedger customers={customers} setCustomers={setCustomers} />
          </TabsContent>

          <TabsContent value="transactions">
            <TransactionsView transactions={transactions} products={products} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default App;
