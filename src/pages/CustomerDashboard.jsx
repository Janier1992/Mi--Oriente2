
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { User, ShoppingBag, MapPin, Heart, LogOut, Package, Clock, CheckCircle, XCircle, Plus, Trash2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { productsData } from '@/data/products';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const { user, session, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('pedidos');
  const [orders, setOrders] = useState([]);
  const [profile, setProfile] = useState({ name: '', email: '', phone: '' });
  const [addresses, setAddresses] = useState([
    { id: 1, alias: 'Casa', address: 'Calle 10 #43A-20, Rionegro', default: true },
    { id: 2, alias: 'Oficina', address: 'Carrera 52 #80-11, Marinilla', default: false },
  ]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!session) {
      navigate('/cliente/login');
    } else {
      setProfile({
        name: user?.user_metadata?.full_name || 'Usuario',
        email: user?.email || '',
        phone: user?.user_metadata?.phone || ''
      });
    }

    const mockOrders = [
      { id: 'ORD-001', date: '2025-07-18', total: 35000, status: 'Entregado', items: [{ name: 'Café de Origen', qty: 1 }], position: [6.15515, -75.37363] },
      { id: 'ORD-002', date: '2025-07-17', total: 25000, status: 'En camino', items: [{ name: 'Miel de Abejas', qty: 1 }], position: [6.1759, -75.3666] },
      { id: 'ORD-003', date: '2025-07-16', total: 180000, status: 'Cancelado', items: [{ name: 'Carriel Jericoano', qty: 1 }], position: null },
    ];
    setOrders(mockOrders);
    setFavorites(productsData.slice(0, 2));
  }, [session, navigate, user]);

  const handleLogout = async () => {
    await signOut();
    toast({ title: "Sesión cerrada", description: "Has cerrado sesión exitosamente." });
    navigate('/');
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    toast({ title: "Perfil actualizado", description: "Tu información ha sido guardada." });
  };

  const handleInputChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleAddAddress = () => {
    toast({
      title: "🚧 Funcionalidad en desarrollo",
      description: "Pronto podrás agregar nuevas direcciones.",
    });
  };

  const handleRemoveFavorite = (productId) => {
    setFavorites(favorites.filter(fav => fav.id !== productId));
    toast({
      title: "Eliminado de favoritos",
      description: "El producto ha sido eliminado de tu lista de favoritos.",
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Entregado': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'En camino': return <Clock className="h-5 w-5 text-blue-500" />;
      case 'Cancelado': return <XCircle className="h-5 w-5 text-red-500" />;
      default: return <Package className="h-5 w-5 text-gray-500" />;
    }
  };

  const activeOrder = orders.find(o => o.status === 'En camino');

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <ShoppingBag className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-gray-800">Mi Cuenta</span>
          </Link>
          <Button variant="destructive" size="sm" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar Sesión
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <aside className="md:col-span-1">
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                    <User className="h-12 w-12 text-gray-500" />
                  </div>
                  <h2 className="text-xl font-bold">{profile.name}</h2>
                  <p className="text-sm text-gray-500">{profile.email}</p>
                </div>
                <Tabs
                  orientation="vertical"
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full mt-6"
                >
                  <TabsList className="flex flex-col items-stretch h-auto bg-transparent p-0">
                    <TabsTrigger value="pedidos" className="justify-start data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
                      <ShoppingBag className="mr-2 h-4 w-4" /> Mis Pedidos
                    </TabsTrigger>
                    <TabsTrigger value="perfil" className="justify-start data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
                      <User className="mr-2 h-4 w-4" /> Mi Perfil
                    </TabsTrigger>
                    <TabsTrigger value="direcciones" className="justify-start data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
                      <MapPin className="mr-2 h-4 w-4" /> Direcciones
                    </TabsTrigger>
                    <TabsTrigger value="favoritos" className="justify-start data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
                      <Heart className="mr-2 h-4 w-4" /> Favoritos
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardContent>
            </Card>
          </aside>

          <div className="md:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsContent value="pedidos">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Mis Pedidos</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {orders.map(order => (
                        <div key={order.id} className="border rounded-lg p-4 flex justify-between items-center">
                          <div className="flex-grow">
                            <p className="font-bold text-primary">{order.id}</p>
                            <p className="text-sm text-gray-500">Fecha: {order.date}</p>
                            <p className="font-semibold">Total: ${order.total.toLocaleString()}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(order.status)}
                            <span className="font-medium">{order.status}</span>
                          </div>
                          <Button variant="outline" size="sm" className="ml-4">Ver Detalles</Button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                  {activeOrder && (
                    <Card className="lg:col-span-2">
                      <CardHeader>
                        <CardTitle>Seguimiento en Tiempo Real</CardTitle>
                        <p className="text-gray-600">Ubicación de tu pedido #{activeOrder.id}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="h-96 bg-gray-200 rounded-lg">
                          <MapContainer center={activeOrder.position} zoom={15} scrollWheelZoom={false}>
                            <TileLayer
                              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={activeOrder.position}>
                              <Popup>
                                Tu pedido está aquí.
                              </Popup>
                            </Marker>
                          </MapContainer>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="perfil">
                <Card>
                  <CardHeader>
                    <CardTitle>Mi Perfil</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                        <Input name="name" value={profile.name} onChange={handleInputChange} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <Input name="email" type="email" value={profile.email} onChange={handleInputChange} readOnly />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                        <Input name="phone" type="tel" value={profile.phone} onChange={handleInputChange} />
                      </div>
                      <Button type="submit">Guardar Cambios</Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="direcciones">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Mis Direcciones</CardTitle>
                    <Button size="sm" onClick={handleAddAddress}><Plus className="mr-2 h-4 w-4" /> Nueva</Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {addresses.map(addr => (
                      <div key={addr.id} className="border rounded-lg p-4 flex justify-between items-center">
                        <div>
                          <p className="font-bold">{addr.alias} {addr.default && <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full ml-2">Principal</span>}</p>
                          <p className="text-sm text-gray-500">{addr.address}</p>
                        </div>
                        <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-red-500" /></Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="favoritos">
                <Card>
                  <CardHeader>
                    <CardTitle>Mis Favoritos</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {favorites.length > 0 ? favorites.map(fav => (
                      <div key={fav.id} className="border rounded-lg p-4 flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                          <img  alt={fav.name} className="w-16 h-16 object-cover rounded-md"  src="https://images.unsplash.com/photo-1702479744451-ccd6e31495d5" />
                          <div>
                            <p className="font-bold">{fav.name}</p>
                            <p className="text-sm text-gray-500">{fav.store}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">Ver</Button>
                          <Button variant="ghost" size="icon" onClick={() => handleRemoveFavorite(fav.id)}><Heart className="h-4 w-4 text-red-500 fill-current" /></Button>
                        </div>
                      </div>
                    )) : <p>No tienes productos favoritos.</p>}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomerDashboard;
