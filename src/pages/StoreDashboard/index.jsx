import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import { Store, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatsCards } from './StatsCards';
import { ProductsTab } from './ProductsTab';
import { AddProductTab } from './AddProductTab';
import { BulkUploadTab } from './BulkUploadTab';
import { OrdersTab } from './OrdersTab';
import { AnalyticsTab } from './AnalyticsTab';
import { StoreConfigTab } from './StoreConfigTab';
import { ProfileTab } from './ProfileTab';

const StoreDashboard = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('productos');
  const [store, setStore] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async (storeId) => {
    const { data: productsData, error: productsError } = await supabase
      .from('products')
      .select('*')
      .eq('store_id', storeId)
      .order('created_at', { ascending: false });

    if (productsError) {
      console.error('Error fetching products:', productsError);
    } else {
      setProducts(productsData);
    }
  }, []);

  useEffect(() => {
    if (!user) {
      navigate('/tienda/login');
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      
      const { data: storeData, error: storeError } = await supabase
        .from('stores')
        .select('*')
        .eq('owner_id', user.id)
        .single();

      if (storeError && storeError.code !== 'PGRST116') {
        console.error('Error fetching store:', storeError);
        toast({ title: 'Error', description: 'No se pudo cargar la información de la tienda.', variant: 'destructive' });
      } else {
        setStore(storeData);
      }

      if (storeData) {
        await fetchProducts(storeData.id);

        const { data: ordersData, error: ordersError } = await supabase
          .from('orders')
          .select('*, profiles(full_name)')
          .eq('store_id', storeData.id);

        if (ordersError) {
          console.error('Error fetching orders:', ordersError);
        } else {
          setOrders(ordersData);
        }
      }
      
      setLoading(false);
    };

    fetchData();
  }, [user, navigate, fetchProducts]);

  const onProductAdded = useCallback(() => {
    if (store) {
      fetchProducts(store.id);
      setActiveTab('productos');
    }
  }, [store, fetchProducts]);

  const handleLogout = async () => {
    await signOut();
    toast({ title: "Sesión cerrada", description: "Has cerrado sesión exitosamente." });
    navigate('/');
  };

  const handleFeatureClick = () => {
    toast({
      title: "🚧 Esta funcionalidad aún no está implementada",
      description: "¡No te preocupes! Puedes solicitarla en tu próximo prompt! 🚀",
    });
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center">Cargando panel de control...</div>;
  }
  
  if (!store) {
     return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-center p-4">
            <Store className="h-16 w-16 text-primary mb-4" />
            <h1 className="text-2xl font-bold mb-2">¡Casi listo!</h1>
            <p className="text-gray-600 mb-6 max-w-md">Parece que aún no has configurado tu tienda. Completa la configuración para empezar a vender.</p>
            <div className="w-full max-w-lg">
                <StoreConfigTab user={user} setStore={setStore} />
            </div>
             <Button variant="destructive" size="sm" onClick={handleLogout} className="mt-8">
              <LogOut className="mr-2 h-4 w-4" />
              Salir
            </Button>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Store className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-gray-800">{store?.name || 'Mi Tienda'}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={() => setActiveTab('tienda')}>
              <Settings className="mr-2 h-4 w-4" />
              Configuración
            </Button>
            <Button variant="destructive" size="sm" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Salir
            </Button>
          </div>
        </div>
      </header>

      <main className="p-6 max-w-7xl mx-auto">
        <StatsCards productsCount={products.length} />

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 sm:grid-cols-4 md:grid-cols-7">
            <TabsTrigger value="productos">Productos</TabsTrigger>
            <TabsTrigger value="agregar">Agregar</TabsTrigger>
            <TabsTrigger value="carga">Carga</TabsTrigger>
            <TabsTrigger value="pedidos">Pedidos</TabsTrigger>
            <TabsTrigger value="analisis">Análisis</TabsTrigger>
            <TabsTrigger value="tienda">Tienda</TabsTrigger>
            <TabsTrigger value="perfil">Perfil</TabsTrigger>
          </TabsList>

          <TabsContent value="productos" className="mt-6">
            <ProductsTab products={products} />
          </TabsContent>
          <TabsContent value="agregar" className="mt-6">
            <AddProductTab onProductAdded={onProductAdded} storeId={store?.id} />
          </TabsContent>
          <TabsContent value="carga" className="mt-6">
            <BulkUploadTab />
          </TabsContent>
          <TabsContent value="pedidos" className="mt-6">
            <OrdersTab orders={orders} />
          </TabsContent>
          <TabsContent value="analisis" className="mt-6">
            <AnalyticsTab />
          </TabsContent>
          <TabsContent value="tienda" className="mt-6">
            <StoreConfigTab store={store} setStore={setStore} user={user} />
          </TabsContent>
          <TabsContent value="perfil" className="mt-6">
            <ProfileTab user={user} onFeatureClick={handleFeatureClick} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default StoreDashboard;