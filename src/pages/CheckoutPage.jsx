
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCartStore } from '@/stores/cartStore';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/lib/customSupabaseClient';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag, ArrowLeft } from 'lucide-react';

const stripePromise = loadStripe('pk_test_51Rn19sQhiemIPg4JoIC7HqOfvviF47UOsHqYzowegbGrMO8zhERdltAapLR5kEIgUextIyAFiCJavhzRrUMJdqCt00lEsrulK3');

const CheckoutForm = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const clearCart = useCartStore((state) => state.clearCart);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/cliente/dashboard`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      toast({ title: "Error de pago", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Error inesperado", description: "Ocurrió un error al procesar el pago.", variant: "destructive" });
    }
    
    clearCart();
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Button disabled={isLoading || !stripe || !elements} className="w-full mt-6 bg-primary text-primary-foreground hover:bg-primary/90 py-3 text-lg">
        {isLoading ? 'Procesando...' : 'Pagar ahora'}
      </Button>
    </form>
  );
};

const CheckoutPage = () => {
  const [clientSecret, setClientSecret] = useState('');
  const { items, getCartTotal } = useCartStore();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || items.length === 0) {
      navigate('/productos');
      return;
    }

    const createPaymentIntent = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('create-payment-intent', {
          body: { items, userId: user.id },
        });

        if (error) throw error;

        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error('Error creating payment intent:', error);
        toast({ title: "Error", description: "No se pudo iniciar el proceso de pago.", variant: "destructive" });
        navigate('/productos');
      }
    };

    createPaymentIntent();
  }, [items, user, navigate]);

  const options = {
    clientSecret,
    appearance: { theme: 'stripe' },
  };

  return (
    <>
      <Helmet>
        <title>Checkout - Domicilios MiOriente</title>
      </Helmet>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <header className="bg-white shadow-sm">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2">
              <ShoppingBag className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-gray-800">Checkout Seguro</span>
            </Link>
            <Link to="/productos">
              <Button variant="outline"><ArrowLeft className="mr-2 h-4 w-4" /> Volver a la tienda</Button>
            </Link>
          </div>
        </header>
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Resumen del Pedido</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {items.map(item => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <img alt={item.name} className="w-16 h-16 object-cover rounded-md" src={item.image_url || "https://images.unsplash.com/photo-1571302171879-0965db383dc4"} />
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-semibold">${(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
                <div className="border-t mt-6 pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${getCartTotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Envío</span>
                    <span>$5,000</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${(getCartTotal() + 5000).toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Información de Pago</CardTitle>
              </CardHeader>
              <CardContent>
                {clientSecret ? (
                  <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm clientSecret={clientSecret} />
                  </Elements>
                ) : (
                  <div className="text-center py-8">Cargando formulario de pago...</div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
};

export default CheckoutPage;
