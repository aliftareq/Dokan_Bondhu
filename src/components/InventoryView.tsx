import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Product } from "../App";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Search, Package, TrendingDown, ArrowUpDown, ArrowUp, ArrowDown, AlertTriangle, XCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface InventoryViewProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

type SortField = 'name' | 'quantity' | 'price' | 'value';
type SortDirection = 'asc' | 'desc';

export function InventoryView({ products, setProducts }: InventoryViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const lowStockProducts = products.filter(p => p.quantity < 10 && p.quantity > 0);
  const outOfStockProducts = products.filter(p => p.quantity === 0);

  const filteredProducts = products
    .filter(product => {
      const matchesSearch = 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.nameBn.includes(searchQuery);
      
      const matchesFilter = 
        filterStatus === 'all' ||
        (filterStatus === 'in-stock' && product.quantity >= 10) ||
        (filterStatus === 'low-stock' && product.quantity < 10 && product.quantity > 0) ||
        (filterStatus === 'out-of-stock' && product.quantity === 0);
      
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      switch (sortField) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'quantity':
          comparison = a.quantity - b.quantity;
          break;
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'value':
          comparison = (a.quantity * a.price) - (b.quantity * b.price);
          break;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });

  const getStockStatus = (quantity: number) => {
    if (quantity === 0) return { label: 'Out of Stock', variant: 'destructive' as const };
    if (quantity < 5) return { label: 'Critical', variant: 'destructive' as const };
    if (quantity < 10) return { label: 'Low', variant: 'secondary' as const };
    return { label: 'In Stock', variant: 'default' as const };
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown className="w-3 h-3 ml-1 opacity-50" />;
    return sortDirection === 'asc' ? 
      <ArrowUp className="w-3 h-3 ml-1" /> : 
      <ArrowDown className="w-3 h-3 ml-1" />;
  };

  const InventorySummary = () => (
    <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-violet-50 rounded-lg border border-blue-100">
      <h3 className="text-slate-900 mb-3">Inventory Summary</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div>
          <p className="text-slate-600 mb-1">Total Products</p>
          <p className="text-slate-900">{products.length}</p>
        </div>
        <div>
          <p className="text-slate-600 mb-1">Total Value</p>
          <p className="text-slate-900">
            ৳{products.reduce((sum, p) => sum + (p.quantity * p.price), 0).toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-slate-600 mb-1">Low Stock Items</p>
          <p className="text-orange-600">
            {lowStockProducts.length}
          </p>
        </div>
        <div>
          <p className="text-slate-600 mb-1">Out of Stock</p>
          <p className="text-red-600">
            {outOfStockProducts.length}
          </p>
        </div>
      </div>
    </div>
  );

  const ProductTable = ({ productList }: { productList: Product[] }) => (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 hover:bg-transparent"
                onClick={() => handleSort('name')}
              >
                Product Name
                <SortIcon field="name" />
              </Button>
            </TableHead>
            <TableHead>বাংলা নাম</TableHead>
            <TableHead className="text-right">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 hover:bg-transparent"
                onClick={() => handleSort('quantity')}
              >
                Stock
                <SortIcon field="quantity" />
              </Button>
            </TableHead>
            <TableHead className="text-right">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 hover:bg-transparent"
                onClick={() => handleSort('price')}
              >
                Price
                <SortIcon field="price" />
              </Button>
            </TableHead>
            <TableHead className="text-right">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 hover:bg-transparent"
                onClick={() => handleSort('value')}
              >
                Value
                <SortIcon field="value" />
              </Button>
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {productList.length > 0 ? (
            productList.map((product) => {
              const status = getStockStatus(product.quantity);
              const totalValue = product.quantity * product.price;
              
              return (
                <TableRow key={product.id} className="hover:bg-slate-50">
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.nameBn}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      {product.quantity < 10 && product.quantity > 0 && (
                        <TrendingDown className="w-3 h-3 text-orange-500" />
                      )}
                      <span className={product.quantity < 10 && product.quantity > 0 ? 'text-orange-700' : ''}>
                        {product.quantity} {product.unit}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    ৳{product.price}/{product.unit}
                  </TableCell>
                  <TableCell className="text-right">
                    ৳{totalValue.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </TableCell>
                  <TableCell className="text-slate-500 text-sm">
                    {new Date(product.lastUpdated).toLocaleDateString('en-GB')}
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-slate-500">
                No products found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className="space-y-4">
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Inventory Management
              </CardTitle>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Products</SelectItem>
                  <SelectItem value="in-stock">In Stock</SelectItem>
                  <SelectItem value="low-stock">Low Stock</SelectItem>
                  <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="all" className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                All Products
              </TabsTrigger>
              <TabsTrigger value="low-stock" className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Low Stock ({lowStockProducts.length})
              </TabsTrigger>
              <TabsTrigger value="out-of-stock" className="flex items-center gap-2">
                <XCircle className="w-4 h-4" />
                Out of Stock ({outOfStockProducts.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <InventorySummary />
              <ProductTable productList={filteredProducts} />
            </TabsContent>

            <TabsContent value="low-stock">
              {lowStockProducts.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="p-4 bg-orange-50 rounded-lg border border-orange-200 shadow-sm">
                      <p className="text-sm text-orange-700 mb-1">Total Low Stock Items</p>
                      <p className="text-orange-900">{lowStockProducts.length}</p>
                    </div>
                    <div className="p-4 bg-red-50 rounded-lg border border-red-200 shadow-sm">
                      <p className="text-sm text-red-700 mb-1">Critical Stock ({'<'} 5 units)</p>
                      <p className="text-red-900">{lowStockProducts.filter(p => p.quantity < 5).length}</p>
                    </div>
                    <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 shadow-sm">
                      <p className="text-sm text-amber-700 mb-1">Total Value at Risk</p>
                      <p className="text-amber-900">
                        ৳{lowStockProducts.reduce((sum, p) => sum + (p.quantity * p.price), 0).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <ProductTable productList={lowStockProducts.sort((a, b) => a.quantity - b.quantity)} />
                </>
              ) : (
                <div className="text-center py-12">
                  <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                  <p className="text-slate-500">No low stock items found</p>
                  <p className="text-sm text-slate-400 mt-2">All products have sufficient stock levels</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="out-of-stock">
              {outOfStockProducts.length > 0 ? (
                <>
                  <div className="p-4 bg-red-50 rounded-lg border border-red-200 mb-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <p className="text-red-900">Urgent Action Required</p>
                    </div>
                    <p className="text-sm text-red-700">
                      {outOfStockProducts.length} {outOfStockProducts.length === 1 ? 'product is' : 'products are'} completely out of stock and need immediate restocking to avoid lost sales.
                    </p>
                  </div>
                  <ProductTable productList={outOfStockProducts} />
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-slate-900">Great! No products are out of stock</p>
                  <p className="text-sm text-slate-500 mt-2">All inventory items are currently available</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
