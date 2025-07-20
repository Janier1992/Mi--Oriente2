import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package } from 'lucide-react';

export const ProductsTab = ({ products }) => (
  <Card>
    <CardHeader>
      <CardTitle>Mis productos</CardTitle>
      <p className="text-sm text-gray-600">Gestiona tu inventario y productos.</p>
    </CardHeader>
    <CardContent>
      {products.length === 0 ? (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Aún no has agregado productos.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg p-4 flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-600 capitalize">{product.category}</p>
                <p className="text-lg font-bold text-green-600">${Number(product.price).toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Stock: {product.stock}</p>
                {product.discount && (
                  <p className="text-sm text-orange-600">Descuento: {product.discount}%</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </CardContent>
  </Card>
);