import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Customer } from "../App";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Users, Search, Phone, Calendar, TrendingUp, TrendingDown } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

interface CustomerLedgerProps {
  customers: Customer[];
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
}

export function CustomerLedger({ customers, setCustomers }: CustomerLedgerProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (customer.phone && customer.phone.includes(searchQuery))
  );

  const totalBaki = customers.reduce((sum, c) => sum + c.totalBaki, 0);
  const customersWithBaki = customers.filter(c => c.totalBaki > 0).length;

  return (
    <div className="space-y-4">
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Customer Ledger (Baki)
            </CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Search customers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200 shadow-sm">
              <p className="text-sm text-amber-700 mb-1">Total Outstanding Baki</p>
              <p className="text-amber-900">৳{totalBaki.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-blue-50 to-sky-50 rounded-lg border border-blue-200 shadow-sm">
              <p className="text-sm text-blue-700 mb-1">Customers with Credit</p>
              <p className="text-blue-900">{customersWithBaki}</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg border border-emerald-200 shadow-sm">
              <p className="text-sm text-emerald-700 mb-1">Total Customers</p>
              <p className="text-emerald-900">{customers.length}</p>
            </div>
          </div>

          {filteredCustomers.length > 0 ? (
            <Accordion type="single" collapsible className="space-y-2">
              {filteredCustomers
                .sort((a, b) => b.totalBaki - a.totalBaki)
                .map((customer) => (
                  <AccordionItem 
                    key={customer.id} 
                    value={customer.id}
                    className="border rounded-lg px-4 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-r from-white to-slate-50"
                  >
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center justify-between w-full pr-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-slate-600" />
                          </div>
                          <div className="text-left">
                            <p className="text-slate-900">{customer.name}</p>
                            {customer.phone && (
                              <div className="flex items-center gap-1 text-xs text-slate-500">
                                <Phone className="w-3 h-3" />
                                {customer.phone}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge 
                            variant={customer.totalBaki > 0 ? "secondary" : "outline"}
                            className={customer.totalBaki > 0 ? "bg-orange-100 text-orange-800" : ""}
                          >
                            ৳{customer.totalBaki.toLocaleString()}
                          </Badge>
                          <p className="text-xs text-slate-500 mt-1">
                            {customer.transactions.length} transactions
                          </p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pt-4 space-y-3">
                        <h4 className="text-sm text-slate-700">Transaction History:</h4>
                        {customer.transactions
                          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                          .map((transaction) => (
                            <div 
                              key={transaction.id} 
                              className="flex items-start justify-between p-3 bg-slate-50 rounded-lg"
                            >
                              <div className="flex items-start gap-2">
                                {transaction.type === 'credit' ? (
                                  <TrendingUp className="w-4 h-4 text-orange-500 mt-0.5" />
                                ) : (
                                  <TrendingDown className="w-4 h-4 text-green-500 mt-0.5" />
                                )}
                                <div>
                                  <p className="text-sm text-slate-900">
                                    {transaction.description}
                                  </p>
                                  <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                                    <Calendar className="w-3 h-3" />
                                    {new Date(transaction.date).toLocaleDateString('en-GB')} at{' '}
                                    {new Date(transaction.date).toLocaleTimeString('en-US', { 
                                      hour: '2-digit', 
                                      minute: '2-digit' 
                                    })}
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className={`${
                                  transaction.type === 'credit' 
                                    ? 'text-orange-600' 
                                    : 'text-green-600'
                                }`}>
                                  {transaction.type === 'credit' ? '+' : ''}৳{Math.abs(transaction.amount).toLocaleString()}
                                </p>
                                <Badge 
                                  variant="outline" 
                                  className="text-xs mt-1"
                                >
                                  {transaction.type === 'credit' ? 'Credit' : 'Payment'}
                                </Badge>
                              </div>
                            </div>
                          ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
            </Accordion>
          ) : (
            <div className="text-center py-12 text-slate-500">
              <Users className="w-12 h-12 mx-auto mb-3 text-slate-300" />
              <p>No customers found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
