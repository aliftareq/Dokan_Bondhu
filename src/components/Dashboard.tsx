import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Product, Customer, Transaction } from "../App";
import { Package, Users, TrendingUp, AlertTriangle, DollarSign, Receipt } from 'lucide-react';
import { Badge } from "./ui/badge";

interface DashboardProps {
  products: Product[];
  customers: Customer[];
  transactions: Transaction[];
}

export function Dashboard({ products, customers, transactions }: DashboardProps) {
  const totalInventoryValue = products.reduce((sum, p) => sum + (p.quantity * 1), 0);
  const totalBaki = customers.reduce((sum, c) => sum + c.totalBaki, 0);
  const lowStockProducts = products.filter(p => p.quantity < 10 && p.quantity > 0);
  const outOfStockProducts = products.filter(p => p.quantity === 0);
  
  const todaySales = transactions
    .filter(t => {
      const today = new Date();
      const transactionDate = new Date(t.date);
      return transactionDate.toDateString() === today.toDateString() && 
             (t.type === 'sale' || t.type === 'baki-sale');
    })
    .reduce((sum, t) => sum + t.amount, 0);

  const todayTransactions = transactions.filter(t => {
    const today = new Date();
    const transactionDate = new Date(t.date);
    return transactionDate.toDateString() === today.toDateString();
  });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs text-blue-900">Total Inventory</CardTitle>
            <Package className="w-3.5 h-3.5 text-blue-600" />
          </CardHeader>
          <CardContent className="pt-1">
            <div className="text-blue-900">{totalInventoryValue.toLocaleString()} items</div>
            <p className="text-xs text-blue-700 mt-0.5">
              {products.length} types
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs text-emerald-900">Today's Sales</CardTitle>
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
          </CardHeader>
          <CardContent className="pt-1">
            <div className="text-emerald-900">৳{todaySales.toLocaleString()}</div>
            <p className="text-xs text-emerald-700 mt-0.5">
              {todayTransactions.length} today
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs text-amber-900">Total Baki</CardTitle>
            <DollarSign className="w-3.5 h-3.5 text-amber-600" />
          </CardHeader>
          <CardContent className="pt-1">
            <div className="text-amber-900">৳{totalBaki.toLocaleString()}</div>
            <p className="text-xs text-amber-700 mt-0.5">
              {customers.filter(c => c.totalBaki > 0).length} customers
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs text-orange-900">Low Stock</CardTitle>
            <AlertTriangle className="w-3.5 h-3.5 text-orange-600" />
          </CardHeader>
          <CardContent className="pt-1">
            <div className="text-orange-900">{lowStockProducts.length}</div>
            <p className="text-xs text-orange-700 mt-0.5">
              Items {'<'} 10 units
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs text-red-900">Out of Stock</CardTitle>
            <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
          </CardHeader>
          <CardContent className="pt-1">
            <div className="text-red-900">{outOfStockProducts.length}</div>
            <p className="text-xs text-red-700 mt-0.5">
              Need restock
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-violet-50 to-violet-100 border-violet-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs text-violet-900">Transactions</CardTitle>
            <Receipt className="w-3.5 h-3.5 text-violet-600" />
          </CardHeader>
          <CardContent className="pt-1">
            <div className="text-violet-900">{transactions.length}</div>
            <p className="text-xs text-violet-700 mt-0.5">
              Total records
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <AlertTriangle className="w-4 h-4 text-orange-600" />
              Low Stock Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            {lowStockProducts.length > 0 ? (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {lowStockProducts.slice(0, 5).map(product => (
                  <div key={product.id} className="flex items-center justify-between p-2.5 bg-gradient-to-r from-orange-50 to-transparent rounded-lg border border-orange-100">
                    <div>
                      <p className="text-slate-900 text-sm">{product.name}</p>
                      <p className="text-xs text-slate-600">{product.nameBn}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={product.quantity < 5 ? "destructive" : "secondary"} className="text-xs">
                        {product.quantity} {product.unit}
                      </Badge>
                      <p className="text-xs text-slate-500 mt-0.5">৳{product.price}/{product.unit}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-center py-6 text-sm">All products are well stocked!</p>
            )}
          </CardContent>
          <button className="btn bg-red w-1/3 mx-auto mb-4 text-white">See All</button>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <DollarSign className="w-4 h-4 text-amber-600" />
              Top Customers by Baki
            </CardTitle>
          </CardHeader>
          <CardContent>
            {customers.filter(c => c.totalBaki > 0).length > 0 ? (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {customers
                  .filter(c => c.totalBaki > 0)
                  .sort((a, b) => b.totalBaki - a.totalBaki)
                  .slice(0, 5)
                  .map(customer => (
                    <div key={customer.id} className="flex items-center justify-between p-2.5 bg-gradient-to-r from-amber-50 to-transparent rounded-lg border border-amber-100">
                      <div>
                        <p className="text-slate-900 text-sm">{customer.name}</p>
                        {customer.phone && (
                          <p className="text-xs text-slate-500">{customer.phone}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary" className="bg-amber-100 text-amber-900 text-xs">
                          ৳{customer.totalBaki.toLocaleString()}
                        </Badge>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {customer.transactions.length} records
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-slate-500 text-center py-6 text-sm">No outstanding credit</p>
            )}
          </CardContent>
          <button className="btn bg-red w-1/3 mx-auto mb-4 text-white">See All</button>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Receipt className="w-4 h-4 text-violet-600" />
              Recent Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {todayTransactions.slice(0, 5).map(transaction => (
                <div key={transaction.id} className="flex items-center justify-between p-2.5 bg-gradient-to-r from-violet-50 to-transparent rounded-lg border border-violet-100">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Badge variant={
                        transaction.type === 'sale' ? 'default' :
                        transaction.type === 'baki-sale' ? 'secondary' :
                        transaction.type === 'baki-payment' ? 'outline' :
                        'secondary'
                      } className="text-xs">
                        {transaction.type === 'sale' && 'নগদে বিক্রি'}
                        {transaction.type === 'baki-sale' && 'বাকিতে বিক্রি'}
                        {transaction.type === 'baki-payment' && 'পরিশোধ'}
                        {transaction.type === 'stock-in' && 'স্টক'}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-700 mt-1">{transaction.description}</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {new Date(transaction.date).toLocaleTimeString('en-US', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                  <div className="text-right ml-2">
                    <p className={`text-sm ${
                      transaction.type === 'baki-payment' ? 'text-green-600' : 'text-slate-900'
                    }`}>
                      {transaction.type === 'baki-payment' ? '+' : ''}৳{transaction.amount.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <button className="btn bg-red w-1/3 mx-auto mb-4 text-white">See All</button>
        </Card>
      </div>
    </div>
  );
}
