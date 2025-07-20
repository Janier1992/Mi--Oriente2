
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Truck, LogOut, DollarSign, TrendingUp, Package, Star, MapPin, Clock, Navigation, Phone } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const DeliveryDashboard = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [isConnected, setIsConnected] = useState(false);
  const [activeTab, setActiveTab] = useState('disponibles');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/domiciliario/login');
      return;
    }

    const fetchDeliveryData = async () => {
      setLoading(true);
      const mockOrders = [
        {
          id: 'T001',
          customer: 'María González',
          address: 'Calle 55 #12-34, Rionegro',
          products: 3,
          distance: 2.3,
          time: 25,
          amount: 8500,
          status: 'available',
          position: [6.15515, -75.37363]
        }
      ];
      setOrders(mockOrders);
      setLoading(false);
    };

    fetchDeliveryData();
  }, [user, navigate]);

  const handleConnect = () => {
    setIsConnected(!isConnected);
    toast({
      title: isConnected ? "Desconectado" : "Conectado",
      description: isConnected ? "Ya no recibirás nuevos pedidos" : "Ahora recibirás pedidos cercanos"
    });
  };

  const handleAcceptOrder = (orderId) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: 'accepted' }
        : order
    ));
    setActiveTab('curso');
    toast({
      title: "Pedido aceptado",
      description: "El pedido ha sido asignado a ti"
    });
  };

  const handleRejectOrder = (orderId) => {
    setOrders(orders.filter(order => order.id !== orderId));
    toast({
      title: "Pedido rechazado",
      description: "El pedido será ofrecido a otro domiciliario"
    });
  };

  const handleCompleteOrder = (orderId) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: 'completed' }
        : order
    ));
    setActiveTab('historial');
    toast({
      title: "Entrega completada",
      description: "¡Excelente trabajo! El pago se procesará pronto"
    });
  };

  const handleLogout = async () => {
    await signOut();
    toast({ title: "Sesión cerrada", description: "Has cerrado sesión exitosamente." });
    navigate('/');
  };

  const handleNavigate = (address) => {
    const query = encodeURIComponent(address);
    const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
    window.open(url, '_blank');
  };

  const handleCall = () => {
    toast({
      title: "Llamando al cliente (simulación)",
      description: "Se abriría la aplicación de teléfono.",
    });
  };

  const availableOrders = orders.filter(order => order.status === 'available');
  const acceptedOrders = orders.filter(order => order.status === 'accepted');
  const completedOrders = orders.filter(order => order.status === 'completed');

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Cargando...</div>;
  }
  
  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-white border-b border-slate-200">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <Truck className="h-6 w-6 text-purple-600" />
            <span className="text-xl font-bold text-slate-800">Panel Domiciliario</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              onClick={handleConnect}
              className={isConnected ? "bg-red-600 hover:bg-red-700 text-white" : "bg-green-600 hover:bg-green-700 text-white"}
            >
              {isConnected ? "Desconectarse" : "Conectarse"}
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar sesión
            </Button>
          </div>
        </div>
      </header>

      <div className={`px-6 py-3 ${isConnected ? 'bg-green-500' : 'bg-red-500'} text-white`}>
        <div className="flex items-center justify-center space-x-2 max-w-7xl mx-auto">
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-white' : 'bg-red-200'}`}></div>
            <span className="font-semibold">
              Estado: {isConnected ? 'Conectado y listo para recibir pedidos' : 'Desconectado'}
            </span>
        </div>
      </div>

      <main className="p-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card><CardContent className="p-6 flex items-center justify-between"><div className="space-y-1"><p className="text-sm font-medium text-gray-600">Hoy</p><p className="text-2xl font-bold text-gray-900">$8.500</p></div><div className="p-3 rounded-full bg-green-100"><DollarSign className="h-6 w-6 text-green-600" /></div></CardContent></Card>
          <Card><CardContent className="p-6 flex items-center justify-between"><div className="space-y-1"><p className="text-sm font-medium text-gray-600">Esta semana</p><p className="text-2xl font-bold text-gray-900">$8.500</p></div><div className="p-3 rounded-full bg-blue-100"><TrendingUp className="h-6 w-6 text-blue-600" /></div></CardContent></Card>
          <Card><CardContent className="p-6 flex items-center justify-between"><div className="space-y-1"><p className="text-sm font-medium text-gray-600">Entregas</p><p className="text-2xl font-bold text-gray-900">1</p></div><div className="p-3 rounded-full bg-purple-100"><Package className="h-6 w-6 text-purple-600" /></div></CardContent></Card>
          <Card><CardContent className="p-6 flex items-center justify-between"><div className="space-y-1"><p className="text-sm font-medium text-gray-600">Calificación</p><p className="text-2xl font-bold text-gray-900">4.8</p></div><div className="p-3 rounded-full bg-orange-100"><Star className="h-6 w-6 text-orange-500" /></div></CardContent></Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Panel de Entregas</CardTitle>
              <p className="text-gray-600">Gestiona tus pedidos disponibles y entregas activas</p>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="disponibles">Disponibles ({availableOrders.length})</TabsTrigger>
                  <TabsTrigger value="curso">En curso ({acceptedOrders.length})</TabsTrigger>
                  <TabsTrigger value="historial">Historial ({completedOrders.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="disponibles" className="mt-4">
                  {!isConnected ? (
                    <div className="text-center py-8"><Truck className="h-12 w-12 text-gray-400 mx-auto mb-4" /><p className="text-gray-500">Estás desconectado</p><Button onClick={handleConnect} className="mt-4 bg-green-600 hover:bg-green-700 text-white">Conectarse</Button></div>
                  ) : availableOrders.length === 0 ? (
                    <div className="text-center py-8"><Truck className="h-12 w-12 text-gray-400 mx-auto mb-4" /><p className="text-gray-500">No hay pedidos disponibles en tu zona.</p></div>
                  ) : (
                    <div className="space-y-4">{availableOrders.map((order) => (<div key={order.id} className="border rounded-lg p-4"><div className="flex justify-between items-start mb-2"><div><h4 className="font-semibold">Pedido #{order.id}</h4><p className="text-sm text-gray-600">Cliente: {order.customer}</p></div><span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">${order.amount.toLocaleString()}</span></div><div className="flex items-center space-x-4 text-sm text-gray-600 mb-4"><MapPin className="h-4 w-4 mr-1" />{order.address}</div><div className="flex items-center justify-between text-sm text-gray-600 mb-4"><div className="flex items-center"><Package className="h-4 w-4 mr-1" />{order.products} prod.</div><div className="flex items-center"><Navigation className="h-4 w-4 mr-1" />{order.distance} km</div><div className="flex items-center"><Clock className="h-4 w-4 mr-1" />{order.time} min</div></div><div className="flex space-x-2"><Button onClick={() => handleAcceptOrder(order.id)} className="flex-1 bg-green-600 hover:bg-green-700 text-white">Aceptar</Button><Button onClick={() => handleRejectOrder(order.id)} variant="destructive" className="flex-1">Rechazar</Button></div></div>))}</div>
                  )}
                </TabsContent>

                <TabsContent value="curso" className="mt-4">
                  {acceptedOrders.length === 0 ? (
                    <div className="text-center py-8"><Package className="h-12 w-12 text-gray-400 mx-auto mb-4" /><p className="text-gray-500">No tienes entregas en curso.</p></div>
                  ) : (
                    <div className="space-y-4">{acceptedOrders.map((order) => (<div key={order.id} className="border border-blue-500 rounded-lg p-4"><div className="flex justify-between items-start mb-2"><div><h4 className="font-semibold">Pedido #{order.id}</h4><p className="text-sm text-gray-600">Cliente: {order.customer}</p></div><span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">EN CURSO</span></div><div className="flex items-center space-x-4 text-sm text-gray-600 mb-4"><MapPin className="h-4 w-4 mr-1" />{order.address}</div><div className="flex items-center justify-between text-sm text-gray-600 mb-4"><div className="flex items-center"><DollarSign className="h-4 w-4 mr-1" />${order.amount.toLocaleString()}</div><div className="flex items-center"><Package className="h-4 w-4 mr-1" />{order.products} prod.</div><div className="flex items-center"><Navigation className="h-4 w-4 mr-1" />{order.distance} km</div></div><div className="flex space-x-2"><Button onClick={() => handleNavigate(order.address)} variant="outline" className="flex-1"><Navigation className="mr-2 h-4 w-4" />Navegar</Button><Button onClick={handleCall} variant="outline" className="flex-1"><Phone className="mr-2 h-4 w-4" />Llamar</Button><Button onClick={() => handleCompleteOrder(order.id)} className="flex-1 bg-green-600 hover:bg-green-700 text-white">Completar</Button></div></div>))}</div>
                  )}
                </TabsContent>

                <TabsContent value="historial" className="mt-4">
                  {completedOrders.length === 0 ? (
                    <div className="text-center py-8"><Package className="h-12 w-12 text-gray-400 mx-auto mb-4" /><p className="text-gray-500">No tienes entregas completadas.</p></div>
                  ) : (
                    <div className="space-y-4">{completedOrders.map((order) => (<div key={order.id} className="border border-green-300 rounded-lg p-4 bg-green-50"><div className="flex justify-between items-start mb-2"><div><h4 className="font-semibold">Pedido #{order.id}</h4><p className="text-sm text-gray-600">18/7/2025</p></div><span className="px-2 py-1 bg-green-200 text-green-800 rounded text-xs font-medium">COMPLETADO</span></div><p className="text-sm text-gray-600 mb-2">Cliente: {order.customer}</p><p className="text-lg font-bold text-green-700">+${order.amount.toLocaleString()}</p></div>))}</div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mapa de Geolocalización</CardTitle>
              <p className="text-gray-600">Visualiza las rutas de entrega activas.</p>
            </CardHeader>
            <CardContent>
              <div className="h-96 bg-gray-200 rounded-lg">
                <MapContainer center={[6.15515, -75.37363]} zoom={13} scrollWheelZoom={false}>
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {acceptedOrders.map(order => (
                    <Marker key={order.id} position={order.position}>
                      <Popup>
                        Pedido #{order.id} para {order.customer}.
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default DeliveryDashboard;
