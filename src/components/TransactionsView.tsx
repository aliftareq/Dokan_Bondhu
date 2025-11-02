import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Transaction, Product } from "../App";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Receipt, Search, Calendar, Package, User, DollarSign } from 'lucide-react';
import { Button } from "./ui/button";

interface TransactionsViewProps {
  transactions: Transaction[];
  products?: Product[];
}

// Helper function to convert numbers to Bengali
const englishToBengaliNumber = (num: number): string => {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().split('').map(digit => bengaliDigits[parseInt(digit)] || digit).join('');
};

export function TransactionsView({ transactions, products = [] }: TransactionsViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  // Helper to get Bengali product name
  const getBengaliProductName = (productName?: string): string => {
    if (!productName) return '';
    const product = products.find(p => 
      p.name.toLowerCase().includes(productName.toLowerCase()) || 
      productName.toLowerCase().includes(p.name.toLowerCase().split(' ')[0])
    );
    return product ? product.nameBn : productName;
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (transaction.customerName && transaction.customerName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (transaction.productName && transaction.productName.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = filterType === 'all' || transaction.type === filterType;
    
    return matchesSearch && matchesFilter;
  });

  const totalSales = transactions
    .filter(t => t.type === 'sale' || t.type === 'baki-sale')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalPayments = transactions
    .filter(t => t.type === 'baki-payment')
    .reduce((sum, t) => sum + t.amount, 0);

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'sale':
      case 'baki-sale':
        return <DollarSign className="w-4 h-4" />;
      case 'stock-in':
        return <Package className="w-4 h-4" />;
      case 'baki-payment':
        return <User className="w-4 h-4" />;
      default:
        return <Receipt className="w-4 h-4" />;
    }
  };

  const getTransactionBadge = (type: string) => {
    switch (type) {
      case 'sale':
        return { label: 'নগদে বিক্রি', variant: 'default' as const };
      case 'baki-sale':
        return { label: 'বাকিতে বিক্রি', variant: 'secondary' as const };
      case 'baki-payment':
        return { label: 'পরিশোধ', variant: 'outline' as const };
      case 'stock-in':
        return { label: 'স্টক', variant: 'secondary' as const };
      default:
        return { label: type, variant: 'outline' as const };
    }
  };

  return (
    <div className="space-y-4">
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle className="flex items-center gap-2">
                <Receipt className="w-5 h-5" />
                All Transactions
              </CardTitle>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button
                variant={filterType === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterType('all')}
              >
                All
              </Button>
              <Button
                variant={filterType === 'sale' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterType('sale')}
              >
                নগদে বিক্রি
              </Button>
              <Button
                variant={filterType === 'baki-sale' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterType('baki-sale')}
              >
                বাকিতে বিক্রি
              </Button>
              <Button
                variant={filterType === 'baki-payment' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterType('baki-payment')}
              >
                পরিশোধ
              </Button>
              <Button
                variant={filterType === 'stock-in' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterType('stock-in')}
              >
                স্টক
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 shadow-sm">
              <p className="text-sm text-green-700 mb-1">Total Sales</p>
              <p className="text-green-900">৳{totalSales.toLocaleString()}</p>
              <p className="text-xs text-green-600 mt-1">
                {transactions.filter(t => t.type === 'sale' || t.type === 'baki-sale').length} transactions
              </p>
            </div>
            <div className="p-4 bg-gradient-to-r from-blue-50 to-sky-50 rounded-lg border border-blue-200 shadow-sm">
              <p className="text-sm text-blue-700 mb-1">Total Payments Received</p>
              <p className="text-blue-900">৳{totalPayments.toLocaleString()}</p>
              <p className="text-xs text-blue-600 mt-1">
                {transactions.filter(t => t.type === 'baki-payment').length} payments
              </p>
            </div>
            <div className="p-4 bg-gradient-to-r from-violet-50 to-purple-50 rounded-lg border border-violet-200 shadow-sm">
              <p className="text-sm text-violet-700 mb-1">Total Transactions</p>
              <p className="text-violet-900">{transactions.length}</p>
              <p className="text-xs text-violet-600 mt-1">All time</p>
            </div>
          </div>

          <div className="space-y-2">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => {
                const badge = getTransactionBadge(transaction.type);
                const bengaliProductName = getBengaliProductName(transaction.productName);
                const bengaliQuantity = transaction.quantity ? englishToBengaliNumber(transaction.quantity) : '';
                
                return (
                  <div 
                    key={transaction.id} 
                    className="flex items-start justify-between p-4 bg-gradient-to-r from-slate-50 to-transparent rounded-lg border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-start gap-3 flex-1">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border-2 border-slate-200 shadow-sm">
                        {getTransactionIcon(transaction.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <Badge variant={badge.variant}>{badge.label}</Badge>
                          {transaction.customerName && (
                            <span className="text-sm text-slate-700">
                              • {transaction.customerName}
                            </span>
                          )}
                          {bengaliProductName && (
                            <span className="text-sm text-slate-700">
                              • {bengaliProductName}
                            </span>
                          )}
                          {bengaliQuantity && (
                            <span className="text-sm text-slate-600">
                              • {bengaliQuantity} ইউনিট
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-slate-700">
                          {transaction.description}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-slate-500 mt-2">
                          <Calendar className="w-3 h-3" />
                          {new Date(transaction.date).toLocaleDateString('en-GB')} at{' '}
                          {new Date(transaction.date).toLocaleTimeString('en-US', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <p className={`${
                        transaction.type === 'baki-payment' 
                          ? 'text-green-600' 
                          : transaction.type === 'stock-in'
                          ? 'text-slate-600'
                          : 'text-slate-900'
                      }`}>
                        {transaction.type === 'baki-payment' && '+'}
                        {transaction.type === 'stock-in' ? '—' : `৳${transaction.amount.toLocaleString()}`}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12">
                <Receipt className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                <p className="text-slate-500">No transactions found</p>
                <p className="text-sm text-slate-400 mt-2">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
