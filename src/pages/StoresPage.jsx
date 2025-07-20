
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Store, Star } from 'lucide-react';
import { supabase } from '@/lib/customSupabaseClient';

const StoreCard = ({ store }) => (
  <Card className="overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group border">
    <div className="relative">
      <img 
        alt={store.name}
        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
       src={store.logo_url || "https://images.unsplash.com/photo-1631367771698-606007aecd52"} />
    </div>
    <CardContent className="p-4 bg-white">
      <h3 className="text-lg font-bold text-gray-800">{store.name}</h3>
      <p className="text-sm text-gray-500 mb-2">{store.category || 'Tienda'}</p>
      <div className="flex items-center mb-4">
        <Star className="h-5 w-5 text-yellow-400 fill-current" />
        <span className="ml-1 font-semibold text-gray-700">4.8</span>
        <span className="ml-2 text-sm text-gray-500">(+100 reseñas)</span>
      </div>
      <p className="text-sm text-gray-600 mb-4 h-10">{store.description}</p>
      <Link to={`/productos?tienda=${store.id}`}>
        <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
          <Store className="mr-2 h-4 w-4" />
          Visitar Tienda
        </Button>
      </Link>
    </CardContent>
  </Card>
);

const StoresPage = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStores = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('stores').select('*');
      if (error) {
        console.error("Error fetching stores:", error);
      } else {
        setStores(data);
      }
      setLoading(false);
    };
    fetchStores();
  }, []);

  return (
    <>
      <Helmet>
        <title>Tiendas - Domicilios MiOriente</title>
        <meta name="description" content="Descubre las mejores tiendas locales del Oriente Antioqueño. Apoya el comercio local." />
      </Helmet>
      <div className="bg-gray-50 min-h-screen">
        <header className="bg-white shadow-md sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link to="/" className="flex items-center space-x-2">
                <ShoppingBag className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold text-gray-800">Domicilios - MiOriente</span>
              </Link>
              <Link to="/productos">
                <Button variant="outline">Ver Todos los Productos</Button>
              </Link>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Nuestras Tiendas</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
              Apoya el comercio local y descubre productos únicos de nuestra región.
            </p>
          </div>
          
          {loading ? (
             <div className="text-center">Cargando tiendas...</div>
          ) : stores.length === 0 ? (
            <div className="text-center py-12">
              <Store className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Aún no hay tiendas registradas. ¡Vuelve pronto!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {stores.map((store) => (
                <StoreCard key={store.id} store={store} />
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default StoresPage;
