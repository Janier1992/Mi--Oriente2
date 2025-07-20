import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

export const OrdersTab = ({ orders }) => {
  const handleOrderAction = (orderId, action) => {
    toast({
      title: `Pedido ${action}`,
      description: `El pedido ${orderId} ha sido ${action.toLowerCase()}`
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pedidos Recientes</CardTitle>
        <p className="text-sm text-gray-600">Gestiona los pedidos de tus clientes.</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold">Pedido # {order.id}</h3>
                  <p className="text-sm text-gray-600">Cliente: {order.customer}</p>
                  <p className="text-sm text-gray-600">{order.date}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${order.status === 'Nuevo' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'}`}>
                  {order.status}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-bold text-green-600">${order.amount.toLocaleString()} ({order.products} prod.)</p>
                </div>
                <div className="space-x-2">
                  {order.status === 'Nuevo' && (
                    <>
                      <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => handleOrderAction(order.id, 'Aceptar')}>Aceptar</Button>
                      <Button size="sm" variant="destructive" onClick={() => handleOrderAction(order.id, 'Cancelar')}>Cancelar</Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};