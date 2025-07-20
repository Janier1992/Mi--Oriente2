
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useCartStore } from '@/stores/cartStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { ShoppingBag, X, Plus, Minus, Trash2, Package } from 'lucide-react';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const ProductCard = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "¡Agregado al carrito!",
      description: `${product.name} ha sido añadido a tu carrito.`,
    });
  };

  const price = Number(product.price) || 0;
  const discount = Number(product.discount) || 0;
  const discountedPrice = price * (1 - discount / 100);

  return (
    <Card className="overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group border">
      <div className="relative">
        <img 
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          src={product.image_url || "https://images.unsplash.com/photo-1559223669-e0065fa7f142"} />
        {discount > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {discount}% OFF
          </div>
        )}
      </div>
      <CardContent className="p-4 bg-white">
        <p className="text-xs text-gray-500 mb-1">{product.stores?.name || 'Tienda'}</p>
        <h3 className="text-md font-semibold text-gray-800 truncate">{product.name}</h3>
        <p className="text-lg font-bold text-green-600 mt-2">
          ${discountedPrice.toLocaleString()}
          {discount > 0 && (
            <span className="text-sm text-gray-500 line-through ml-2">
              ${price.toLocaleString()}
            </span>
          )}
        </p>
        <Button onClick={handleAddToCart} className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
          <ShoppingBag className="mr-2 h-4 w-4" />
          Agregar
        </Button>
      </CardContent>
    </Card>
  );
};

const CartSidebar = ({ isOpen, onClose }) => {
    const { items, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartItemCount } = useCartStore();
    const { user } = useAuth();
    const navigate = useNavigate();
  
    const handleCheckout = () => {
        if (!user) {
            toast({
                title: "Inicia sesión para continuar",
                description: "Debes iniciar sesión como cliente para poder pagar.",
                variant: "destructive"
            });
            navigate('/cliente/login');
            return;
        }
        onClose();
        navigate('/checkout');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/60 z-40"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed top-0 right-0 w-full max-w-md h-full bg-white shadow-2xl z-50 flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between p-4 border-b">
                            <h2 className="text-2xl font-bold text-gray-800">Tu Carrito ({getCartItemCount()})</h2>
                            <Button variant="ghost" size="icon" onClick={onClose}>
                                <X className="h-6 w-6" />
                            </Button>
                        </div>
                        
                        {items.length === 0 ? (
                            <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
                                <ShoppingBag className="h-24 w-24 text-gray-300 mb-4" />
                                <h3 className="text-xl font-semibold text-gray-700">Tu carrito está vacío</h3>
                                <p className="text-gray-500 mt-2">¡Añade productos para empezar a comprar!</p>
                            </div>
                        ) : (
                            <>
                                <div className="flex-grow overflow-y-auto p-4 space-y-4">
                                    {items.map(item => (
                                        <div key={item.id} className="flex items-start space-x-4">
                                            <div className="w-20 h-20 rounded-lg overflow-hidden border">
                                              <img  alt={item.name} className="w-full h-full object-cover" src={item.image_url || "https://images.unsplash.com/photo-1571302171879-0965db383dc4"} />
                                            </div>
                                            <div className="flex-grow">
                                                <h4 className="font-semibold text-gray-800">{item.name}</h4>
                                                <p className="text-sm text-gray-500">${Number(item.price).toLocaleString()}</p>
                                                <div className="flex items-center mt-2">
                                                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}>
                                                        <Minus className="h-4 w-4" />
                                                    </Button>
                                                    <span className="w-10 text-center font-semibold">{item.quantity}</span>
                                                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                                        <Plus className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-gray-800">${(Number(item.price) * item.quantity).toLocaleString()}</p>
                                                <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50 mt-2" onClick={() => removeFromCart(item.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-4 border-t space-y-4 bg-gray-50">
                                    <div className="flex justify-between font-bold text-lg">
                                        <span>Subtotal</span>
                                        <span>${getCartTotal().toLocaleString()}</span>
                                    </div>
                                    <Button onClick={handleCheckout} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 text-lg">
                                        Proceder al Pago
                                    </Button>
                                    <Button variant="outline" onClick={clearCart} className="w-full">
                                        Vaciar Carrito
                                    </Button>
                                </div>
                            </>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [storeName, setStoreName] = useState("Todos los Productos");
    const [loading, setLoading] = useState(true);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const cartItemCount = useCartStore((state) => state.getCartItemCount());
    const [searchParams] = useSearchParams();
    const storeId = searchParams.get('tienda');

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            let query = supabase.from('products').select('*, stores(name)');

            if (storeId) {
                query = query.eq('store_id', storeId);
                const { data: storeData, error: storeError } = await supabase.from('stores').select('name').eq('id', storeId).single();
                if (!storeError && storeData) {
                    setStoreName(storeData.name);
                }
            }

            const { data, error } = await query;

            if (error) {
                console.error("Error fetching products:", error);
                toast({ title: "Error", description: "No se pudieron cargar los productos."});
            } else {
                setProducts(data);
            }
            setLoading(false);
        };

        fetchProducts();
    }, [storeId]);


  return (
    <>
      <Helmet>
        <title>{storeName} - Domicilios MiOriente</title>
        <meta name="description" content={`Explora y compra los mejores productos de ${storeName}.`} />
      </Helmet>
      
      <div className="bg-gray-50 min-h-screen">
        <header className="bg-white shadow-md sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link to="/" className="flex items-center space-x-2">
                <ShoppingBag className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold text-gray-800">Domicilios - MiOriente</span>
              </Link>
              <Button onClick={() => setIsCartOpen(true)} className="relative bg-primary text-primary-foreground hover:bg-primary/90">
                <ShoppingBag className="mr-2 h-5 w-5" />
                <span>Ver Carrito</span>
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">{storeName}</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
              Descubre los sabores y la tradición del Oriente Antioqueño en un solo lugar.
            </p>
          </div>
          
          {loading ? (
             <div className="text-center">Cargando productos...</div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Esta tienda aún no tiene productos. ¡Vuelve pronto!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default ProductsPage;
